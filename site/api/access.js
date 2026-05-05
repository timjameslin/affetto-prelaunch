// site/api/access.js — Vercel Node serverless function
//
// Handles early-access form submissions. Pipeline:
//   1. Validate request method, body, and email format
//   2. Per-IP rate limit (5 / hour)
//   3. Verify Cloudflare Turnstile token
//   4. Add contact to Resend audience
//   5. Send notification email to partners@affetto.io
//   6. Return JSON response
//
// Required environment variables (set in Vercel project settings):
//   - TURNSTILE_SECRET_KEY     server-side Turnstile secret
//   - RESEND_API_KEY           Resend API key
//   - RESEND_AUDIENCE_ID       Resend audience UUID
//   - RESEND_FROM (optional)   verified sender, e.g. "Affetto <noreply@affetto.io>"
//                              defaults to onboarding@resend.dev (works without
//                              domain verification, useful for first-deploy testing)
//   - NOTIFY_TO (optional)     defaults to partners@affetto.io

import { Resend } from 'resend';

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

// In-memory rate limit. Vercel keeps warm instances around for a few minutes,
// so this provides best-effort protection. For stricter guarantees switch to
// @vercel/kv or Upstash Redis (out-of-scope for this initial cut).
const rateStore = new Map();

function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length) return fwd.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateStore.get(ip);
  if (!entry || now > entry.resetAt) {
    rateStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true, remaining: RATE_LIMIT_MAX - 1 };
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return { ok: false, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count += 1;
  return { ok: true, remaining: RATE_LIMIT_MAX - entry.count };
}

function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  if (email.length > 254) return false;
  // RFC 5322 simplified — adequate for form validation; the real check is the
  // confirmation email round-trip.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function verifyTurnstile(token, ip) {
  if (!token || typeof token !== 'string') return false;
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error('TURNSTILE_SECRET_KEY is not set');
    return false;
  }
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const data = await res.json();
    return data.success === true;
  } catch (err) {
    console.error('Turnstile verification error', err);
    return false;
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = getClientIp(req);

  const limit = checkRateLimit(ip);
  if (!limit.ok) {
    res.setHeader('Retry-After', String(limit.retryAfterSec));
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const body = req.body || {};
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const audience = typeof body.audience === 'string' ? body.audience.trim() : '';
  const turnstileToken = typeof body.turnstileToken === 'string' ? body.turnstileToken : '';

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (!turnstileToken) {
    return res.status(400).json({ error: 'Verification challenge missing. Please retry.' });
  }

  const verified = await verifyTurnstile(turnstileToken, ip);
  if (!verified) {
    return res.status(403).json({ error: 'Verification failed. Please retry.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    console.error('Missing RESEND_API_KEY or RESEND_AUDIENCE_ID');
    return res.status(500).json({ error: 'Server misconfiguration.' });
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM || 'Affetto <onboarding@resend.dev>';
  const notifyTo = process.env.NOTIFY_TO || 'partners@affetto.io';

  // Add to audience. If the contact already exists, Resend returns the
  // existing record without error, so this is idempotent.
  try {
    await resend.contacts.create({ email, audienceId, unsubscribed: false });
  } catch (err) {
    console.error('Resend audience.create error', err);
    // Don't fail the whole request — fall through to the notification email
    // so the founders still see the lead even if the audience write failed.
  }

  // Notification email to founders
  try {
    const submittedAt = new Date().toISOString();
    await resend.emails.send({
      from,
      to: notifyTo,
      replyTo: email,
      subject: 'Affetto — new early-access request',
      text: [
        `Email:     ${email}`,
        `Audience:  ${audience || '(not specified)'}`,
        `IP:        ${ip}`,
        `Time:      ${submittedAt}`,
      ].join('\n'),
    });
  } catch (err) {
    console.error('Resend emails.send error', err);
    return res.status(502).json({ error: 'Could not deliver request. Please try again.' });
  }

  return res.status(200).json({ ok: true });
}

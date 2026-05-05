// site/api/config.js — public client-side configuration
//
// Returns values that the static front-end needs at runtime but that should
// be sourced from environment variables rather than hardcoded. Currently:
//   - Cloudflare Turnstile public site key
//
// The Turnstile site key is public by design — it is embedded in every
// browser page that renders the widget — so exposing it via this endpoint
// is safe. The corresponding TURNSTILE_SECRET_KEY is never returned.

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Short cache: lets multiple form interactions reuse the value, but stays
  // responsive to env-var changes after a redeploy.
  res.setHeader('Cache-Control', 'public, max-age=60');

  return res.status(200).json({
    turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '',
  });
}

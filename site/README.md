# Affetto Website — v0.9 (production build)

The production website for Affetto, deployed on Vercel from this directory.

## Layout

```
site/                              ← Vercel "Root Directory"
├── index.html                     Production HTML (entry point)
├── package.json                   Declares resend dependency for serverless fns
├── vercel.json                    Security headers (HSTS, X-Frame, CSP, …)
├── api/
│   ├── access.js                  POST  /api/access  — form submission handler
│   └── config.js                  GET   /api/config  — public Turnstile site key
├── homepage/v9/
│   ├── design-tokens.css          All visual tokens
│   ├── content.js                 All dynamic data
│   ├── styles.css                 Component CSS
│   └── main.js                    Behavior (incl. access-form Turnstile flow)
└── reference/                     Design source of truth (handoff archive).
                                   Lives inside the deploy root for repo
                                   convenience; if you'd rather keep it
                                   private, move it one level up.
```

## Environment variables (set in Vercel project settings)

| Variable                      | Required | Purpose |
|-------------------------------|----------|---------|
| `TURNSTILE_SECRET_KEY`        | yes      | Server-side Cloudflare Turnstile secret. Used by `/api/access` to verify tokens. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | yes   | Public Turnstile site key. Returned by `/api/config` and used by the browser to render the widget. The `NEXT_PUBLIC_` prefix is honored as a public-by-convention name; it can be exposed safely. |
| `RESEND_API_KEY`              | yes      | Resend API key. |
| `RESEND_AUDIENCE_ID`          | yes      | UUID of the Resend audience to which new contacts are added. |
| `RESEND_FROM`                 | optional | Verified sender, e.g. `Affetto <noreply@affetto.io>`. Defaults to `Affetto <onboarding@resend.dev>` so the function works on first deploy before the domain is verified in Resend. |
| `NOTIFY_TO`                   | optional | Notification recipient. Defaults to `partners@affetto.io`. |

## /api/access submission flow

1. Browser validates email and calls `window.turnstile.execute()` (invisible widget).
2. Turnstile returns a token via the registered callback.
3. Browser POSTs JSON `{ email, audience, turnstileToken }` to `/api/access`.
4. Server: per-IP rate limit (5 / hour) → Turnstile verify → Resend audience add → Resend notification email → 200 OK.
5. Browser swaps the submit button to `RECEIVED ✓`. Errors render an inline message and re-arm the widget for retry.

The rate limit is in-memory per warm Vercel instance; for stricter guarantees
swap in `@vercel/kv` or Upstash Redis (see comment at the top of `api/access.js`).

## Security headers (set in `vercel.json`)

| Header | Value |
|--------|-------|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), interest-cohort=()` |
| `Content-Security-Policy` | see below |

CSP allowlist:

- `script-src 'self' https://challenges.cloudflare.com` — Turnstile script
- `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com` — Google Fonts CSS + JS-set inline styles in stream/activity row animations
- `font-src 'self' https://fonts.gstatic.com` — Google Fonts files
- `frame-src https://challenges.cloudflare.com` — Turnstile challenge iframe
- `connect-src 'self' https://challenges.cloudflare.com https://api.resend.com` — same-origin XHR + Turnstile + Resend (Resend is server-only, included for defense in depth)
- `img-src 'self' data:` — covers the inline SVG favicon
- `default-src 'self'`, `form-action 'self'`, `base-uri 'self'`, `object-src 'none'`, `upgrade-insecure-requests`

## How to edit

**Copy / data changes** (most common):
Edit `homepage/v9/content.js`.

**Visual changes** (colors, spacing, type, motion, shape):
Edit `homepage/v9/design-tokens.css`.

**Static copy in markup** (hero headline, section titles, manifesto, etc.):
Edit `index.html` directly.

**Component structure / behavior:**
Edit `homepage/v9/styles.css` or `homepage/v9/main.js`.

## Local preview

```sh
cd site
python3 -m http.server 8000
# then open http://localhost:8000/
```

API routes (`/api/*`) and security headers will not work under
`python -m http.server` — they're a Vercel concern. Use `vercel dev` from
this directory to test the full stack locally.

## Notes on the port

The synthesis HTML (`reference/affetto-synthesis.html`) is vanilla
HTML / CSS / JS. The v9 build preserves that architecture — markup verbatim,
CSS extracted into `styles.css`, dynamic data extracted into `content.js`
(`window.AFFETTO`), behavior extracted into `main.js`. The HANDOFF.md
describes a possible React UMD port that mirrors the prior v0.11.1 module
boundaries; that is a separate, optional follow-up. Ground truth is the
synthesis HTML and the v9 build matches it pixel-for-pixel.

# Affetto Website — v0.9 (production build)

This repository contains the production website for Affetto, ported from the
design synthesis handoff into a maintainable file structure.

## Repository layout

```
README.md                          This file
site/                              ← Vercel "Root Directory" = site
├── README.md                      Edit guide + env-var + header reference
├── index.html                     Production HTML (entry point)
├── package.json                   resend dependency for serverless functions
├── vercel.json                    Security headers (HSTS, CSP, …)
├── api/                           Serverless functions (Vercel Node)
│   ├── access.js                    POST /api/access  — form submission
│   └── config.js                    GET  /api/config  — public Turnstile key
└── homepage/v9/
    ├── design-tokens.css          All visual tokens
    ├── content.js                 All dynamic data
    ├── styles.css                 Component CSS
    └── main.js                    Behavior (incl. Turnstile-protected submit)

reference/                         (not deployed — design source of truth)
├── HANDOFF.md                     Engineer-facing spec
├── synthesis-README.md            Tim's how-to-edit guide from the handoff
└── affetto-synthesis.html         Working reference build — ground truth
```

## Vercel deployment

- **Root Directory:** `site`
- **Framework Preset:** Other (static)
- **Build Command:** none
- **Output Directory:** none (Vercel serves `site/` directly)

`site/index.html` is the entry point. `site/vercel.json` adds security headers
(HSTS, X-Frame-Options, CSP, …). `site/api/*` are Vercel Node serverless
functions that handle form submission via Cloudflare Turnstile + Resend.

**Required environment variables** (Vercel → Project → Settings → Environment
Variables): `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`,
`RESEND_API_KEY`, `RESEND_AUDIENCE_ID`. Optional: `RESEND_FROM`, `NOTIFY_TO`.
Full reference in `site/README.md`.

## How to edit

**Copy / data changes** (most common):
Edit `site/homepage/v9/content.js`. This is the single source of truth for
the 9 agents, the 5 traces, the hero stream pools, the schema variants, and
the PMS list. Save and reload.

**Visual changes** (colors, spacing, type, motion, shape):
Edit `site/homepage/v9/design-tokens.css`. Every visual property is a CSS
custom property here. Edit a value, save, the entire site updates —
equivalent to editing a Figma styles panel.

**Static copy in markup** (hero headline, section titles, manifesto, force
descriptions, outcomes, manifesto attribution, footer text):
Edit `site/index.html` directly.

**Component structure / behavior:**
Edit `site/homepage/v9/styles.css` or `site/homepage/v9/main.js`.

## Local preview

Any static file server pointed at `site/` will work. Example:

```sh
cd site
python3 -m http.server 8000
# then open http://localhost:8000/
```

## Reference

The `reference/` directory contains the design source of truth and handoff
docs. It is not deployed (lives outside the Vercel root).

- `reference/HANDOFF.md` — engineer-facing spec describing the design landing
- `reference/synthesis-README.md` — Tim's edit guide from the handoff
- `reference/affetto-synthesis.html` — working reference build. When in
  doubt about visual / behavioral fidelity, this file wins.

## Notes on the port

The synthesis HTML (`reference/affetto-synthesis.html`) is vanilla HTML / CSS
/ JS. The v9 build preserves that architecture — markup verbatim, CSS
extracted into `styles.css`, dynamic data extracted into `content.js`
(`window.AFFETTO`), behavior extracted into `main.js`. The HANDOFF.md
describes a possible React UMD port that mirrors the prior v0.11.1 module
boundaries; that is a separate, optional follow-up. Ground truth is the
synthesis HTML and the v9 build matches it pixel-for-pixel.

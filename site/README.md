# Affetto Pre-Launch Site — Production Bundle

**Version:** 0.8.0 · Final design iteration
**Built:** April 2026
**Stack:** React 18 (UMD production builds), pre-compiled JSX, no build system required

---

## What This Is

Production-ready static website for `affetto.io`. Drop the contents of this folder into any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3) and it will serve.

**No build step. No npm install. No deployment pipeline to maintain.** Just static files.

---

## File Structure

```
site/
├── index.html         ← Page shell + design tokens + CSS system
├── js/
│   ├── content.js     ← All copy. Edit this file to change any text on the page.
│   ├── motion.js      ← Animation primitives, hooks for reveal/heartbeat/visibility
│   ├── topology.js    ← The L0-L3 architecture diagram + LivingTopology
│   ├── agents.js      ← The 9-agent inventory grid + click-to-modal detail panel
│   ├── forces.js      ← The Five Forces card grid with per-card visualizations
│   ├── outcomes.js    ← The three outcome rows with redrawn schematics
│   ├── lifecycle.js   ← The four-stage vertical sequence with schematics
│   ├── hero-preview.js ← The Stage-2 hero topology preview
│   └── page.js        ← Page composition (TopBar, Masthead, Hero, sections, Footer)
├── vercel.json        ← Vercel hosting config (cache + security headers)
├── robots.txt         ← Search engine crawl directives
└── sitemap.xml        ← Search engine sitemap
```

Script load order is set in `index.html` and matters: `content.js` and `motion.js` first, then section components, then `page.js` last.

---

## How to Edit Copy

**This is the architectural property of v0.8.0:** all copy lives in one file (`js/content.js`). To change any text on the page:

1. In your GitHub repo, click `js/content.js`.
2. Click the pencil icon to edit.
3. Find the string you want to change.
4. Edit only the text *between the quotes*. Don't touch surrounding code.
5. Commit. Vercel auto-deploys in ~60 seconds.

Examples of common edits:

- Change the hero headline → search for `headline:` under `hero:`.
- Update the consolidation stat from "100,000" → search `statValue: "~100,000"`.
- Add a new audience option to the form → add to the `audienceOptions` array.
- Change the build version chrome → update `buildVersion`.

For larger changes (new sections, redesigns), don't edit directly — go through a new spec round.

---

## Performance Profile

- **First load:** ~190KB total (HTML + CSS + JS + React + Geist)
- **Render:** Sub-second on broadband, under 2.5s on 4G mobile
- **Animation:** 60fps target, GPU-accelerated, respects `prefers-reduced-motion`
- **Print:** clean static document, ~6-8 pages

---

## Design System (Locked at v0.8.0)

- **Typography:** Geist Sans (Vercel, OFL) — primary and display. Geist Mono available for chrome.
- **Modular scale:** 1.25 ratio, 16px body floor. Tokens defined in `:root` of `index.html`.
- **Grid:** 12 columns desktop / 8 columns tablet / 4 columns mobile. 8px baseline.
- **Color:** restrained palette — paper, ink (4 stops), single accent (`#C2331A`).
- **Breakpoints:**
  - Mobile: < 768px (`bp = "sm"`)
  - Tablet: 768–1099px (`bp = "md"`)
  - Desktop: ≥ 1100px (`bp = "lg"`)
- **Topology orientation switch:** vertical at `sm` and `md`; horizontal at `lg`.

---

## Troubleshooting

**Page is blank when I open `index.html` directly from my desktop.** Expected. The page uses absolute paths (`/js/content.js`). Serve via a web server — once deployed to Vercel, it works.

**Want to preview locally before deploying?** Open Terminal, navigate to the `site/` folder, run `python3 -m http.server 8080`, then visit `http://localhost:8080`. (Mac: Python is pre-installed.)

**A copy change broke the page.** Most likely you edited JavaScript syntax (a quote, bracket, or comma) instead of text. Open the browser dev console (Cmd+Option+I), look at the error. If you can't tell what's wrong, restore the file from this bundle.

**Form doesn't capture submissions.** The form is currently a frontend-only component. To wire it up to Formspree or another backend, edit the form's submit handler in `js/page.js` (search for `Access` function). Or ask your tech architect for the wiring spec.

---

## Maintenance Cadence

This is a teaser site. Plan for:

- **Pre-launch (now → Q3 2026):** edits to copy via `content.js`. Stat updates as research firms publish new data.
- **At launch (Q3 2026):** retire this teaser in favor of a full marketing site (multiple pages, CMS, case studies, etc.).

This bundle is not designed to grow into the full site. When that work begins, start fresh with a real framework (Next.js or similar).

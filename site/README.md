# Affetto Website — v0.9 (production build)

This repository contains the production website for Affetto, ported from the
design synthesis handoff into a maintainable file structure.

## What ships

```
affetto homepage v9.html      Production HTML (entry point)
homepage/v9/
├── design-tokens.css         All visual tokens — colors, type, motion, shape
├── content.js                All dynamic data — agents, traces, streams, PMS
├── styles.css                Component CSS (reads from design-tokens.css)
└── main.js                   Behavior — reveal, streams, trace, agents,
                              architecture stagger, schema rewrite, source
                              selector, access form
```

## How to edit

**Copy / data changes** (most common):
Edit `homepage/v9/content.js`. This is the single source of truth for the 9
agents, the 5 traces, the hero stream pools, the schema variants, and the PMS
list. Save and reload.

**Visual changes** (colors, spacing, type, motion, shape):
Edit `homepage/v9/design-tokens.css`. Every visual property is a CSS custom
property here. Edit a value, save, the entire site updates — equivalent to
editing a Figma styles panel.

**Static copy in markup** (hero headline, section titles, manifesto, force
descriptions, outcomes, manifesto attribution, footer text):
Edit `affetto homepage v9.html` directly.

**Component structure / behavior**:
Edit `homepage/v9/styles.css` or `homepage/v9/main.js`.

## Reference

The `reference/` directory contains the design source of truth:

```
reference/
├── HANDOFF.md                Engineer-facing spec for the design landing
├── synthesis-README.md       Tim's how-to-edit guide from the handoff
└── affetto-synthesis.html    Working reference build — ground truth.
                              When in doubt about visual / behavioral
                              fidelity, this file wins.
```

## Local preview

Any static file server pointed at the repository root will work. Example:

```sh
python3 -m http.server 8000
# then open http://localhost:8000/affetto%20homepage%20v9.html
```

## Notes on the port

The synthesis HTML (`reference/affetto-synthesis.html`) is vanilla HTML / CSS /
JS. The v9 build preserves that architecture — markup verbatim, CSS extracted
into `styles.css`, dynamic data extracted into `content.js`
(`window.AFFETTO`), behavior extracted into `main.js`. The HANDOFF.md describes
a possible React UMD port that mirrors the prior v0.11.1 module boundaries;
that is a separate, optional follow-up. Ground truth is the synthesis HTML and
the v9 build matches it pixel-for-pixel.

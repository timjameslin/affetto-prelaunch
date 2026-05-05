# Affetto handoff — quick guide

This folder contains everything needed to land the new Affetto site design into production. There are four files. Read this first.

## What's here

```
HANDOFF.md              — Spec for Claude Code (engineer-facing). Tim doesn't need to read this.
content.js              — All copy + data. EDIT THIS to change strings.
design-tokens.css       — All visual tokens. EDIT THIS to adjust colors/type/spacing.
affetto-synthesis.html  — Working reference build. Open in browser. Don't edit.
```

## How to change copy

1. Open `content.js` in your editor.
2. Find the section you want to change (sections are in document order, top to bottom, with comment headers).
3. Edit the string. Keep the surrounding structure intact (the JS object shape).
4. Save. Send to Claude Code. Site updates.

**Conventions:**
- Use `<code>...</code>` tags around technical values (numbers, dollar amounts, code references) — they render in monospace.
- Em-dashes are written as `\u2014`. Middle-dot separators are `\u00b7`. (These render as — and · respectively.)
- Don't include timestamps in floor signals or activity strings — those generate dynamically.

**Example — changing the hero headline:**

```js
// Before:
headline: {
  bold: "You deliver the care. Affetto runs",
  quiet: "everything else."
},

// After:
headline: {
  bold: "You see patients. Affetto runs",
  quiet: "the rest."
},
```

That's it. No CSS or JS changes needed.

## How to adjust visuals

1. Open `design-tokens.css`.
2. Find the token you want to change (organized by MD3 layer — color, shape, motion, type).
3. Edit the value. Save.

**Common edits:**
- Shift accent color: change `--md-sys-color-primary` (the oxblood `#8B2A1E`)
- Make sections tighter: change `--space-section` (currently 160px desktop)
- Adjust corner radius: change one of the `--md-sys-shape-corner-*` values

The reference HTML pulls these tokens directly. Component code in production should pull from this same file.

## How to verify changes

Open `affetto-synthesis.html` in your browser. Every change should be visible there before shipping. The reference build is the ground truth — if something looks different in production than the reference, production is wrong.

## What NOT to edit

- `affetto-synthesis.html` — reference only. Edits here won't make it to production.
- `HANDOFF.md` — engineer-facing spec. Not for content edits.

## Open items in `content.js`

Sections you mentioned wanting to revise:
- Hero headline + substance paragraph
- Forces stat values + sources
- Outcomes statements
- Manifesto attribution

All of these live in `content.js` and can be revised independently of the structural code.

---

**Hand this whole folder to Claude Code.** They'll build the integration. When you want to update copy after that, edit `content.js` and ping them — copy edits should be a 1-line change in their codebase.

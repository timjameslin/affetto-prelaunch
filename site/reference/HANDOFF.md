# Affetto Website — Handoff to Claude Code

**From:** Tim (founder, design lead) + design partner
**To:** Claude Code (production engineer, owner of v0.11.1 React UMD build)
**Goal:** Land the design exploration shipped in `affetto-synthesis.html` into the production codebase.

---

## TL;DR

You're receiving a complete reference implementation of the new Affetto website design as a single self-contained HTML file (`affetto-synthesis.html`). It works — open it in a browser and everything animates, cycles, and responds. Your job is to port this back into the production v0.11.1 React UMD architecture (`content.js`, `motion.js`, `topology.js`, etc.) without breaking the existing module boundaries.

To make Tim's ongoing copy edits easy, copy is extracted into a dedicated `content.js` file. To make visual adjustments easy, design tokens are extracted into `design-tokens.css`. Touch those files for content/visual changes; touch component code only for structural changes.

**Three deliverables in this folder:**

| File                    | Purpose                                | Edited by    |
|-------------------------|----------------------------------------|--------------|
| `affetto-synthesis.html`| Working reference — ground truth       | Don't edit   |
| `content.js`            | All copy + data — single source for strings | Tim     |
| `design-tokens.css`     | All visual tokens — colors, type, motion, shape | Tim |

You'll create additional component code files as needed. Keep them thin — pull data from `content.js`, pull styles from `design-tokens.css`, never hard-code strings or hex values in component code.

---

## What's new vs. v0.11.1

The previous build was structurally sound. This iteration tightens the visual register, adds two new live components, and reframes the section hierarchy. Specifically:

**New / significantly changed:**
1. **Material Design 3 token system** — full MD3 color roles, type scale, shape, and motion tokens. Replaces the ad-hoc palette in v0.11.1.
2. **Affetto logo integration** — clean SVG icon (extracted polygons from `Affetto_Group_Logo.svg`) in masthead and footer. Uses `currentColor` so it inherits from container.
3. **Hero — short two-column layout** — left: copy + CTAs; right: live two-column stream (`PRACTICE FLOOR` + `AGENTS`).
4. **Hero stream** — two parallel live feeds with different cadences (floor 2.6s, agents 3.4s). Fresh-glow on new arrivals. 8 rows visible per column. Replaces the static hero.
5. **Live trace section** — full-bleed dark surface with rounded corners. Auto-cycles 5 traces, each with 6 stations. Active station has accent ring pulse.
6. **iTero-inspired motion background** — drifting point cloud + flickering mesh edges + slow scan sweep. Used in trace section AND footer (which is now also dark).
7. **§02 Agent showcase** — featured agent panel + 9-tile grid with downstream-pulse interconnectivity moments.
8. **§03 System architecture** — 4-layer diagram (L0 Source / L1 Connectors / L2 Contract / L3 Engine) with PMS chip selector.
9. **Surreal moments preserved** — architecture fade-on-scroll, schema entity rewrite (patient↔subject) once on viewport entry.
10. **Dark footer** — converted from light to dark surface to bookend the page with the trace section.

**Section order (top to bottom):**
Masthead → §01 Hero (with stream) → Live Trace (full-bleed dark) → §02 What it does (agents) → §03 The system → Manifesto pull-quote → §04 Five forces → §05 Outcomes → §06 Access → Footer (dark)

---

## File-by-file integration plan

The v0.11.1 production architecture has these core files in `/src/`:

```
content.js     — copy + data
motion.js      — scroll-driven reveal, prefers-reduced-motion handling
topology.js    — architecture diagram (L0-L3 layers + schema entities)
agents.js      — §02 agent showcase logic
forces.js      — §04 forces section logic
outcomes.js    — §05 outcomes section logic
lifecycle.js   — boot + cross-section coordination
hero-preview.js — old hero (DEPRECATE — replaced by hero-stream.js)
system-tabs.js — system section tab logic
live-engine.js — engine loop / RAF coordination
page.js        — root page composition
```

### Files to update (existing)

| File             | Change                                                    |
|------------------|-----------------------------------------------------------|
| `content.js`     | **Replace entirely** with new `content.js` from this handoff. New shape, new keys. Existing consumers will break — update them per this doc. |
| `topology.js`    | Update L0/L1/L2/L3 data-driven rendering to read from `content.systemSection.layers`. Schema entity rewrite logic stays — pull variants from `content.systemSection.layers.l2.entityVariants`. |
| `agents.js`      | Update featured-agent rotation + tile grid to read from `content.agentsSection.agents`. Add downstream-pulse interconnectivity logic (see Component Specs below). |
| `forces.js`      | Update to read from `content.forcesSection.forces`. |
| `outcomes.js`    | Update to read from `content.outcomesSection.outcomes`. |
| `motion.js`      | Add support for `data-reveal` stagger attribute. Add scan-sweep + mesh background opt-in. |
| `live-engine.js` | Add hero-stream tick handlers (floor + agents columns). Add trace cycle handler. |
| `lifecycle.js`   | Wire up the new components on boot. |
| `page.js`        | Re-compose section order + new section components. |

### Files to create (new)

| File                  | Purpose                                                       |
|-----------------------|---------------------------------------------------------------|
| `design-tokens.css`   | Drop in from this handoff folder. Import first in stylesheet. |
| `hero-stream.js`      | New hero stream component (two-column live feed). |
| `trace.js`            | New live trace component (5-trace cycle, 6 stations each). |
| `motion-bg.js`        | New mesh background utility — generates SVG point cloud + mesh edges + scan sweep, mounts into `.motion-bg` containers. |
| `affetto-logo.svg`    | Extract the icon polygons (provided in this doc) into a reusable SVG file. |

### Files to deprecate

| File              | Reason |
|-------------------|--------|
| `hero-preview.js` | Replaced by `hero-stream.js` (different component entirely). |

---

## Component specs — new components

Each spec includes: data shape, behavior, animation timing, accessibility notes.

### 1. Affetto Logo (icon)

**Source:** Extracted from `Affetto_Group_Logo.svg` (Adobe Illustrator export).

**SVG markup** (use as a reusable component):

```html
<svg viewBox="607.5 0 272.6 263" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
  <polygon points="743.8,0 607.5,80.2 607.5,132.4 744.2,51.6 880.1,132.4 880.1,80.2"/>
  <polygon points="814.6,147.1 769.3,172.9 795.5,188.7 752.8,213.8 688.6,179 779.6,128.3 742.5,104.5 607.5,184.4 743.8,263 880.1,184.4"/>
</svg>
```

**Coloring:** Uses `fill="currentColor"`. Color is set on the `.brand-icon` container (NOT on the `<svg>` element directly — that breaks the inheritance chain in dark contexts). Default container color: `var(--ink)`. Override in footer to `var(--md-sys-color-on-inverse-surface)`.

### 2. Hero stream (`hero-stream.js`)

**Layout:** Two side-by-side columns, each 480px tall (380px on mobile).
- Left column: `PRACTICE FLOOR` — floor signals, no agent code prefix
- Right column: `AGENTS` — agent actions with mono code prefix (TRT, RCM, etc.)

**Data:** `content.heroStream.floorSignals[]` and `content.heroStream.agentActions[]`.

**Behavior:**
- Each column seeds 8 rows on init (full from page load, no awkward filling)
- New row spawns every 2.6s (floor) / 3.4s (agents) — different cadences so columns don't lockstep
- New row enters at the bottom with `.fresh` class → accent glow background + accent agent code → 1.4s later, removes `.fresh` (returns to normal)
- Old row (top of stack) drifts up + fades over 800ms when displaced

**Activity pool cycling:** Sequential, looped. `dataIdx = (dataIdx + 1) % pool.length`.

**Time strings:** Generated dynamically. Use `offsetTime(secAgo)` helper that returns `HH:MM:SS` for `now - secAgo`. Don't store timestamps in content data.

**Reduced motion:** Skip the spawn loop entirely. Render the seeded 8 rows once, no further updates. Reference: `if (reduceMotion) return;` after seeding.

**Reference implementation:** Lines ~2620-2670 of `affetto-synthesis.html` (search for `initStream`).

### 3. Live trace (`trace.js`)

**Layout:** Full-bleed dark section with `border-radius: var(--md-sys-shape-corner-extra-large)` (28px). `max-width: 1440px` so it has internal margin on ultra-wide screens.

**Data:** `content.trace.traces[]` — 5 traces, each with 6 steps.

**Components:**
- Eyebrow strip (LIVE pip + "THE ENGINE, IN MOTION." mono caps)
- Title (with quiet second clause)
- Counter (right-side `TRACE 01 / 05`)
- Entity row (label + dynamic title that swaps per trace)
- Trace flow box (rounded panel with stations)
- Indicators (5 progress hairlines below, one active per trace)
- Foot caption ("A patient, end-to-end. Six seconds. ...")

**Trace flow box:**
- Padding: `56px 32px 40px` (desktop), `32px 18px 24px` (mobile)
- Stations: 6-column grid on desktop, wraps to 3×2 on mobile
- Each station: 56px circle node + label below + action below that
- Active station: accent ring pulse (`box-shadow: 0 0 0 2px accent`)
- Connector line: 1px hairline at `top: 28px` (passes through vertical center of station nodes)
- Progress bar: same line + position, but accent color, width animated to current step %

**CRITICAL — mobile fix locked in this iteration:**
At viewports below 768px the stations wrap to 3×2 grid, and the connector line + progress bar no longer represent linear progression. **Hide both at this breakpoint:**

```css
@media (max-width: 767px) {
  .trace-line, .trace-progress { display: none; }
}
```

The active station's accent ring still conveys "current step" without the connector. This was a real visual bug on the previous iteration — keep this fix.

**Behavior:**
- Each trace runs through its 6 stations sequentially: ~600ms between station activations
- After 6th station completes, ~1.5s pause showing fully-completed trace
- Then advance to next trace, swap entity title (fade out → swap → fade in over 600ms), restart
- Total per trace ~10s. 5 traces = 50s loop.
- Indicator below highlights which trace is active (1 of 5 in accent, others muted)

**Reference implementation:** Lines ~2841-2920 of `affetto-synthesis.html` (search for `/* TRACE */`).

### 4. Agent showcase (`agents.js`) — interconnectivity behavior

**Layout:**
- Featured panel (left side, ~60% width): massive code in display size, agent name, description, bridge frame ("FROM FLOOR" / "TO BUSINESS" with 2px accent progress bar between them)
- Activity log (right side of featured panel): scrolling activity rows from currently featured agent
- 9-tile grid below: each tile shows index, code, name. Currently featured tile gets highlight state.

**Data:** `content.agentsSection.agents[]` — 9 agents, each with `code`, `triggers[]` (downstream agent codes that pulse when this agent acts), `activities[]` (5 strings).

**Behavior:**
- **Auto-rotation:** Featured agent rotates every 9000ms (FEATURED_DURATION constant)
- **Activity log:** New activity row appears every 1500ms (ACTIVITY_INTERVAL), max 5 visible (MAX_ACTIVITY_ROWS)
- **Click-to-focus:** User clicks any tile → that agent becomes featured, rotation pauses 30s, then resumes
- **THE INTERCONNECTIVITY MOMENT:** When an activity row is added to the featured agent's log, find that agent's `triggers[]` array. For each agent code in that array, find its tile in the grid and add a `.pulse` class for 1.7s. Stagger the pulses by 100ms so they cascade rather than fire simultaneously. This is the visual demonstration that agents talk to each other through the substrate.

**Pulse animation (CSS):**
```css
.agent-tile.pulse {
  animation: tile-pulse 1.7s var(--md-sys-motion-easing-emphasized);
}
@keyframes tile-pulse {
  0%, 100% { box-shadow: 0 0 0 0 var(--accent-glow); }
  30%      { box-shadow: 0 0 0 6px var(--accent-glow); }
}
```

**Reference implementation:** Lines ~2920-3050 of `affetto-synthesis.html` (search for `/* §02 AGENTS */`).

### 5. Mesh motion background (`motion-bg.js`)

This is the iTero-inspired background used in BOTH the trace section and the footer. Same component, different parameters.

**Composition (3 layers, all inside one `.motion-bg` container):**
1. **Scan sweep** — CSS-only `<div class="scan-sweep">` with animated background-position. Soft vertical gradient band traverses left-to-right over 38s (trace) / 64s (footer).
2. **Mesh edges** — SVG `<line>` elements with 5 `<animate>` children each (opacity flicker + x1/y1/x2/y2 drift). Connect nearby points (within ~200px proximity).
3. **Point cloud** — SVG `<circle>` elements with 2 `<animate>` children each (cx/cy drift). Mostly paper-color dim, a few accent-color (inverse-primary).

**Trace section parameters:**
- Point count: 28 (4 accent, 24 dim)
- Edge count: 43
- viewBox: `0 0 1440 600`
- Edge stroke: `rgba(232,227,213, 0.10)` width 0.5
- Edge opacity keyframes: `0;0;0.5;0` (visible briefly, then fades)
- Edge flicker duration: 8-22s randomized per edge
- Point drift duration: 28-48s randomized per point

**Footer parameters (quieter):**
- Point count: 14 (1 accent, 13 dim)
- Edge count: 20
- viewBox: `0 0 1440 300`
- Same stroke + keyframes
- Edge flicker duration: 10-22s
- Point drift duration: 38-60s
- Scan sweep: 64s instead of 38s, opacity 0.65

**CRITICAL — content-aware safe zones:**
Points and edges must NOT cross through content areas. The point/edge generator algorithmically rejects any candidate that would land inside or pass through these zones (per section):

Trace section (1440×600):
- Trace flow box: x 100-1340, y 360-580
- Headline: x 100-700, y 130-260
- Entity row: x 100-700, y 285-340
- Eyebrow: x 100-400, y 90-115
- Trace counter: x 1200-1340, y 200-250

Footer (1440×300):
- Brand column: x 40-320, y 200-290
- Contact column: x 440-720, y 200-290
- Legal column: x 800-1200, y 200-290

For each candidate edge, sample 4 points along the line (at t=0.2, 0.4, 0.6, 0.8) and reject the edge if ANY sampled point lands inside a content zone. This is what keeps the mesh feeling like an atmospheric layer rather than visual interference.

**Mobile:**
```css
@media (max-width: 767px) {
  .motion-bg .mesh { display: none; }
}
```
Hide mesh below 768px (scaling artifacts on narrow viewports). Scan sweep remains.

**Reduced motion:**
```css
@media (prefers-reduced-motion: reduce) {
  .motion-bg .scan-sweep { animation: none; opacity: 0; }
  .motion-bg .mesh circle, .motion-bg .mesh line { animation: none !important; }
}
```

**Generation approach:**
The reference HTML hardcodes the SVG output (28 + 43 + 14 + 20 = ~105 animated elements with all their `<animate>` children inline). For the production build, you have two options:
1. **Hardcode** — copy the SVG markup verbatim from the reference HTML lines ~2176-2220 (trace) and ~2640-2660 (footer). Simplest, zero JS overhead.
2. **Generate at build time** — port the Python generator (logic in this conversation, can re-derive) to a build script that emits the SVG into a static asset. More flexible but more machinery.

**Recommendation: hardcode.** The motion-bg layout is fixed and tuned. There's no runtime variation. Generated SVG would be over-engineering.

**Reference implementation:** Lines ~2176-2220 (trace SVG) and ~2640-2660 (footer SVG) of `affetto-synthesis.html`.

### 6. Hero CTA bounce + accent underline

The "SEE THE ENGINE ↓" ghost CTA has two ambient behaviors:
1. **Continuous chevron bounce** — gentle 3px vertical oscillation on a 2.8s cycle. CSS animation, runs at rest.
2. **Accent underline on hover** — 1px accent line sweeps in from left to right via `scaleX(0)` → `scaleX(1)` over 300ms with emphasized easing.

Both respect `prefers-reduced-motion`.

CSS reference: `affetto-synthesis.html` lines ~539-585 (search for `.cta-ghost`).

### 7. Surreal moments

Two preserved from v0.11.1:

1. **Architecture fade-on-scroll** — When §03 system section scrolls into view, the 4 layers (L0/L1/L2/L3) fade in with 700ms stagger from L0 → L3. IntersectionObserver-driven.

2. **Schema entity rewrite** — When §03 L2 keystone enters viewport, each schema entity name (`patient`, `appointment`, etc.) cycles once through its variant pair (e.g. `patient` → `subject` → `patient`) over 1.4s with 200ms stagger between entities. Variants in `content.systemSection.layers.l2.entityVariants`.

---

## Token migration

The current production palette in v0.11.1 likely uses ad-hoc hex values. Migrate to the MD3 token system in `design-tokens.css`. Keep both systems running during the transition — alias old token names to new ones in a transitional CSS block, then phase out call sites incrementally.

**Critical color shifts:**
- Old paper → New paper: `#F7F4ED` (slightly warmer, more archival)
- Old ink → New ink: `#131210` (slightly cooler, less warm-black)
- Old accent → New accent: `#8B2A1E` (oxblood — was likely brighter red before)
- New: warm accent on dark `#C44A2D` (used in mesh accent points + trace progress glow)

**Critical type families:**
- Brand wordmark (AFFETTO): Barlow 700, 8% letter-spacing — wordmark only, do NOT use elsewhere
- Headlines + body: Geist Sans
- Eyebrows + technical strings + agent codes: Geist Mono

**Shape tokens:** MD3 scale (none / xs 4 / sm 8 / md 12 / lg 16 / xl 28 / full 999). Trace section uses `--xl` for outer corners. CTAs use `--sm`. Tiles + input fields use `--md`.

---

## Behavior contracts (don't break these)

- **Reveal on scroll:** Every `[data-reveal]` element fades in + slides up 8px on viewport entry. IntersectionObserver, threshold 0.12, rootMargin `0px 0px -60px 0px`. Already in `motion.js`.
- **Reduced motion:** Every animation must respect `prefers-reduced-motion: reduce`. Pattern is a CSS media query OR a JS `reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches` check before starting any RAF or interval.
- **No FOUC:** Any element that animates in (`.stream-row`, `.activity-row`, etc.) must start at `opacity: 0` and only become visible via `.in` class added by JS — never visible without JS, to avoid flicker.
- **Pip alignment:** `.live-mark` containers must be `display: inline-flex` with proper `align-items: center` and a small `gap`. The `.pip` (live indicator dot) needs `flex-shrink: 0` to keep its 5px square shape. Bug fix locked from earlier iteration: don't let pip become elliptical or get squashed by neighbors.
- **Agent code colors:** Accent color (oxblood) on light surface. Inverse-primary (warmer red-orange `#C44A2D`) on dark surface. Don't use the same hex on both surfaces — contrast suffers.

---

## Asset inventory

| Asset                | Source                                         | Where used |
|----------------------|-----------------------------------------------|---|
| Affetto logo (icon)  | `/mnt/user-data/uploads/Affetto_Group_Logo.svg` | Masthead, footer (extracted polygons used) |
| Geist Sans + Mono    | `https://vercel.com/font` (web fonts)         | All non-brand type |
| Barlow               | Google Fonts                                   | Wordmark only (AFFETTO) |

Logo PNG variants (`Affetto-Icon-Black.png`, `Instagram-1.png`) are corrupted — do NOT use these. Only the SVG export is clean.

---

## Open items (Tim's domain — don't block on these)

These are content/copy decisions Tim is iterating on. They don't block your integration work — wire up the structure, Tim edits `content.js`:

- Final headline copy
- Substance paragraph wording
- Forces section stat values + sources (some are placeholders)
- Outcomes statements
- Manifesto attribution wording

When Tim ships content updates, only `content.js` changes. Component code stays put.

---

## Suggested integration order

1. Drop in `design-tokens.css`. Import first in stylesheet. Verify nothing breaks at the token level.
2. Drop in new `content.js`. Update existing call sites to read new keys. Resolve all imports.
3. Update masthead to use the SVG logo + new wordmark styling.
4. Build `hero-stream.js` from reference. Wire into hero section.
5. Build `trace.js` from reference. Wire into new trace section.
6. Update `agents.js` for new featured/grid layout + interconnectivity pulses.
7. Update `topology.js` for new 4-layer architecture.
8. Update `forces.js` and `outcomes.js` for new content shape.
9. Drop in `motion-bg.js` (or hardcode SVG markup directly into trace + footer).
10. Convert footer to dark surface. Verify logo color override.
11. Add hero CTA bounce + accent underline.
12. Verify all 4 surreal moments: reveal, fade-stagger, schema rewrite, agent pulse.
13. Test at 1440 / 1024 / 768 / 600 / 390 viewports.
14. Test with `prefers-reduced-motion: reduce` enabled.

---

## What to ping Tim about

- **Visual disagreement:** If something in the reference HTML looks wrong to you, ask before deviating. The reference is ground truth.
- **Architecture conflict:** If the v0.11.1 module boundaries make a clean port hard, propose a migration path before diverging.
- **Content questions:** Don't make up copy. Ask Tim. He's the source.
- **Performance issues:** The mesh background is ~105 animated SVG elements. If you measure jank on lower-end devices, propose a lighter variant (fewer points/edges, longer durations).

---

**Reference build:** Open `affetto-synthesis.html` in any modern browser. Everything in this doc is implemented there. When in doubt, that file wins.

Good luck. Ship it well.

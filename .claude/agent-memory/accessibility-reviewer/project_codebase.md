---
name: Codebase accessibility baseline
description: Key structural facts about this Jekyll site that affect every accessibility review — colours, layout, skip-link status, focus styles
type: project
---

Custom Jekyll theme (no Minima). All layouts in `_layouts/`, all includes in `_includes/`.

**Colour tokens (resolved hex values from `_includes/head.html` Tailwind config):**
- obsidian: #1C1D21
- ink: #2E3039
- storm: #5B6070
- mist: #E2E4EA
- cloud: #F5F6F8
- accent-400: #7A95A8
- accent-600: #4D7287
- accent-800: #2C4F61

**Known contrast issues:**
- `text-storm` (#5B6070) on white (#FFFFFF) — ratio ~4.48:1, borderline pass for normal text at 16px. Fails for smaller text or sub-16px sizes. Requires case-by-case size check.
- `text-accent-600` (#4D7287) on white — ratio ~4.56:1, marginal pass for normal text.
- Timeline bullet `before:text-mist` (#E2E4EA) used as a decorative dash — extremely low contrast (~1.3:1 on white), but purely decorative (not conveying information).
- `text-mist` (#E2E4EA) on `bg-obsidian` (#1C1D21) in sidebar — high contrast, passes.

**Focus styles:** `a:focus-visible` and `button:focus-visible` have `outline: 2px solid #4D7287` in `assets/css/main.scss`. UIKit form elements suppress `outline: none` on focus (replaced by box-shadow).

**Skip link:** No skip-to-content link exists anywhere in the codebase (checked `_layouts/default.html`, `_includes/sidebar.html`, `_includes/head.html`, and root HTML files).

**`<main>` element:** Present in `_layouts/default.html` line 73 with `id="main-content"`. No `aria-label` — acceptable as only one main landmark.

**Heading hierarchy on index.html:** h1 (page header, default.html line 66) → h2 per section → h3 for company names within Experience. Position titles (`<span>`, not headings) sit inside timeline entries. This is a flat list structure with no h4 for roles — currently acceptable but positions lack heading markup entirely.

**Why:** Needed as baseline context for every future audit of this repo.
**How to apply:** Reference these resolved values immediately when auditing colour contrast instead of re-reading the Tailwind config. Flag skip-link absence as a persistent Critical issue until fixed.

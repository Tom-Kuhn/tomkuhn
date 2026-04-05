---
name: Codebase accessibility baseline
description: Key structural facts about this Jekyll site that affect every accessibility review — colours, layout, skip-link status, focus styles, landmark structure
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

**Verified contrast ratios (WCAG relative luminance):**
- storm (#5B6070) on white (#FFFFFF): ~6.13:1 — PASSES 4.5:1 (normal text) and 3:1 (UI components)
- storm (#5B6070) on obsidian (#1C1D21): ~2.75:1 — FAILS 3:1 (UI components, WCAG 1.4.11)
- accent-600 (#4D7287) on white (#FFFFFF): ~5.15:1 — PASSES 4.5:1
- accent-600 (#4D7287) on cloud (#F5F6F8): ~4.77:1 — PASSES 4.5:1
- accent-400 (#7A95A8) on obsidian (#1C1D21): ~5.40:1 — PASSES (active nav items)
- mist (#E2E4EA) on obsidian (#1C1D21): ~13.41:1 — PASSES (sidebar nav text)
- ink (#2E3039) on white (#FFFFFF): ~13.17:1 — PASSES

**Known failures:**
- `text-storm` on `bg-obsidian`: sidebar toggle button and offcanvas close button — 2.75:1, fails WCAG 1.4.11 (UI component 3:1 threshold)
- UIKit focus ring on inputs: `outline: none` replaced by `box-shadow: 0 0 0 3px rgba(77,114,135,0.15)` — at alpha 0.15 the effective colour blends near-white and almost certainly fails WCAG 1.4.11 non-text contrast 3:1

**Skip link:** EXISTS at `_layouts/default.html` line 7 (`<a href="#main-content">`). Was absent in earlier audit — now present.

**Focus styles:** `a:focus-visible` and `button:focus-visible` have `outline: 2px solid #4D7287` in `assets/css/main.scss` line 140-145. UIKit form elements suppress `outline: none` on focus (replaced by box-shadow — see known failures above).

**`<main>` element:** Present in `_layouts/default.html` line 74 with `id="main-content"`. No `aria-label` — acceptable as only one main landmark.

**Landmark structure per page (desktop):**
- `<aside aria-label="Site navigation">` (desktop sidebar, line 11 default.html)
- `<header aria-label="Mobile navigation">` → banner landmark (hidden on desktop, but still in DOM)
- `<header id="page-header" aria-label="Page title">` → second banner landmark (pages with show_page_header or post layout)
- `<main id="main-content">` → main landmark
- `<footer role="contentinfo">` → contentinfo landmark (role is redundant — footer already maps to contentinfo)

Having two banner landmarks is valid only with distinguishable accessible names, which are present.

**Sidebar collapsed state — critical a11y gap:**
When sidebar collapses, `.nav-label` spans are `display: none`. Nav links have no `aria-label` and the UIKit icon spans (`<span uk-icon>`) render SVGs that are not explicitly aria-hidden. If UIKit does not inject aria-hidden on the SVG, the link has no accessible name in collapsed state. Requires verification in rendered HTML.

**Sidebar toggle aria-label static bug:**
`aria-label="Collapse sidebar"` on `#sidebar-toggle` is never updated by JS when expanded. After collapsing, it still reads "Collapse sidebar" — should dynamically toggle to "Expand sidebar".

**Heading hierarchy:**
- index.html: h1 (page header) → h2 per section → h3 for company names → no h4 for role titles (roles use `<button>` or `<span>`, not headings — flagged informational)
- post.html: h1 (page header from default.html) → post body starts with markdown h2+
- archive.html / tag.html: own h1 in content (show_page_header not set, so no second h1)
- 404.html: h1 "Page not found" in content (show_page_header not set)

**"Read more" link accessibility:**
- `blog.html` (writing page): "Read more" links lack aria-label — non-descriptive in isolation
- `index.html`: "Read more" links have `aria-label="Read more about {{ post.title }}"` — correct
- `archive.html` / `tag.html`: "Read more" links lack aria-label

**Dynamic search results (search.html):**
- `#search-results` container lacks `aria-live` — injected results not announced to screen readers
- Search input is not wrapped in a `<form>` — acceptable for live-search pattern but limits keyboard Enter-to-submit

**Why:** Baseline for all future audits of this repo.
**How to apply:** Reference these resolved ratios and known issues immediately. Do not re-verify passing ratios. Flag skip-link as now RESOLVED. Flag sidebar collapse accessible name, sidebar toggle aria-label, and search live region as persistent open issues until fixed.

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

**New semantic classes (added in session 2026-04-05):**
- `.role-toggle` — `<button>` wrapping collapsible experience rows; inherits global `button:focus-visible` outline (#4D7287). No dedicated focus-visible rule needed — confirmed covered.
- `.role-name` — `<span>` inside `.role-toggle`; color #4D7287 (accent-600) on white bg (5.15:1, passes). Inside button, also appears in static rows not wrapped in a button.
- `.role-date` — `<span>` color #2E3039 (ink) on white bg (13.17:1, passes).
- `.company-name` — color #1C1D21 (obsidian) on white bg — passes.
- `.bullet-list` — `list-style: none`, `padding: 0` — semantic list stripped visually; bullet items use `.bullet-item` with CSS `::before` em-dash. No `role="list"` applied to the `<ul>` itself (VoiceOver may not announce as list due to CSS list-style: none).
- `.mobile-nav-link` — `<a>` base class; active/inactive colours still via Tailwind utilities. No `aria-current` attribute on active link — active state conveyed by colour only.
- `.card-action-btn` — applied to `<a>` elements alongside `uk-button uk-button-default`. Focus style via `a:focus-visible`. UIKit may suppress outline on `.uk-button` — requires manual verification.

**Known open issues (unresolved as of 2026-04-06 — session 2):**
- Sidebar toggle aria-label static ("Collapse sidebar" never updates to "Expand sidebar") — PERSISTENT
- `aria-current` absent on sidebar nav links in `_includes/sidebar.html` — mobile nav has `aria-current="page"` but sidebar does NOT. Active state is colour-only in sidebar. WCAG 1.3.1 / 1.4.1 concern.
- `.bullet-list` (`list-style: none` + `padding: 0`) may suppress VoiceOver list semantics — `role="list"` applied to `<ul>` in index.html (education/experience), which mitigates the VoiceOver issue.
- `sr-only` class used in `_layouts/default.html` (line 93, sitemap link) and `search.html` (line 121, result count) but is NOT defined in `assets/css/main.scss`. Class is supplied at runtime by the Tailwind CDN Play script. If Tailwind CDN is ever removed, these elements lose their visually-hidden styling. Low risk currently but a fragile dependency.
- Residual Tailwind utility classes in `index.html`: `relative`, `pl-4`, `pb-1`, `pb-3`, `flex`, `items-center`, `gap-2`, `hidden`, `mt-3` — not converted to semantic CSS. Currently functional via Tailwind CDN but are not part of the semantic refactor.
- Multiple CSS `transition:` declarations are NOT wrapped in `@media (prefers-reduced-motion: no-preference)`. Affects users with vestibular disorders. WCAG 2.3.3 (AAA) / best practice Warning. Sidebar width/margin transitions added in session 1 remain unguarded.
- Search live region: `#search-results` now HAS `aria-live="polite" aria-atomic="false"` — RESOLVED as of session 2 review.
- `work.html` card buttons use `href="#"` for placeholder items — these open `#` (current page top) in a new tab (`target="_blank"`), which is disorienting. Should use `href` of a real destination or be `disabled`/`aria-disabled="true"` when not yet published.

**Resolved in 2026-04-06 session 1:**
- Sidebar collapse accessible name: RESOLVED. Icon spans have `aria-hidden="true"`, nav links have `aria-label` on `<a>`, `.nav-label` spans are `aria-hidden="true"`.

**Resolved in 2026-04-06 session 2 (semantic refactor review):**
- Search live region now present: `aria-live="polite" aria-atomic="false"` on `#search-results` in `search.html`.
- Mobile nav `aria-current="page"` confirmed present on all five links in `_layouts/default.html`.
- `role-toggle` button accessible name confirmed: `aria-label="{{ role.title }} at {{ company.company }}"` present.
- `.card-action-btn` focus style confirmed: explicit `card-action-btn:focus-visible` rule in `main.scss` line 1091 with `outline: 2px solid #4D7287 !important` overriding any UIKit suppression.
- `role-details` panel focus: `aria-expanded` toggled correctly in inline JS (index.html lines 167–183); `role="region"` + `aria-label` present on panel.
- `aria-current` on mobile nav links: CONFIRMED present in default.html (lines 25–39).
- `aria-current` on sidebar nav links: CONFIRMED ABSENT — not in `_includes/sidebar.html`.

**View transition CSS (`@view-transition { navigation: auto; }` — added 2026-04-06):**
- This is a progressive-enhancement feature; browsers that don't support it ignore it. No direct WCAG failure.
- Risk: `prefers-reduced-motion` is NOT honoured in the current implementation. The cross-fade/transition will play for users who have system-level reduced-motion preference enabled, violating WCAG 2.3.3 (Animation from Interactions, Level AAA) and creating a Warning-level issue under WCAG 2.1 AA best practice. Recommend wrapping in `@media (prefers-reduced-motion: no-preference)`.
- `body.sidebar-ready` transitions (sidebar width, main-wrap margin) are inside `@media (min-width: 768px)` but not inside `@media (prefers-reduced-motion: no-preference)` — same risk.

**`body.sidebar-ready` transition guards:**
- Transitions on `#desktop-sidebar` and `#main-wrap` are gated by `body.sidebar-ready` (JS adds this class), preventing animation on page load. This is a good pattern — no a11y concern from the gating mechanism itself.

**`.page-fade-in` animation (added 2026-04-12):**
- Applied to `<main id="main-content">` in `_layouts/default.html` line 74.
- `@keyframes fadeInUp` starts at `opacity: 0; transform: translateY(10px)`. The `animation` shorthand uses `fill-mode: both`, meaning the element is invisible (`opacity: 0`) until the animation begins.
- `@media (prefers-reduced-motion: reduce)` block (line 1314–1319) sets `animation-duration: 0.01ms !important` on all elements. This collapses the animation to near-instantaneous. The `both` fill-mode means the `from` state (`opacity: 0`) technically applies for those 0.01ms — could flash invisible on slow devices.
- More robust pattern: explicitly set `animation: none` (not just a short duration) inside the reduced-motion block. Currently a Warning.

**Active nav border indicator (added 2026-04-12):**
- `border-left: 2px solid #7A95A8` on `.sidebar-nav-link.active` (dark sidebar bg #1C1D21) and `.mobile-nav-link.active` (also #1C1D21 offcanvas bg).
- This border is a UI component indicator. WCAG 1.4.11 requires 3:1 contrast against adjacent colours.
- #7A95A8 on #1C1D21 = ~5.40:1. PASSES 3:1. No action needed.
- The `padding-left: calc(1rem - 2px)` compensates for the border width — good pattern, no layout shift.

**Footer layout change (2026-04-12):**
- `footer-disclaimer` moved inside `footer-inner` div. On desktop (≥640px), `footer-inner` is now `flex-direction: row; justify-content: space-between`. Disclaimer sits to the right of social links.
- `footer-disclaimer` has `text-align: left` (desktop), `text-align: center` (mobile, max-width: 639px).
- Text colour #5B6070 on white #FFFFFF = ~6.13:1. PASSES 4.5:1 normal text.
- `<footer role="contentinfo">` — `role="contentinfo"` is redundant on a `<footer>` that is a direct child of `<body>`. Not a failure, but unnecessary ARIA.
- No `aria-label` on the footer — acceptable because `role="contentinfo"` (or the implicit landmark from `<footer>`) identifies it sufficiently when there is only one such landmark.

**Why:** Baseline for all future audits of this repo.
**How to apply:** Reference these resolved ratios and known issues immediately. Do not re-verify passing ratios. Flag sidebar collapse accessible name, sidebar toggle aria-label, and page-fade-in reduced-motion fill-mode as persistent open issues until fixed.

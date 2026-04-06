---
name: Placeholder content in index.html and portfolio.html
description: Known placeholder employer names and stub hrefs that must be replaced before production deployment
type: project
---

The site contains real-name employer content mixed with placeholder content. The following must be replaced before any production deployment:

**index.html — Experience section**
- Line 144: "Placeholder Financial Tech Co." (h3 heading and aria-labels on lines 151, 169)
- Line 193: "Placeholder Software Studio" (h3 heading and aria-label on line 200)
- Line 252: "University of Placeholder" (education section)

**portfolio.html (rendered as /work/) — Work cards**
- Line 57: "Placeholder Conference 2025" in a talk description

**search.html**
- Line 66: "Placeholder Conference 2025" mirrored in search index data

**portfolio.html and search.html — href="#" stubs**
- portfolio.html lines 26, 64, 82: three work cards with `href="#"` on their action buttons (no real URL assigned)
- search.html lines 45, 62, 68: three portfolio search entries with `"url": "#"` (clicking a search result navigates to `#`)

**Why:** These were scaffold placeholders from the initial site build — previous employer names and links for work items that haven't been published yet.

**How to apply:** Flag these as blockers on every deployment check. Do not treat `href="#"` in portfolio cards as acceptable for production. The placeholder employer names are visible to site visitors and will appear in search results.

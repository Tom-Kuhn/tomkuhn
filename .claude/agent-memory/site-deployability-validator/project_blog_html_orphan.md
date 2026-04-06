---
name: blog.html is an orphaned page not linked from navigation
description: blog.html exists in the repo root but has no nav link and does not appear in _site/ output — likely a leftover draft
type: project
---

`blog.html` exists in the project root but does not appear in `_site/` build output (confirmed via Glob). The site navigation uses `/writing/` (from `portfolio.html` at permalink `/writing/`). `blog.html` is not referenced by any nav link. It appears to be an orphaned draft or renamed page.

**Why:** Likely a leftover from before the page was renamed/consolidated into the Writing section.

**How to apply:** Flag on every deployment check. Either delete `blog.html` or confirm it is intentionally excluded. If it has a `published: false` front matter or is excluded via `_config.yml` exclude list, that should be verified.

---
name: /work/ permalink generates _site/Work/ (uppercase W) on Windows
description: Case sensitivity bug — portfolio.html permalink /work/ produces _site/Work/ on Windows, breaking on Linux servers
type: project
---

`portfolio.html` has `permalink: /work/` but Jekyll on Windows generates the output directory as `_site\Work\` (capital W) because the source file is named `portfolio.html` and Windows is case-insensitive. The nav links throughout the site use `/work/` (lowercase), which works on Windows (case-insensitive FS) but will 404 on Linux-based GitHub Pages (case-sensitive FS).

**Why:** The source file is `portfolio.html` — Jekyll derives the output folder name from the permalink value, but on Windows the filesystem preserves whichever case Jekyll writes. The built artifact at `_site/Work/index.html` has a capital W, confirmed in the Glob output. GitHub Pages runs on Linux where `/work/` != `/Work/`.

**How to apply:** Check `_site/Work/` vs `_site/work/` on every deployment validation. Raise as a critical bug if present. Fix: rename `portfolio.html` to `work.html` or verify Jekyll produces lowercase on the CI runner.

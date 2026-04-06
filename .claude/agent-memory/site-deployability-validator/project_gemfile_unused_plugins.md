---
name: Gemfile contains plugins not listed in _config.yml
description: Five plugins in Gemfile jekyll_plugins group are not activated in _config.yml — bloat and potential conflict risk
type: project
---

The Gemfile `jekyll_plugins` group includes gems that are not listed in `_config.yml` plugins:

- `jekyll-assets` — not in _config.yml
- `jekyll-redirect-from` — not in _config.yml
- `jekyll-tagging` — not in _config.yml (site uses `jekyll-archives` for tag pages instead)
- `jekyll-mentions` — not in _config.yml
- `jekyll-gist` — not in _config.yml

Plugins in the `jekyll_plugins` Bundler group are auto-activated by Jekyll regardless of `_config.yml`, so these ARE running even though they are not declared in config. This is a latent risk: `jekyll-tagging` conflicts with `jekyll-archives` for tag page generation.

**Why:** Likely accumulated during initial scaffolding and never cleaned up.

**How to apply:** Flag these on every dependency audit. Recommend removing all five unused gems from the Gemfile unless there is an explicit reason to keep them. Check for `jekyll-tagging` vs `jekyll-archives` conflict specifically.

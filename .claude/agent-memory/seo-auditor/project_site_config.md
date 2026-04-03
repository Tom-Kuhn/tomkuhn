---
name: Site configuration and SEO plugin setup
description: Key SEO-relevant config facts for tomkuhn Jekyll site — plugins, url, baseurl, theme
type: project
---

Site is at https://tomkuhn.co.uk, baseurl is empty string "".

Active plugins (in _config.yml): jekyll-feed, jekyll-seo-tag, jekyll-archives, jekyll-sitemap.

Gemfile also declares: jekyll-redirect-from, jekyll-tagging, jekyll-mentions, jekyll-gist, jekyll-assets — but these are NOT listed in _config.yml plugins array, so they are not loaded by Jekyll 4.

**Why:** Jekyll 4 requires plugins to be listed in _config.yml (or a _plugins/ dir). Gemfile-only declarations do not activate them.

**How to apply:** When asked about redirects, note that jekyll-redirect-from is in Gemfile but not _config.yml — it will not function until added to the plugins array.

jekyll-sitemap is listed in _config.yml but the _site/ build directory does not contain sitemap.xml, suggesting the build was run without the gem properly installed (or _site is stale from a dev server run at localhost:4000).

jekyll-seo-tag generates: title, meta description, og:title, og:description, og:url, og:type, og:site_name, canonical, twitter:card, twitter:site, twitter:creator, JSON-LD (WebSite/WebPage/BlogPosting depending on page type). It does NOT generate og:image unless a page-level or site-level image is set.

Canonical URLs in built output are pointing to http://localhost:4000/... — this is a build-time artifact from running jekyll serve instead of jekyll build with JEKYLL_ENV=production or with url set to the live domain.

Twitter creator renders as "@Tom Kuhn" (the author.name value) instead of "@tomkuhn" — this is a known jekyll-seo-tag behaviour when twitter.username is set at site level but author.twitter is not set. The twitter:creator tag is populated from author.twitter, which falls back to author.name.

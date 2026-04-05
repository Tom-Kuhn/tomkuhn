---
name: Site configuration and SEO plugin setup
description: Key SEO-relevant config facts for tomkuhn Jekyll site — plugins, url, baseurl, theme, known issues
type: project
---

Site is at https://tomkuhn.co.uk, baseurl is empty string "".
Theme is fully custom (all layouts in `_layouts/`, all includes in `_includes/`) — no Minima dependency.

Active plugins (in _config.yml): jekyll-feed, jekyll-seo-tag, jekyll-archives, jekyll-sitemap.

jekyll-seo-tag generates: title, meta description, og:title, og:description, og:url, og:type, og:site_name, canonical, twitter:card, twitter:site, twitter:creator, JSON-LD (WebSite/WebPage/BlogPosting depending on page type). It does NOT generate og:image unless a page-level or site-level image is set.

**Known issue — og:image missing:** No `og:image` is set at site level in _config.yml or in any page/post front matter. All pages render without og:image. This means link previews on social platforms show no image.

**Known issue — twitter:creator mismatch:** `author.twitter` in _config.yml is "Tom_Kuhn" (capital T, underscore) but `twitter.username` is "tomkuhn" (lowercase, no underscore). jekyll-seo-tag renders `twitter:creator` as "@Tom_Kuhn" and `twitter:site` as "@tomkuhn". These should be the same handle. One of these two values needs correcting.

**Known issue — robots.txt incomplete:** The robots.txt in the build output contains only a Sitemap directive. There is no `User-agent: *` or `Disallow:` line, meaning it is technically malformed by convention. Googlebot will still crawl freely, but the file should follow the standard format.

**Known issue — 404.html missing title and description front matter:** The 404 page has no `title:` or `description:` in its front matter. jekyll-seo-tag falls back to the site-level title/description, so it gets "Tom Kuhn | Staff Engineer · Architect · Problem solver" and the site default description. The canonical renders as `https://tomkuhn.co.uk/404.html` (with the .html extension), which is correct for a 404 page.

**Known issue — 404.html not noindexed:** The 404 page has no `robots: "noindex, follow"` in front matter. Google may attempt to index it.

**Known issue — tag pages in sitemap:** `_layouts/tag.html` has `sitemap: false` and `robots: "noindex, follow"` in its front matter, but jekyll-sitemap does not inherit layout-level front matter. All 8 tag pages appear in sitemap.xml. Each tag page needs `sitemap: false` set in its own generated front matter (not possible without custom plugin), or the sitemap plugin needs exclusion rules.

**Known issue — homepage title too long:** The rendered title tag for index.html is "Tom Kuhn — Staff Engineer & Distributed Systems Architect | Tom Kuhn" (67 chars). The "| Tom Kuhn" suffix is appended by jekyll-seo-tag. The page-level `title:` field is the source — shortening it slightly would bring the rendered title under 70 chars cleanly.

**Sitemap state (as of 2026-04-05 build):** sitemap.xml is present and correct at _site/sitemap.xml. All 3 posts have lastmod dates. Static pages (/, /writing/, /contact/, /work/) lack lastmod. Tag pages are present despite noindex intent.

**Post front matter pattern:** All 3 posts have: layout, title, date, tags (array), description. No post has an image field. No post is missing a description.

**Posts permalink structure:** `permalink: /writing/:title/` set in _config.yml — rendered as /writing/designing-for-failure/, /writing/on-leverage/, etc.

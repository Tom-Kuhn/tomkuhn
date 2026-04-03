# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Install dependencies**: `bundle install`
- **Serve site locally**: `bundle exec jekyll serve` (with auto-rebuild)
- **Build site**: `bundle exec jekyll build`

## Project Structure

This is a Jekyll static site using the Minima theme:

- `_config.yml` - Site configuration (title, email, baseurl, plugins)
- `_posts/` - Blog posts in `YEAR-MONTH-DAY-title.markdown` format
- `index.markdown` - Home page (uses `layout: home`)
- Other `.markdown` files are pages (e.g., `about.markdown`)
- `_site/` - Generated output directory (ignored in git)

## Key Architecture

- **Theme**: Custom (no Minima dependency — all layouts in `_layouts/`, all includes in `_includes/`)
- **Plugins**: jekyll-feed, jekyll-seo-tag, jekyll-archives, jekyll-sitemap
- **Styling**: Tailwind CSS (Play CDN) + UIKit 3 + custom SCSS at `assets/css/main.scss`
- **Template language**: Liquid (in `.html` layouts and includes)
- **Content format**: Markdown with YAML front matter
- **Brand guidelines**: `BRAND_STYLE_GUIDE.md` — all frontend changes must conform to this

## Agent Hooks

This project has a suite of specialist agents in `.claude/agents/`. Follow these invocation rules precisely. Do not skip automatic hooks even for small changes.

### Automatic — invoke immediately after completing the triggering work, without being asked

| After you finish… | Invoke | Purpose |
|---|---|---|
| Any edit to a file in `_posts/` | `copy-editor` | Grammar, tone, and voice consistency before publish |
| Any edit to `_layouts/`, `_includes/`, or a root `*.html` page | `accessibility-reviewer` | Prevent WCAG regressions in modified markup |
| Any edit to `_layouts/`, `_includes/`, a root `*.html` page, or `assets/` | `brand-guardian` | Verify compliance with `BRAND_STYLE_GUIDE.md` |
| User asks about deploying, committing, or going live | `site-deployability-validator` | Catch build failures and broken links before they ship |

### On-demand — invoke proactively when the context clearly matches, without waiting to be asked

| When the user… | Invoke | Purpose |
|---|---|---|
| Makes a layout, navigation, or information architecture decision | `ux-consultant` | Evaluate from visitor perspective before building |
| Asks to build or modify a frontend component or page | `frontend-profile-dev` | Delegate all HTML/CSS/JS implementation work |
| Mentions SEO, meta tags, search rankings, or Google indexing | `seo-auditor` | Targeted SEO analysis and recommendations |
| Says a post is finished, ready to review, or ready to publish | `post-publisher` | Full pre-publish quality gate — copy, SEO, a11y, hygiene |
| Asks what to write next, wants content ideas, or is planning posts | `content-strategist` | Post ideas aligned with Principal Engineer positioning |
| Mentions slow load times, performance, or Lighthouse scores | `performance-auditor` | Frontend performance review against Core Web Vitals |

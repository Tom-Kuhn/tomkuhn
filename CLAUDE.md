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

- **Theme**: Minima (`gem "minima"`)
- **Plugins**: jekyll-feed
- **Template language**: Liquid (in `.html` layouts)
- **Content format**: Markdown with YAML front matter

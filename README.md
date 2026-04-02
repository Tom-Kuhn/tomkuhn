# tomkuhn.co.uk

Personal website for Tom Kuhn — Staff Engineer, Architect, and Problem Solver.

## Technologies

- **[Jekyll](https://jekyllrb.com/) 4.4** — static site generator
- **Ruby** — runtime (3.3 recommended)
- **Liquid** — templating language used in layouts and includes
- **Sass/SCSS** — styles compiled by Jekyll
- **jekyll-feed** — auto-generates an Atom feed at `/feed.xml`
- **GitHub Actions** — CI/CD pipeline deploying to GitHub Pages on push to `main`

## Project Structure

```
tomkuhn/
├── _config.yml          # Site configuration (title, URL, plugins)
├── _posts/              # Blog posts (YYYY-MM-DD-title.md)
├── _layouts/            # Page layout templates (default, post)
├── _includes/           # Reusable HTML partials (head, sidebar)
├── _plugins/            # Custom Jekyll plugins
├── assets/
│   ├── css/main.scss    # Main stylesheet entry point
│   └── js/main.js       # JavaScript
├── _site/               # Generated output (git-ignored)
├── index.html           # Home page
├── blog.html            # Blog listing page
├── portfolio.html       # Portfolio page
├── contact.html         # Contact page
├── search.json          # Search index
├── Gemfile              # Ruby gem dependencies
└── .github/
    └── workflows/
        └── deploy.yml   # GitHub Actions deploy pipeline
```

## Prerequisites

- Ruby (3.3 recommended)
- Bundler (`gem install bundler`)

## Getting Started

Install dependencies:

```bash
bundle install
```

Serve locally with live reload:

```bash
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`.

Build for production:

```bash
bundle exec jekyll build
```

Output is written to `_site/`.

## Deployment

Pushing to the `main` branch triggers the GitHub Actions workflow at [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which builds the site and deploys it to GitHub Pages automatically.

# Brand Style Guide

> This file is intended as a reference for AI-assisted development (e.g. Claude Code).
> When generating website code, always follow the tokens, rules, and guidelines defined here.

---

## 1. Brand identity

| Field        | Value                                                    |
|--------------|----------------------------------------------------------|
| Name         | Tom Kuhn                                                 |
| Tagline      | Staff Engineer · Architect · Problem solver              |
| Brand values | Professional, competent, leadership, calm, modern, clean |

---

## 2. Colour palette

### CSS custom properties — include these in your `:root`

```css
:root {
  /* Core neutral scale */
  --color-obsidian:  #1C1D21; /* Brand primary — nav, headings, hero sections */
  --color-slate:     #2E3039; /* Secondary dark — subheadings, dark surfaces */
  --color-storm:     #5B6070; /* Muted text — captions, meta, secondary labels */
  --color-mist:      #E2E4EA; /* Borders and dividers */
  --color-cloud:     #F5F6F8; /* Background surfaces, card fills */
  --color-white:     #FFFFFF; /* Canvas / page background */

  /* Accent — slate blue (cool, desaturated) */
  --color-accent-50:  #EBF0F4; /* Tint fills, tag backgrounds */
  --color-accent-100: #C4CED8; /* Hover states */
  --color-accent-400: #7A95A8; /* Accent mid — decorative elements */
  --color-accent-600: #4D7287; /* Primary accent — links, CTAs, buttons */
  --color-accent-800: #2C4F61; /* Pressed / dark accent states */
}
```

### Colour usage rules

- **Obsidian** (`#1C1D21`) — navigation bars, page headers, footers, hero sections, primary text on light backgrounds.
- **Slate** (`#2E3039`) — secondary dark surfaces, icon backgrounds, dark card variants.
- **Storm** (`#5B6070`) — subheadings, captions, placeholder text, meta information.
- **Mist** (`#E2E4EA`) — horizontal rules, card borders, input borders, dividers.
- **Cloud** (`#F5F6F8`) — page background, card fills, section alternates.
- **White** (`#FFFFFF`) — content canvas, modal backgrounds, form fields.
- **Accent 600** (`#4D7287`) — all interactive elements: buttons, links, focus rings, active states.
- **Accent 400** (`#7A95A8`) — decorative accents, icon strokes, subtle highlights.
- **Accent 50** (`#EBF0F4`) — badge and tag backgrounds, light tint fills.

### What to avoid

- No warm reds, oranges, or bright yellows anywhere in the palette.
- No purple accents.
- No saturated greens.
- No neon colours or gradient fills.
- Never use more than 3 colours in a single layout section.
- No heavy vignettes, lens flare effects, or HDR-style treatments.

---

## 3. Typography

### Font stack recommendations

```css
/* Display / headings — serif for authority and character */
--font-display: 'Playfair', 'Times New Roman', serif;

/* Body / paragraphs — clean system sans for readability */
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Code / mono — system monospace */
--font-mono: 'Fira Code', 'Cascadia Code', 'Source Code Pro', Menlo, monospace;
```

> If importing web fonts, prefer: Playfair Display or Cormorant Garamond for display; Inter for body; Fira Code for code snippets.

### Type scale

```css
:root {
  --text-xs:   11px;
  --text-sm:   13px;
  --text-base: 16px;
  --text-lg:   18px;
  --text-xl:   22px;
  --text-2xl:  28px;
  --text-3xl:  36px;
  --text-4xl:  48px;

  --leading-tight:  1.2;
  --leading-normal: 1.5;
  --leading-relaxed: 1.7;

  --tracking-tight:  -0.02em;
  --tracking-normal:  0;
  --tracking-wide:    0.05em;
  --tracking-widest:  0.08em;
}
```

### Typography rules

- H1: display font, `--text-3xl` or larger, `font-weight: 500`, `--leading-tight`, `--tracking-tight`.
- H2: display font, `--text-2xl`, `font-weight: 500`.
- H3–H4: body font, `--text-lg` or `--text-xl`, `font-weight: 500`.
- Body: body font, `--text-base`, `font-weight: 400`, `--leading-relaxed`.
- Captions / labels: body font, `--text-sm` or `--text-xs`, `color: var(--color-storm)`, `letter-spacing: var(--tracking-wide)`.
- Code: mono font, `--text-sm`.
- Never use `font-weight: 700` or heavier — use `500` for emphasis.
- Use sentence case for all headings and labels. Never all-caps except for small UI labels (`text-transform: uppercase` with `--tracking-widest`).

---

## 4. Logo & mark

- The primary mark is a monogram (initials) on a circular or square background.
- Background colour: `#1C1D21` (Obsidian). Text colour: `#FFFFFF`.
- Shape variant: circl
- Minimum rendered size: 32px.
- Always place on a dark background. Never stretch, rotate, or apply colour filters.
- Do not place the mark on the accent colour or any light fill.

```css
.brand-mark {
  width: 48px;
  height: 48px;
  border-radius: 50%; /* circle variant */
  background: #1C1D21;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  font-family: var(--font-display);
  letter-spacing: 0.02em;
  flex-shrink: 0;
}
```

---

## 5. Photography & imagery

### Visual mood

**Clean & minimal** — the primary direction. Sparse, considered, cool-toned. Prefer images that feel intentional and uncluttered.

Secondary direction: **Dark & editorial** for hero and feature imagery where more drama is appropriate.

### Image treatments

| Treatment       | Description                                    | When to use                     |
|-----------------|------------------------------------------------|---------------------------------|
| Dark overlay    | Obsidian (`#1C1D21`) at 60% opacity over image | Hero sections, full-bleed banners |
| Slate tint      | Accent blue (`#4D7287`) at 35% opacity         | Feature images, card covers     |
| Monochrome      | Desaturated, cool-toned greyscale              | Profile photos, editorial images |

```css
/* Dark overlay — apply to a wrapper with the image as background */
.img-overlay-dark::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(28, 29, 33, 0.60); /* Obsidian 60% */
}

/* Slate tint */
.img-overlay-tint::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(77, 114, 135, 0.35); /* Accent 600 35% */
}

/* Monochrome */
.img-mono {
  filter: grayscale(100%) contrast(1.05);
}
```

### Aspect ratios

| Ratio  | Use case                       |
|--------|-------------------------------|
| 1 : 1  | Profile photo, avatar          |
| 16 : 9 | Hero banner, video thumbnail   |
| 3 : 4  | Portrait card, project thumbnail |
| 3 : 2  | Editorial / blog post image    |

### Photography do's

- Natural, available light.
- Genuine, unposed moments.
- Cool or neutral colour casts (not warm/orange).
- Considered negative space.
- Sharp focus on subject.
- Eye-level or slightly below camera angle for a confident feel.
- Wide, open environments: studios, architecture, open outdoor spaces.
- Leave a clean edge in the frame for text overlays.
- Consistent aspect ratio per context — do not mix portrait and landscape in the same layout grid.

### Photography avoid

- Heavy warm filters or orange colour casts.
- Busy, cluttered backgrounds.
- Oversaturated or HDR edits.
- Heavy vignettes or lens flare.
- Low resolution or heavily compressed images.

### Composition notes

- Lead with the subject — place people or key objects in the upper third.
- Shoot at eye level or slightly below for a confident, grounded feel.
- Prefer wide-open environments: studios, architecture, open outdoor spaces.
- Leave room for text overlays — keep one edge of the frame clean.
- Consistent aspect ratio per context — do not mix portrait and landscape in the same layout.

---

## 6. Tone of voice

### Voice spectrum

| Axis             | Position                        |
|------------------|---------------------------------|
| Formal ↔ Casual  | Slightly formal (35/100)        |
| Serious ↔ Playful | Mostly serious (40/100)        |
| Concise ↔ Expansive | Concise (30/100)             |
| Professional ↔ Personal | Balanced-personal (55/100) |

### Writing rules

1. Write in first person — "I" not "we".
2. Keep sentences under 20 words.
3. No jargon — explain everything simply.
4. Use active voice wherever possible.
5. End calls-to-action with a verb.

---

## 7. UI components

### Spacing scale

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
}
```

### Border radius

```css
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
}
```

### Borders

```css
/* Default — all borders use 0.5px and mist colour */
border: 0.5px solid var(--color-mist);

/* Emphasis (hover, focus context) */
border: 0.5px solid var(--color-storm);

/* Featured item accent — the ONLY case where 2px is used */
border: 2px solid var(--color-accent-600);
```

### Buttons

```css
/* Primary — Obsidian fill */
.btn-primary {
  background: var(--color-obsidian);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-md);
  padding: 10px 20px;
  font-size: var(--text-sm);
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.15s;
}
.btn-primary:hover { opacity: 0.85; }

/* Outline — Obsidian border */
.btn-outline {
  background: transparent;
  color: var(--color-obsidian);
  border: 0.5px solid var(--color-obsidian);
  border-radius: var(--radius-md);
  padding: 10px 20px;
  font-size: var(--text-sm);
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-outline:hover { background: var(--color-cloud); }

/* Accent — slate blue fill */
.btn-accent {
  background: var(--color-accent-600);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-md);
  padding: 10px 20px;
  font-size: var(--text-sm);
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-accent:hover { background: var(--color-accent-800); }
```

### Cards

```css
.card {
  background: var(--color-white);
  border: 0.5px solid var(--color-mist);
  border-radius: var(--radius-lg);
  padding: var(--space-4) var(--space-5);
}

.card-surface {
  background: var(--color-cloud);
  border-radius: var(--radius-lg);
  padding: var(--space-4) var(--space-5);
}
```

### Form inputs

```css
.input {
  width: 100%;
  background: var(--color-white);
  border: 0.5px solid var(--color-mist);
  border-radius: var(--radius-md);
  padding: 8px 12px;
  font-size: var(--text-base);
  color: var(--color-obsidian);
  transition: border-color 0.15s;
}
.input::placeholder { color: var(--color-storm); }
.input:focus {
  outline: none;
  border-color: var(--color-accent-600);
  box-shadow: 0 0 0 3px rgba(77, 114, 135, 0.15);
}
```

### Badges

```css
.badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 500;
}

/* Available / positive */
.badge-available {
  background: var(--color-accent-50);
  color: var(--color-accent-800);
}

/* Dark / primary */
.badge-dark {
  background: var(--color-slate);
  color: var(--color-mist);
}

/* Neutral / draft */
.badge-neutral {
  background: var(--color-cloud);
  color: var(--color-storm);
  border: 0.5px solid var(--color-mist);
}
```

### Navigation

```css
.nav {
  background: var(--color-obsidian);
  color: var(--color-white);
  padding: var(--space-4) var(--space-8);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-link {
  color: var(--color-mist);
  font-size: var(--text-sm);
  font-weight: 400;
  text-decoration: none;
  transition: color 0.15s;
}
.nav-link:hover { color: var(--color-white); }
.nav-link.active { color: var(--color-accent-400); }
```

---

## 8. Layout principles

- Maximum content width: `1200px`, centred with auto margins.
- Default page background: `var(--color-white)`.
- Section alternates: `var(--color-cloud)` for contrast without colour.
- Generous whitespace — prefer `var(--space-16)` vertical padding on sections.
- No more than 3 colours in a single layout section.
- No gradients. No box shadows except subtle focus rings on interactive elements.
- All layouts must be responsive. Mobile-first breakpoints recommended.

---

## 9. Do's and don'ts summary

| Do | Avoid |
|----|-------|
| Use Obsidian and White as the dominant pairing | Warm or saturated accent colours |
| Keep accent usage sparse and intentional | Purple, green, or yellow accents |
| Use `font-weight: 500` for emphasis | `font-weight: 700` or heavier |
| Sentence case for all headings | Title Case or ALL CAPS headings |
| 0.5px borders throughout | Thick borders (except 2px featured accent) |
| Cool, desaturated image treatments | Warm filters or HDR photography |
| Active voice in all copy | Passive constructions |
| Generous negative space | Cluttered, dense layouts |

---

*Last updated from interactive style guide session with Claude.*

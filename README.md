# CSU Monterey Fog — Planning Document

## 1. Project Overview

| Field | Value |
|---|---|
| **Site** | CSU Monterey Fog |
| **URL** | Local development (`csumb/index.html`) |
| **Tone** | Affectionate parody — edgy jokes rooted in real CSUMB news, balanced with genuine positive spin |
| **Audience** | Current students, alumni, prospective students who get the joke |
| **Status** | Published |

## 2. Site Architecture

```
.
  index.html     — Main page
  404.html       — Custom 404 page
  apply.html     — Parody application page
  style.css      — All styles
  script.js      — Tab switching, nav toggle, smooth scroll
  .nojekyll      — GitHub Pages config
  .github/workflows/deploy.yml  — CI/CD to GitHub Pages
```

- **Single-page app** with 6 tabs: Home, Academics, Housing (LOL), Dining (8 concepts!), Fog Report, Parking @ $588/yr
- Each tab has a main content panel + matching sidebar panel (toggled via JS)
- No framework — vanilla HTML/CSS/JS
- Images hosted on Unsplash (hotlinked)
- **Typography:** DM Serif Display (headings) + Inter (body) via Google Fonts
- **Sticky nav** with gold underline active state
- **Structured footer** with 3-column grid (info, quick links, legal-ish)
- **Hero:** Full-bleed cover with gradient overlay, SVG seal/crest, gold accent, CTA button
- **Stats ribbon:** 4-column "by the numbers" section below nav
- **Texture:** Subtle noise grain overlay on body for depth

## 3. Design System

### Colors
| Name | Hex | Usage |
|---|---|---|
| Monterey Bay Blue | `#31456b` | Nav, hero text, headings, footer |
| Ocean Blue | `#6b92b6` | Shoutout accents, gradient fills |
| Valley Green | `#689466` | CTA buttons, fun-fact borders |
| Sunshine Gold | `#e0b457` | Accents, borders, highlights, blink text |
| Fog Grey | `#e8edf2` | Page background, card backgrounds |

### Typography
- **Font stack:** `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`
- **Base size:** 14px body, 11px footer/secondary
- **Headings:** h1: 2.6rem (1.6rem mobile), h2: 1.4rem, h3: 1.05rem

### Components
`.news-item`, `.testimonial`, `.fun-fact`, `.shoutout`, `.pro-con`, `.love-letter`, `.weather-widget`, `.positivity-meter`, `.card`, `.coastal-img`

## 4. Content Inventory

### Home Tab
- **News items:** Otter Statue, Service Learning, Dive Program, Seaside Grads, Race-Related Stress Guide, Charlie Kirk controversy
- **Sidebar:** Weather widget, Quick Facts, Otter Announcements, Quick Links, CTA button

### Academics Tab
- **Content:** Programs overview, Service Learning requirement
- **News:** Dive Program, 25:1 Ratio
- **Sidebar:** Top 10 Majors (parody), Campus Achievements, By the Numbers

### Housing Tab
- **News:** Freshman enrollment surge, Otter Cycle Center
- **Sidebar:** Housing Options, Housing Quick Facts

### Dining Tab
- **News (4):** 8 concepts + Ramen Bar, Meal Plan Pricing ($2,145–$2,825/semester), Dining Hours (closes at 8pm!), Weekly Specials Board ("Creamy Chicken Thing," "Beef Situation")
- **Pro-con grids (2):** 10 total items covering Ramen Bar hours, Otter Bucks pricing, Ghost Kitchen, farmers market, birria
- **Sidebar (5 cards):** 8 Concepts (with funny descriptions), Also Available, Meal Plan Tiers, Hours (Read and Weep), Final Meal lore

### Fog Report Tab
- **News:** Meteorologist consistency
- **Sidebar:** Live Fog Conditions, Fog Survival Kit

### Parking Tab
- **News:** Parking protest, $588 permit pricing
- **Sidebar:** Permit Rates, Alternatives to Driving

## 5. Remaining Tech Debt

- [ ] **Image hosting** — Unsplash hotlinks with no local fallback
- [ ] **Accessibility** — missing `aria-` attributes, some images lack meaningful alt text
- [ ] **Inline styles remain** — a few inline `style` attributes still in HTML should be moved to CSS classes

## 6. Roadmap

| Phase | Items |
|---|---|
| **Phase 1** ✅ | Core content, tab system, brand colors, Unsplash images, mobile nav, external CSS/JS, premium typography (DM Serif Display + Inter), sticky nav, structured footer, hero with SVG seal + CTA, stats ribbon, grain texture, refined brass/gold palette, fade-in animations, card hover effects |
| **Phase 2** ⏳ | Favicon, meta/OG tags, accessible markup, font polish |
| **Phase 3** | Interactive features (live weather API, visitor counter, dark mode) |
| **Phase 4** | More content (Faculty Roasts, Fort Ord History, Real vs. Parody Quiz) |
| **Phase 5** | Deploy (GitHub Pages / Netlify + custom domain) |

# 🌫️ CSU Monterey Fog

> The only university where "I can't see my future" is both a metaphor *and* a weather report.

**Live site:** [californiastateuniversitymontereybay.com](https://californiastateuniversitymontereybay.com)

An affectionate parody of California State University, Monterey Bay. News, satire, and otter-based humor from the foggiest campus in California.

---

## Features

- **6 tabs** — Home, Academics, Housing (LOL), Dining (8 concepts!), Fog Report, Parking @ $588/yr, plus a Quiz tab
- **Live weather** — Real NOAA data via Open-Meteo, translated into Fog-ese
- **Dark mode** — For when the fog gets too bright (rare)
- **Fog overlay** — Adjustable density slider with animated fog simulation
- **Interactive quiz** — "Real or Parody?" — 10 questions about CSUMB
- **Otter nose-rubbing** — Click to buff your stats (Academics, Wisdom, Parking Luck, etc.)
- **MyRaft status widget** — Always down, always accurate
- **Parody application page** — Apply to Fog Studies or Bronze Otter Nose Polishing
- **Responsive** — Works on mobile, tablet, and desktop

## Tech Stack

- Vanilla HTML / CSS / JS (no frameworks)
- [Open-Meteo API](https://open-meteo.com/) for live weather
- [Google Fonts](https://fonts.google.com/) — DM Serif Display + Inter
- [Unsplash](https://unsplash.com/) for hero/coastal imagery
- Google Analytics (G-L7WR83WQC2)
- Deployed to **GitHub Pages** with a custom domain via CNAME

## Running Locally

```bash
git clone https://github.com/your-username/MontereyFog.git
cd MontereyFog
# Serve with any static file server, e.g.:
npx serve .
# Or open index.html directly in a browser
```

No build step. No dependencies. Open `index.html` and go.

---

## Project Structure

```
.
├── index.html          — Main single-page app
├── 404.html            — Custom 404 page
├── apply.html          — Parody application page
├── style.css           — All styles (2043 lines)
├── script.js           — Tab switching, modals, quiz, weather, fog, effects
├── CNAME               — Custom domain for GitHub Pages
├── .nojekyll           — GitHub Pages config
└── .github/workflows/deploy.yml — CI/CD to GitHub Pages
```

- **Single-page app** with content panels + matching sidebar panels, toggled via JS
- **Sticky nav** with gold underline active state
- **Hero:** Full-bleed cover with gradient overlay, SVG seal/crest, gold accent, CTA button
- **Stats ribbon:** 4-column "by the numbers" section
- **Texture:** Subtle noise grain overlay on body for depth

## Design System

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| Monterey Bay Blue | `#31456b` | Nav, hero text, headings, footer |
| Ocean Blue | `#6b92b6` | Shoutout accents, gradient fills |
| Valley Green | `#689466` | CTA buttons, fun-fact borders |
| Sunshine Gold | `#e0b457` | Accents, borders, highlights |
| Fog Grey | `#e8edf2` | Page background, card backgrounds |

### Typography

- **Headings:** DM Serif Display (serif)
- **Body:** Inter (sans-serif)
- **Base:** 15px body, responsive down to 13px on mobile

### Components

`.news-item`, `.testimonial`, `.fun-fact`, `.shoutout`, `.pro-con`, `.love-letter`, `.weather-widget`, `.positivity-meter`, `.card`, `.coastal-img`, `.quiz-card`, `.modal`, `.rub-toast`, `.fog-overlay`

## Content

### Home Tab
- News items: Otter Statue, Service Learning, Dive Program, Seaside Grads, Race-Related Stress Guide, Charlie Kirk controversy
- Sidebar: Weather widget, Quick Facts, Otter Announcements, Quick Links, CTA

### Academics Tab
- Programs overview, Service Learning requirement, Dive Program, 25:1 Ratio
- Sidebar: Top 10 Majors (parody), Campus Achievements, By the Numbers

### Housing Tab
- Freshman enrollment surge, Otter Cycle Center
- Sidebar: Housing Options, Housing Quick Facts

### Dining Tab
- 8 concepts + Ramen Bar, Meal Plan Pricing ($2,145–$2,825/semester), Dining Hours (closes at 8pm!), Weekly Specials Board, Ghost Kitchen, Vendor contract satire
- Pro-con grids, real student reviews from MapQuest, The Lutrinae, and faculty
- Sidebar: 8 Concepts, Also Available, Meal Plan Tiers, Hours, Final Meal lore

### Fog Report Tab
- Meteorologist consistency, Live Fog Conditions, Fog Survival Kit

### Parking Tab
- Parking protest, $588 permit pricing, Permit Rates, Alternatives to Driving

### Quiz Tab
- 10 "Real or Parody?" questions with leaderboard (localStorage)

## Interactive Features

- **Otter Nose Rub** — Click the "Rub the Statue's Nose" link to trigger particle effects, stat buffs (10 categories), milestone badges, and a persistent rub counter
- **myFog Portal** — Parody dashboard modal with loading progress
- **Otter Cam** — "Live feed, mostly fog" modal
- **Fog Density** — Slider controls a CSS fog overlay with animated rolling cloud banks; "Fog Simulation" toggle spawns rising fog particles
- **Dark Mode** — Persisted to localStorage
- **Search** — Live client-side filtering of the active tab's content
- **Visitor Counter** — Increments on each page load via localStorage
- **Scroll to Top** — Appears after 400px of scroll

## Remaining Tech Debt

- [ ] Unsplash hotlinks with no local fallback
- [ ] Missing `aria-` attributes, some images lack meaningful alt text
- [ ] A few inline `style` attributes still in HTML should be moved to CSS classes
- [ ] Live weather API has no caching layer

## Roadmap

| Phase | Items |
|-------|-------|
| **Phase 1** ✅ | Core content, tab system, brand colors, Unsplash images, mobile nav, external CSS/JS, premium typography, sticky nav, structured footer, hero with SVG seal + CTA, stats ribbon, grain texture, gold palette, fade-in animations, card hover effects |
| **Phase 2** ⏳ | Favicon, meta/OG tags, accessible markup, font polish |
| **Phase 3** | Interactive features (live weather API, visitor counter, dark mode) — **done** |
| **Phase 4** | More content (Faculty Roasts, Fort Ord History, Real vs. Parody Quiz) — **done** |
| **Phase 5** ✅ | Deploy (GitHub Pages + custom domain) |
| **Phase 6** | Additional quiz questions, parking ticket tracker, OtterCam AI integration |

---

*CSU Monterey Fog is a parody website. The real CSUMB is at [csumb.edu](https://csumb.edu). We roast it because we love it.*

![Hits](https://hits.sh/github.com/poboato/MontereyFog.svg)

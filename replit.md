# MGEC — Makhethe Green Environment Consultancy

Static multi-page website for MGEC (Pty) Ltd, a Lesotho-based consultancy offering construction, stationery, plant hire, aggregates, cleaning, and toiletry services.

## How to run

The site is served with Python's built-in HTTP server on port 5000:

```
python3 -m http.server 5000
```

The "Start application" workflow handles this automatically.

## Structure

| File | Purpose |
|------|---------|
| `index.html` | Homepage — hero, about, services grid, stats, CTA |
| `stationery.html` | Stationery & Office Equipment service page |
| `toiletry.html` | Toiletry Products service page |
| `construction.html` | Construction Works & Supplies service page |
| `plant-hire.html` | Yellow Plant Hire & Transport service page |
| `aggregates.html` | Aggregates Supplies service page |
| `cleaning.html` | Cleaning Services service page |
| `contact.html` | Contact page with info, form, and map placeholder |
| `shared.css` | Creative shared styles (wave dividers, floating button, counters, ticker, animations) |
| `shared.js` | Shared scripts (scroll progress, typewriter, particle floats, counters, back-to-top) |

## Stack

- Plain HTML / CSS (no build step)
- Tailwind CSS via CDN
- Font Awesome 6.4 via CDN
- Google Fonts — Poppins

## Creative enhancements added

- Scroll progress bar (green, top of every page)
- Animated floating particles in hero sections
- SVG wave dividers between hero and content on all pages
- "Think Green" marquee ticker strip on homepage
- Typewriter headline cycling phrases on homepage hero
- Animated stat counters that count up when scrolled into view
- Floating phone CTA button (bottom-right, every page)
- Back-to-top button (every page)
- Green glow on card hover
- Staggered scroll-in animations

## User preferences

- Keep the existing green colour palette — do not change brand colours.

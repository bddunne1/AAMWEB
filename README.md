# Aamstrand Ropes & Twines: website redesign (draft)

A first-pass redesign of [aamstrand.com](https://aamstrand.com). It is a static
HTML/CSS/JS site with no build step and no dependencies apart from Google Fonts.

## Preview locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Pages

| Page | File | What it does |
|---|---|---|
| Home | `index.html` | Hero, trust strip, shop by construction, industries, rope finder, custom and private label, history, quote call-to-action |
| Catalog | `products.html` | Filter by category tab, material, industry and keyword search. Filters are kept in the URL (e.g. `?cat=braided&use=marine`) |
| Product detail | `product.html?id=…` | One template for every product: fiber property meters, spec table, packaging options, related products |
| About | `about.html` | Under construction until the company story is written |
| Contact / quote | `contact.html` | Structured quote form (customer type, product, size, quantity and put-up) |
| Catalogs | `catalogs.html` | PDF download hub |

The product list lives in one place, `assets/js/products.js`. Every page reads
from it, so adding a product there adds it everywhere. The header and footer are
injected by `assets/js/main.js`, so edit them once there.

## What comparable companies do (and what this draft borrows)

| Pattern | Seen at | Where it appears in the draft |
|---|---|---|
| Browse **by application/industry** as well as by product | Pelican Rope ("Rope by Application"), Yale Cordage, Samson | Home "Industries" grid and the catalog's industry filter |
| Browse **by construction** (double braid, 12-strand, kernmantle…) | Pelican Rope ("Rope by Construction"), Samson | Home category tiles and catalog tabs |
| Product pages with **spec tables** and downloadable data sheets | Samson, Yale, New England Ropes | `product.html` spec table and `catalogs.html` |
| Strong **heritage** story | New England Ropes, Samson | Hero stats, timeline (founded 1965). No made-in-USA claims: Aamstrand products are not made in the US |
| **Quote-driven** B2B calls to action instead of a cart | Most industrial rope makers | "Request a Quote" button in the header, CTA bands, structured quote form |
| Help choosing a fiber | Samson, Yale (fiber and construction guides) | Home "Rope finder" and material meters on product pages |

Aamstrand's advantage over these companies is that it cuts, colors and packages rope
to order. That's why **Custom & Private Label** has its own section and nav item.

## Design

- **Colors:** deep navy (marine and trustworthy), hemp tan (the product itself),
  signal orange for actions (industrial/safety). Tokens are at the top of `assets/css/styles.css`.
- **Type:** Barlow Condensed for headings (a stencil/industrial feel), Inter for body text.
- **Imagery:** there's no photography yet, so each product has a rope **cross-section icon**
  drawn in SVG for its construction (3-strand, solid braid, double braid, kernmantle…).
  Blocks marked "Photo" are placeholders for real shots.
- Responsive down to 360px, keyboard accessible, and respects reduced-motion settings.

## Content to verify before launch

- [ ] **Spec tables:** breaking strength and weight are `TBD`, and the listed diameters are samples.
      Fill these in from the current catalog.
- [ ] **Product descriptions** are written from general fiber properties and the current
      site's product names. Check them against how Aamstrand describes each line.
- [ ] **Industry tags** on each product (`uses` in `products.js`) are a first guess.
- [ ] **Packaging formats** list (reels, coils, hanks, mini coils, tubes, center-pull, cones/balls, shrink wrap, poly bag).
- [ ] **Sales email:** `sales@aamstrand.com` in `main.js` is a placeholder.
- [ ] Office hours and map embed (marked `[Draft: …]`).
- [ ] Write the About page (`about.html` is a placeholder for now).
- [ ] Link the real PDFs on `catalogs.html`.
- [ ] Photography: facility, product close-ups, industry scenes.
- [ ] The quote form currently opens the visitor's email client. Connect it to a form
      service or CRM before launch.

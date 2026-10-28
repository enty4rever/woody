# Build plan: product preview site (2 wooden products)

Drop this file in the project root. Give Claude Code one phase per session and say:
"Read PLAN.md and CLAUDE.md, then do Phase N only."

Reference for mood only: https://team15-orenwick.vercel.app
Do not copy its text, logo, product names or layout pixel for pixel. Take the ideas: calm palette, serif headings, clear sizes, a "will it fit" checker.

---

## 0. Decisions (fixed)

| Topic | Choice | Why |
|---|---|---|
| Framework | **Astro** (static output) | 2 products, no backend. Astro ships plain HTML with almost no JS and gives real URLs (`/products/tu-go`), not `#/` hash routes. |
| Styling | Plain CSS with design tokens in `src/styles/tokens.css` | Small site, full control, no class soup. |
| Product data | One file: `src/data/products.ts` | Every page reads from it. Change a price once, it updates everywhere. |
| Interactivity | Small vanilla `<script>` blocks inside Astro components | Only 4 things move: gallery, color swatch, unit toggle, fit checker. |
| Hosting | GitHub → Vercel (free) | Push to `main` = auto deploy. |
| Cart / checkout | **None** | Nothing is sold. A bag with no checkout is a dead end. CTA goes to "Contact / Get notified" instead. |
| 3D | None | No models. Use a photo gallery plus an open/closed photo toggle. |

---

## 1. Inputs to prepare BEFORE coding

Claude Code cannot invent these well. Prepare them first.

- [ ] Brand name, tagline (1 line), logo (SVG or PNG with transparent background)
- [ ] 2–3 brand colors (or let Claude propose one palette, then lock it)
- [ ] Site language: Vietnamese, English, or both
- [ ] Unit: cm (default) with optional inch toggle
- [ ] For EACH product (wooden cabinet, wooden shelf):
  - name, short line (1 sentence), price (proposed)
  - exterior W × D × H, weight, max load per shelf
  - wood type, finish, available colors
  - number of doors / shelves / compartments
  - setup: free-standing or wall-mounted, anti-tip kit yes/no
  - care instructions (3–4 lines)
  - 5–6 FAQ items
  - photos: 4–8 per product, one per color if possible, one "door open" shot for the cabinet
- [ ] Our Story text (150–300 words, written by you)
- [ ] Contact: email / Zalo / Facebook page

Photos: export to WebP, max 2000 px on the long side, name them `cabinet-oak-front.webp`, `shelf-walnut-detail.webp`, and so on.

---

## 2. Project structure

```
src/
  data/products.ts          # all product facts
  styles/tokens.css         # colors, fonts, spacing, radius
  styles/global.css
  layouts/Base.astro        # <head>, announcement bar, header, footer
  components/
    Header.astro  Footer.astro  AnnouncementBar.astro
    ProductCard.astro
    Gallery.astro           # thumbnails + main image + arrows
    ColorSwatch.astro       # switches gallery set
    SpecTable.astro         # cm/inch toggle
    FitChecker.astro        # user enters space, compares with product
    FeatureList.astro       # numbered "why it works"
    Faq.astro               # <details>/<summary>, no JS
    CrossSell.astro
  pages/
    index.astro
    collection.astro
    products/[slug].astro   # generated from products.ts
    our-story.astro
    fit-and-care.astro
    policies.astro
    contact.astro
    404.astro
public/images/...
```

---

## 3. Phases

### Phase 1 — Setup and design tokens
- `npm create astro@latest` (empty template, TypeScript strict)
- Google Fonts: one serif for headings, one sans for body (pick a pair, not Instrument Serif + Manrope, to avoid looking like a clone)
- `tokens.css`: background, surface, text, muted text, accent, border; spacing scale; radius
- `Base.astro` with announcement bar: "Collection preview. Not available for order yet."
- **Done when:** blank home page renders with header and footer at 375 px and 1280 px.

### Phase 2 — Product data
- Write `products.ts` with a typed `Product` interface from the inputs in section 1
- Fill in real data. No lorem ipsum.
- **Done when:** `npm run build` passes and both products load from data.

### Phase 3 — Home page
Sections in order:
1. Hero: eyebrow, headline, 2–3 line intro, primary button "Explore the collection", text link "How to measure"
2. Two product cards (image, eyebrow, name, one line, price, "View details")
3. "Choose with confidence": 3 steps (measure, check clearance, plan setup)
4. Story teaser: one quote + link
- **Done when:** looks good on mobile first, then desktop.

### Phase 4 — Product page (most work)
1. Breadcrumb
2. Gallery (thumbnails, arrows, keyboard support, swipe on mobile)
3. Info: eyebrow, name, short line, price + "proposed retail price"
4. Color swatch → switches gallery images
5. Key-facts bullets (4 lines)
6. CTA: "Get notified" → contact page (no cart)
7. Open/closed photo toggle (cabinet only)
8. "Why it works": 4–5 numbered points tied to how it is built
9. Dimensions: big W/D/H numbers + full spec table, cm ⇄ inch toggle
10. Fit checker: user types W, D, H of their space → each dimension shows "fits / too small by X cm"; include door clearance for the cabinet
11. Care (4 tiles)
12. FAQ
13. Cross-sell to the other product
- **Done when:** both product pages work and the fit checker gives correct results for 3 test cases (fits, too narrow, too shallow).

### Phase 5 — Other pages
Collection, Our Story, Fit & Care (how to measure, with a simple SVG diagram), Policies (state clearly: preview only, no orders, no payment, images may be renderings), Contact, 404.

### Phase 6 — Polish
- Responsive check at 375 / 768 / 1280 px
- Accessibility: alt text on every image, focus states, labels on fit-checker inputs, color contrast
- SEO: `<title>` and meta description per page, Open Graph image, favicon
- Lighthouse ≥ 90 on all four scores
- Small motion only: fade-in on scroll, hover on cards. Respect `prefers-reduced-motion`.

### Phase 7 — Deploy
- Push to GitHub, import into Vercel, framework preset = Astro
- Check every route on the live URL, including a page refresh on `/products/...`

---

## 4. CLAUDE.md (put in the project root)

```
- Stack: Astro static, plain CSS with tokens, vanilla JS only inside components.
- All product facts come from src/data/products.ts. Never hard-code them in pages.
- No cart, no checkout, no payment code.
- Mobile first. Test at 375 px and 1280 px before saying a phase is done.
- Do only the phase I ask for. List what you changed at the end.
- Do not invent product specs. If data is missing, leave a TODO and tell me.
```

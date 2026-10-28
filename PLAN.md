# Build plan: product preview site (2 wooden products)

Drop this file in the project root. Give Claude Code one phase per session and say:
"Read PLAN.md and CLAUDE.md, then do Phase N only."

Reference for mood only: https://team15-orenwick.vercel.app
Do not copy its text, logo, product names or layout pixel for pixel. Take the ideas: calm palette, serif headings, clear sizes, a "will it fit" checker.

---

## 0. Decisions (fixed)

| Topic | Choice | Why |
|---|---|---|
| Market | **US only** | Customers and delivery are in the United States only. Copy in US English (`lang="en"`), prices in USD (`$249.99`). |
| Framework | **Astro** (static output) | 2 products, no backend. Astro ships plain HTML with almost no JS and gives real URLs (`/products/wood-cabinet`), not `#/` hash routes. |
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
- [x] Site language: US English
- [x] Units: inch / lb shown by default, cm toggle on the product page. Data is stored in cm / kg and converted (rounded up, never understated).
- [ ] For EACH product (wooden cabinet, wooden shelf):
  - name, short line (1 sentence), price (proposed, USD with cents), all in English
  - exterior W × D × H in cm, weight and max load per shelf in kg (the site shows inches / lb)
  - wood type, finish, available colors
  - number of doors / shelves / drawers
  - setup: free-standing or wall-mounted, anti-tip kit yes/no
  - care instructions (3–4 lines)
  - 5–6 FAQ items
  - photos: 4–8 per product, one per color if possible, one "door open" shot for the cabinet
- [ ] Our Story text (150–300 words, written by you)
- [ ] Contact: email only

Photos: export to WebP, max 2000 px on the long side, name them `cabinet-oak-front.webp`, `shelf-walnut-detail.webp`, and so on.

---

## 2. Project structure

```
src/
  data/products.ts          # all product facts (cm, kg, USD)
  lib/units.ts              # cm → in (¼ in, rounded up), kg → lb
  styles/tokens.css         # colors, fonts, spacing, radius
  styles/global.css
  layouts/Base.astro        # <head>, announcement bar, header, footer
  components/
    Header.astro  Footer.astro  AnnouncementBar.astro
    ProductCard.astro
    Gallery.astro           # thumbnails + main image + arrows
    ColorSwatch.astro       # switches gallery set
    SpecTable.astro         # inch/cm toggle (inch default)
    FitChecker.astro        # user enters space, compares with product
    FeatureList.astro       # numbered "why it works"
    Faq.astro               # <details>/<summary>, no JS
    CrossSell.astro
    QuickHelp.astro         # button-only help dialog (Phase 5.5)
  pages/
    index.astro
    collection.astro
    products/[slug].astro   # generated from products.ts
    our-story.astro
    fit-and-care.astro
    policies.astro
    contact.astro
    support.astro           # assembly, anchoring, contact support (Phase 5.5)
    404.astro
public/images/...
```

---

## 3. Phases

### Phase 1 — Setup and design tokens
- `npm create astro@latest` (empty template, TypeScript strict)
- Google Fonts: one serif for headings, one sans for body (pick a pair, not Instrument Serif + Manrope, to avoid looking like a clone)
- `tokens.css`: background, surface, text, muted text, accent, border; spacing scale; radius
- `Base.astro` with announcement bar: "Collection preview · Not taking orders yet."
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

### Phase 3.5 — US market (done)
English copy, `[SAMPLE]` marker, `priceUsd` + `formatUsd`, `src/lib/units.ts` (inch/lb default), slugs `wood-cabinet` / `wood-corner-shelf` (renamed from `wood-shelf` in Phase 6.6, no redirect), footer: "Planned delivery: United States only." and "Product images are renderings."

### Phase 4 — Product page (most work)
1. Breadcrumb
2. Gallery (thumbnails, arrows, keyboard support, swipe on mobile)
3. Info: eyebrow, name, short line, price in USD + "proposed retail price"
4. Color swatch → switches gallery images
5. Key-facts bullets (4 lines)
6. CTA: "Get notified" → contact page (no cart)
7. Open/closed photo toggle (cabinet only)
8. "Why it works": 4–5 numbered points tied to how it is built
9. Dimensions: big W/D/H numbers in inches + full spec table (in / lb). **Phase 4b:** in ⇄ cm toggle
10. Fit checker: user types W, D, H of their space in inches (cm once 4b lands) → each dimension shows "fits / too small by X in"; front clearance for drawers (cabinet)
11. Care (4 tiles)
12. FAQ
13. Cross-sell to the other product
- **Done when:** both product pages work and the fit checker gives correct results for 3 test cases (fits, too narrow, too shallow).

### Phase 5 — Other pages
Collection, Our Story, Fit & Care (how to measure, with a simple SVG diagram), Policies (state clearly: preview only, no orders, no payment, planned delivery US only, product images are renderings), Contact (email only), 404.

### Phase 5.5 — Support
- `/support` (footer nav only, header keeps 4 items): Assembly (`#assembly`, one `[SAMPLE]` line, no steps or parts list yet), Anchor it to the wall (`#anchor`, cabinet only, "included" line only if `antiTipKit: true`), Contact support (`#contact-support`: shared email with subject "Assembly help", demo phone line marked "Demo number, not in service.", planned hours)
- Product page: "Assembly help" link near the spec table; cabinet also gets "How to anchor it"
- `QuickHelp.astro`: native `<dialog>` with button-only questions, answers reuse site.ts strings, "Automated quick help, not a live person." Floating button from 720px, header icon below 720px (never covers the CTA or fit results). Not on 404, hidden without JS, no storage
- No law names, no unconfirmed product traits, nothing loaded from third parties
- `check-links` also checks same-page `#id` links and requires `/support#assembly`, `#anchor`, `#contact-support` and `#fit` on each product page

### Phase 6 — Polish
- Responsive check at 375 / 768 / 1280 px
- Copy check: US English spelling, USD prices, inches first
- Accessibility: alt text on every image, focus states, labels on fit-checker inputs, color contrast
- SEO: `<title>` and meta description per page, Open Graph image, favicon
- Lighthouse ≥ 90 on all four scores
- Small motion only: fade-in on scroll, hover on cards. Respect `prefers-reduced-motion`.

### Phase 6.5 — Images (done)
Renders copied from `hinhanh/` (git-ignored, originals never edited) to `src/assets/products/` as lossless WebP with ASCII names. `Render.astro` wraps `<Picture>`: AVIF + WebP, widths 480/960/1440, never above the source. Frames 1:1 on white, `object-fit: contain`. One color per product, so the swatch hides itself.

### Phase 6.6 — Real data and copy (done)
`products.ts` and `site.ts` hold real data, no `[SAMPLE]` or `TODO`; `npm run build` passes the data guard. Shelf slug renamed to `wood-corner-shelf`. `site.seo.noindex` stays `true` until launch.

### Phase 7 — Deploy
- `engines.node` = `22.x` (Vercel picks the latest Node 22)
- Push `main` to a private GitHub repo (`woody-web`). Never commit `hinhanh/` or `dist/`
- Vercel: Add New → Project → Import the repo, framework preset = Astro, build `npm run build`, output `dist`
- Check every route on the live URL, including a page refresh on `/products/wood-cabinet` and `/products/wood-corner-shelf`
- Updating: edit `products.ts` / `site.ts`, run `npm test` and `npm run build`, push to `main` → Vercel redeploys. Full steps in README.md

---

## 4. CLAUDE.md (put in the project root)

```
- Stack: Astro static, plain CSS with tokens, vanilla JS only inside components.
- All product facts come from src/data/products.ts. Never hard-code them in pages.
- No cart, no checkout, no payment code.
- Mobile first. Test at 375 px and 1280 px before saying a phase is done.
- Do only the phase I ask for. List what you changed at the end.
- Do not invent product specs. If data is missing, leave a TODO and tell me.
- Market: US only. Copy in US English. Prices in USD. Store dimensions in cm/kg, display inches/lb by default.
- All product images are renderings. Always label them as such.
```

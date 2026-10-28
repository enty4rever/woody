# Woody — collection preview site

Static Astro site for two pieces with mother-of-pearl inlay: the Pearl Inlaid Glass Display Cabinet
and the Pearl Inlaid Wood Corner Shelf. No cart, no checkout, no payment. US market, English, USD.

See `PLAN.md` for the build plan and `CLAUDE.md` for the rules.

## Where things live

| What | File |
| :--- | :--- |
| Product facts (sizes, prices, specs, care, FAQ, image list) | `src/data/products.ts` |
| All other page copy | `src/data/site.ts` |
| Product images (renders) | `src/assets/products/*.webp` |
| Raw renders (never committed) | `hinhanh/` (git-ignored) |

Sizes are stored in cm (inches × 2.54) and kg. Pages show inches and pounds by default.

## Commands

Requires Node 22 (`engines.node` is `22.x`).

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm test` | Unit tests, preview build, internal link check |
| `npm run build` | Production build to `dist/`. Fails if `[SAMPLE]`, `TODO` or `isPlaceholder: true` is left in the data files |
| `npm run preview` | Serve `dist/` locally |

## Deploy (GitHub → Vercel)

One time:

1. Push this folder to a **private** GitHub repo (e.g. `woody-web`). `dist/`, `node_modules/` and
   `hinhanh/` are git-ignored and must stay out of the repo.
2. On [vercel.com](https://vercel.com): **Add New… → Project → Import** the repo.
3. Framework preset: **Astro** (detected). Build command `npm run build`, output directory `dist`.
   Node version comes from `package.json` (`22.x`).
4. **Deploy**. Then open every route on the live URL, and refresh a product page
   (`/products/wood-cabinet`, `/products/wood-corner-shelf`) to check it loads directly.

The site ships with `<meta name="robots" content="noindex">` (`site.seo.noindex = true`) while it is a preview.
Set it to `false` in `src/data/site.ts` at launch.

## Update the site

1. Change the data or copy (`products.ts`, `site.ts`), or add a render to `src/assets/products/`
   (WebP, ASCII file name) and list it in `products.ts` with an alt text starting `Rendering: `.
2. Run `npm test` and `npm run build`. Both must pass.
3. Commit and push to `main`. Vercel builds and deploys it automatically. Pushes to other branches
   get a preview URL.

To add a new image from `hinhanh/`, copy it; never edit the original.

// Checks every internal link in the built site (dist/). Run by "npm test" after build:preview.
// - href="/..." must point to a page or file that exists in dist/
// - href="/page#id" also needs id="id" on that page; href="#id" needs it on the same page
// - /support#assembly, #anchor, #contact-support and #fit on every product page must exist
// - no request may go to Google Fonts (the Privacy page says nothing loads from third parties)
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const banned = ['googleapis', 'gstatic'];

if (!existsSync(dist)) {
  console.error('✖ check-links: dist/ not found. Run "npm run build:preview" first.');
  process.exit(1);
}

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });

const files = walk(dist);
const pages = files.filter((f) => f.endsWith('.html'));
const isFile = (path) => existsSync(path) && statSync(path).isFile();

/** "/collection" → dist/collection/index.html (or collection.html, or the file itself). */
const resolve = (pathname) => {
  const clean = decodeURIComponent(pathname).replace(/^\/+/, '');
  const candidates = [join(dist, clean, 'index.html'), join(dist, `${clean}.html`), join(dist, clean)];
  return candidates.find(isFile) ?? null;
};

const html = new Map();
const read = (path) => {
  if (!html.has(path)) html.set(path, readFileSync(path, 'utf8'));
  return html.get(path);
};

const problems = [];
let checked = 0;

for (const page of pages) {
  const source = read(page);
  const from = relative(dist, page).split(sep).join('/');

  for (const word of banned) {
    if (source.includes(word)) problems.push(`${from}: contains "${word}"`);
  }

  for (const [, href] of source.matchAll(/\shref="([^"]*)"/g)) {
    // Same-page link (e.g. Quick help's "#fit"): the id must be on this page.
    if (href.startsWith('#') && href.length > 1) {
      checked++;
      if (!source.includes(`id="${href.slice(1)}"`)) problems.push(`${from}: ${href} → no id="${href.slice(1)}" on this page`);
      continue;
    }
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    checked++;
    const [pathAndQuery, fragment] = href.split('#');
    const pathname = pathAndQuery.split('?')[0];
    const target = resolve(pathname);
    if (!target) {
      problems.push(`${from}: ${href} → no such page`);
      continue;
    }
    if (fragment && target.endsWith('.html') && !read(target).includes(`id="${fragment}"`)) {
      problems.push(`${from}: ${href} → page exists but has no id="${fragment}"`);
    }
  }
}

for (const file of files.filter((f) => /\.(css|js)$/.test(f))) {
  const source = readFileSync(file, 'utf8');
  for (const word of banned) {
    if (source.includes(word)) problems.push(`${relative(dist, file)}: contains "${word}"`);
  }
}

if (!isFile(join(dist, '404.html'))) problems.push('dist/404.html is missing');

// Targets that must exist even if no link points to them yet.
const required = ['/support#assembly', '/support#anchor', '/support#contact-support'];
for (const page of pages.filter((p) => /^products\/[^/]+\/index\.html$/.test(relative(dist, p).split(sep).join('/')))) {
  required.push(`/${relative(dist, page).split(sep).slice(0, -1).join('/')}#fit`);
}
for (const target of required) {
  const [pathname, fragment] = target.split('#');
  const file = resolve(pathname);
  if (!file) problems.push(`required page ${pathname} is missing`);
  else if (!read(file).includes(`id="${fragment}"`)) problems.push(`required ${target} → no id="${fragment}"`);
}
if (!required.some((t) => t.startsWith('/products/'))) problems.push('no product pages found to check #fit');

if (problems.length > 0) {
  console.error(`\n✖ check-links: ${problems.length} problem(s)\n`);
  for (const msg of problems) console.error('  - ' + msg);
  process.exit(1);
}

console.log(`✔ check-links: ${checked} internal links in ${pages.length} pages, all OK. No Google Fonts requests.`);

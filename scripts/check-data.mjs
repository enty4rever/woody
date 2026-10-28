// Blocks the production build while src/data/products.ts or src/data/site.ts still holds sample data.
// Run by "npm run build". Use "npm run build:preview" to build locally without this check.
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const markers = ['[SAMPLE]', 'TODO'];
const files = ['src/data/products.ts', 'src/data/site.ts'].map((rel) => ({
  rel,
  path: fileURLToPath(new URL(`../${rel}`, import.meta.url)),
}));

const problems = [];

for (const { rel, path } of files) {
  readFileSync(path, 'utf8')
    .split(/\r?\n/)
    .forEach((line, i) => {
      for (const marker of markers) {
        if (line.includes(marker)) {
          problems.push(`${rel}:${i + 1}  has "${marker}"  →  ${line.trim()}`);
        }
      }
    });
}

const [productsFile, siteFile] = files;

const { products } = await import(pathToFileURL(productsFile.path).href);
for (const p of products) {
  if (p.isPlaceholder) {
    problems.push(`Product "${p.slug}" is still isPlaceholder: true`);
  }
}

const { site } = await import(pathToFileURL(siteFile.path).href);
if (site.isPlaceholder) {
  problems.push(`${siteFile.rel} is still isPlaceholder: true`);
}

if (problems.length > 0) {
  console.error('\n✖ Build blocked: products.ts / site.ts still hold sample data.\n');
  for (const msg of problems) console.error('  - ' + msg);
  console.error(
    `\n  ${problems.length} problem(s). Fill in real data and copy (see data-input.md), remove "[SAMPLE]"/"TODO"` +
      ' and set isPlaceholder: false.' +
      '\n  Local preview only: npm run build:preview\n',
  );
  process.exit(1);
}

console.log('✔ check-data: no sample data left.');

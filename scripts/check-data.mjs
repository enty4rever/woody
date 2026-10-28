// Blocks the production build while src/data/products.ts still holds sample data.
// Run by "npm run build". Use "npm run build:preview" to build locally without this check.
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const file = fileURLToPath(new URL('../src/data/products.ts', import.meta.url));
const rel = 'src/data/products.ts';
const markers = ['[MẪU]', 'TODO'];

const problems = [];

readFileSync(file, 'utf8')
  .split(/\r?\n/)
  .forEach((line, i) => {
    for (const marker of markers) {
      if (line.includes(marker)) {
        problems.push(`${rel}:${i + 1}  có "${marker}"  →  ${line.trim()}`);
      }
    }
  });

const { products } = await import(pathToFileURL(file).href);
for (const p of products) {
  if (p.isPlaceholder) {
    problems.push(`Sản phẩm "${p.slug}" vẫn là isPlaceholder: true`);
  }
}

if (problems.length > 0) {
  console.error('\n✖ Build bị chặn: products.ts còn dữ liệu mẫu.\n');
  for (const msg of problems) console.error('  - ' + msg);
  console.error(
    `\n  ${problems.length} vấn đề. Điền số liệu thật (xem data-input.md), bỏ "[MẪU]"/"TODO"` +
      ' và đặt isPlaceholder: false.' +
      '\n  Chỉ để xem thử local: npm run build:preview\n',
  );
  process.exit(1);
}

console.log('✔ check-data: không còn dữ liệu mẫu.');

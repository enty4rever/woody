// Run with "npm test". Node strips the TypeScript types from products.ts itself.
import { test } from 'node:test';
import { existsSync } from 'node:fs';
import assert from 'node:assert/strict';
import { products, assemblyImages } from '../src/data/products.ts';
import { site } from '../src/data/site.ts';

const allImages = () => [
  ...products.flatMap((p) => [
    ...p.colors.flatMap((c) => c.images),
    ...(p.doorImages ? [p.doorImages.closed, p.doorImages.open] : []),
  ]),
  ...Object.values(assemblyImages),
  site.home.hero.image,
];

test('every product image alt starts with "Rendering: "', () => {
  for (const image of allImages()) assert.match(image.alt, /^Rendering: /, image.file);
});

test('every image file exists in src/assets/products/', () => {
  for (const image of allImages()) {
    const path = new URL(`../src/assets/products/${image.file}.webp`, import.meta.url);
    assert.ok(existsSync(path), `missing ${image.file}.webp`);
  }
});

test('every product has 4–5 features', () => {
  for (const p of products) {
    assert.ok(p.features.length >= 4 && p.features.length <= 5, `${p.slug}: ${p.features.length}`);
  }
});

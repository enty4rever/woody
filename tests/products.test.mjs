// Run with "npm test". Node strips the TypeScript types from products.ts itself.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { products } from '../src/data/products.ts';
import { site } from '../src/data/site.ts';

test('every product image alt starts with "Rendering: "', () => {
  for (const p of products) {
    const images = [...p.colors.flatMap((c) => c.images), ...(p.openImage ? [p.openImage] : [])];
    for (const image of images) assert.match(image.alt, /^Rendering: /, `${p.slug}: ${image.src}`);
  }
  assert.match(site.home.hero.image.alt, /^Rendering: /);
});

test('every product has 4–5 features', () => {
  for (const p of products) {
    assert.ok(p.features.length >= 4 && p.features.length <= 5, `${p.slug}: ${p.features.length}`);
  }
});

// Run with "npm test". Node strips the TypeScript types from fit.ts itself.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseLength, lengthToCm, checkFit, describeFit } from '../src/lib/fit.ts';

const NBSP = ' ';
const cabinet = { dimensionsCm: { width: 80, depth: 40, height: 180 }, frontClearanceCm: 40 };

/** Space typed in inches → results by dimension. */
const check = (product, w, d, h) => {
  const toCm = (n) => lengthToCm(parseLength(String(n)), 'in');
  const results = checkFit(product, { width: toCm(w), depth: toCm(d), height: toCm(h) });
  return Object.fromEntries(results.map((r) => [r.dim, r]));
};

test('34 × 32 × 72 in: cabinet fits all 3', () => {
  const r = check(cabinet, 34, 32, 72);
  assert.ok(r.width.fits && r.depth.fits && r.height.fits);
});

test('30 in wide: width too small by 1 ½″ (31.5 − 30)', () => {
  const r = check(cabinet, 30, 32, 72);
  assert.equal(r.width.fits, false);
  assert.deepEqual(describeFit(r.width, 'in'), { kind: 'short', amount: `1${NBSP}½″` });
  assert.ok(r.depth.fits && r.height.fits);
});

test('30 in deep: depth + front clearance (80 cm = 31.5 in) too small by 1 ½″', () => {
  const r = check(cabinet, 34, 30, 72);
  assert.equal(r.depth.neededCm, 80);
  assert.equal(r.depth.fits, false);
  assert.deepEqual(describeFit(r.depth, 'in'), { kind: 'short', amount: `1${NBSP}½″` });
});

test('room to spare rounds down to ¼ in', () => {
  // 34 in − 31.496 in = 2.504 in → 2 ½″
  const r = check(cabinet, 34, 32, 72);
  assert.deepEqual(describeFit(r.width, 'in'), { kind: 'spare', amount: `2${NBSP}½″` });
});

test('spare below one step says "less than"; exactly 0 says exact', () => {
  const shelf = { dimensionsCm: { width: 80, depth: 30, height: 160 } };
  const [w, d] = checkFit(shelf, { width: 80.3, depth: 30, height: 200 });
  assert.deepEqual(describeFit(w, 'in'), { kind: 'lessThan', amount: '¼″' });
  assert.deepEqual(describeFit(w, 'cm'), { kind: 'lessThan', amount: `1${NBSP}cm` });
  assert.deepEqual(describeFit(d, 'in'), { kind: 'exact' });
  assert.deepEqual(describeFit(d, 'cm'), { kind: 'exact' });
});

test('cm results: short rounds up, spare rounds down to whole cm', () => {
  const [w, , h] = checkFit(cabinet, { width: 76.2, depth: 100, height: 182.9 });
  assert.deepEqual(describeFit(w, 'cm'), { kind: 'short', amount: `4${NBSP}cm` });
  assert.deepEqual(describeFit(h, 'cm'), { kind: 'spare', amount: `2${NBSP}cm` });
});

test('parse "23 1/2" = "23½" = "23.5"', () => {
  for (const text of ['23 1/2', '23½', '23 ½', '23-1/2', '23.5', ' 23.5 ']) {
    assert.deepEqual(parseLength(text), { value: 23.5, unit: undefined }, text);
  }
  assert.equal(parseLength('60').value, 60);
  assert.equal(parseLength('1/2').value, 0.5);
});

test('parse accepts a trailing unit', () => {
  for (const text of ['23.5"', '23.5″', '23.5 in', '23.5in', '23 1/2 inches']) {
    assert.deepEqual(parseLength(text), { value: 23.5, unit: 'in' }, text);
  }
  assert.deepEqual(parseLength('60 cm'), { value: 60, unit: 'cm' });
  assert.deepEqual(parseLength('60cm'), { value: 60, unit: 'cm' });
  // A typed unit wins over the page unit
  assert.equal(lengthToCm(parseLength('60 cm'), 'in'), 60);
  assert.equal(lengthToCm(parseLength('10 in'), 'cm'), 25.4);
});

test('parse rejects empty, invalid and non-positive input', () => {
  for (const text of ['', '   ', 'abc', '-3', '0', '23 3/2', '1/0', '23..5', 'cm', '12 ft']) {
    assert.equal(parseLength(text), null, JSON.stringify(text));
  }
});

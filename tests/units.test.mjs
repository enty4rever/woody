// Run with "npm test". Node strips the TypeScript types from units.ts itself.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatInches, formatPounds, formatDimensions, formatDimensionsCm } from '../src/lib/units.ts';

const NBSP = ' ';

test('cm → inches rounds up to the next ¼ in', () => {
  assert.equal(formatInches(80), `31${NBSP}½${NBSP}in`);
  assert.equal(formatInches(40), `15${NBSP}¾${NBSP}in`);
  assert.equal(formatInches(180), `71${NBSP}in`);
  assert.equal(formatInches(30), `12${NBSP}in`);
});

test('exact inches are not bumped up', () => {
  assert.equal(formatInches(2.54), `1${NBSP}in`);
  assert.equal(formatInches(63.5), `25${NBSP}in`);
});

test('kg → lb rounds up to a whole pound', () => {
  assert.equal(formatPounds(45), `100${NBSP}lb`);
  assert.equal(formatPounds(18), `40${NBSP}lb`);
});

test('dimensions use W/D/H listing style', () => {
  assert.equal(
    formatDimensions({ width: 80, depth: 40, height: 180 }),
    `31${NBSP}½″W × 15${NBSP}¾″D × 71″H`,
  );
  assert.equal(
    formatDimensions({ width: 80, depth: 30, height: 160 }),
    `31${NBSP}½″W × 12″D × 63″H`,
  );
});

test('cm dimensions use stored values', () => {
  assert.equal(
    formatDimensionsCm({ width: 80, depth: 40, height: 180 }),
    `80${NBSP}cm${NBSP}W × 40${NBSP}cm${NBSP}D × 180${NBSP}cm${NBSP}H`,
  );
});

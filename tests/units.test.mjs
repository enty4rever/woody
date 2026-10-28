// Run with "npm test". Node strips the TypeScript types from units.ts itself.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatInches, formatInchesTenth, formatCm, formatPounds, formatDimensions, formatDimensionsCm } from '../src/lib/units.ts';

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

test('inch-based lengths (in × 2.54) show whole inches and cm to 0.1', () => {
  assert.equal(formatInches(32 * 2.54), `32${NBSP}in`);
  assert.equal(formatInches(14 * 2.54), `14${NBSP}in`);
  assert.equal(formatInches(54 * 2.54), `54${NBSP}in`);
  assert.equal(formatCm(32 * 2.54), `81.3${NBSP}cm`);
  assert.equal(formatCm(15 * 2.54), `38.1${NBSP}cm`);
  assert.equal(formatCm(80), `80${NBSP}cm`);
});

test('tenth-inch sizes keep their decimal', () => {
  assert.equal(formatInchesTenth(21.2 * 2.54), `21.2${NBSP}in`);
  assert.equal(formatInchesTenth(14.3 * 2.54), `14.3${NBSP}in`);
});

test('38.5 kg and 9 kg show as 85 lb and 20 lb', () => {
  assert.equal(formatPounds(38.5), `85${NBSP}lb`);
  assert.equal(formatPounds(9), `20${NBSP}lb`);
});

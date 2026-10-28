// Fit checker logic, kept free of the DOM so tests can run it with node:test.
// The visitor types the width, depth and height of their space; we compare in cm.
import { CM_PER_INCH, cmToInDown, formatCm, formatInchMark, quarterNumber } from './units.ts';

export type Unit = 'in' | 'cm';
export type Dimension = 'width' | 'depth' | 'height';

export interface ParsedLength {
  value: number;
  /** Set when the visitor typed a unit ("23.5 in", "60 cm"); otherwise the page unit applies. */
  unit?: Unit;
}

export interface FitResult {
  dim: Dimension;
  /** Product size in cm, plus front clearance for depth. */
  neededCm: number;
  spaceCm: number;
  fits: boolean;
  /** Always ≥ 0: room to spare when it fits, shortfall when it does not. */
  diffCm: number;
}

/** Float noise allowed when comparing cm values (e.g. 31.5 in × 2.54). */
const EPSILON = 1e-6;

const VULGAR: Record<string, number> = {
  '¼': 1 / 4, '½': 1 / 2, '¾': 3 / 4,
  '⅛': 1 / 8, '⅜': 3 / 8, '⅝': 5 / 8, '⅞': 7 / 8,
  '⅓': 1 / 3, '⅔': 2 / 3,
};
const VULGAR_CHARS = Object.keys(VULGAR).join('');

const UNIT_SUFFIX = /\s*(cm|in(?:ch(?:es)?)?\.?|["″”])$/i;
const DECIMAL = /^(?:\d+(?:\.\d*)?|\.\d+)$/;
const MIXED = /^(\d+)(?:\s+|\s*-\s*)(\d+)\s*\/\s*(\d+)$/;
const FRACTION = /^(\d+)\s*\/\s*(\d+)$/;
const WITH_VULGAR = new RegExp(`^(\\d+)?\\s*-?\\s*([${VULGAR_CHARS}])$`);

const fraction = (n: string, d: string): number | null => {
  const num = Number(n);
  const den = Number(d);
  return den > 0 && num < den ? num / den : null;
};

/** The number part only: "23.5", "23 1/2", "23-1/2", "23½", "1/2". */
const parseNumber = (text: string): number | null => {
  if (DECIMAL.test(text)) return Number(text);

  let m = text.match(MIXED);
  if (m) {
    const f = fraction(m[2], m[3]);
    return f === null ? null : Number(m[1]) + f;
  }

  m = text.match(FRACTION);
  if (m) return fraction(m[1], m[2]);

  m = text.match(WITH_VULGAR);
  if (m) return Number(m[1] ?? 0) + VULGAR[m[2]];

  return null;
};

/**
 * Reads what the visitor typed. Accepts "23.5", "23 1/2", "23½", "60", with an optional unit:
 * 23.5", 23.5″, 23.5 in, 60 cm. Returns null when empty, not a number, or not above 0.
 */
export const parseLength = (input: string): ParsedLength | null => {
  let text = input.trim();
  let unit: Unit | undefined;

  const suffix = text.match(UNIT_SUFFIX);
  if (suffix) {
    unit = suffix[1].toLowerCase() === 'cm' ? 'cm' : 'in';
    text = text.slice(0, suffix.index).trim();
  }

  const value = parseNumber(text);
  return value !== null && Number.isFinite(value) && value > 0 ? { value, unit } : null;
};

/** Uses the typed unit when there is one, else the page unit. */
export const lengthToCm = (length: ParsedLength, pageUnit: Unit): number =>
  (length.unit ?? pageUnit) === 'in' ? length.value * CM_PER_INCH : length.value;

/** Width ≤ space width, height ≤ space height, depth + front clearance ≤ space depth. */
export const checkFit = (
  product: { dimensionsCm: Record<Dimension, number>; frontClearanceCm?: number },
  spaceCm: Record<Dimension, number>,
): FitResult[] =>
  (['width', 'depth', 'height'] as const).map((dim) => {
    const neededCm = product.dimensionsCm[dim] + (dim === 'depth' ? (product.frontClearanceCm ?? 0) : 0);
    const diff = spaceCm[dim] - neededCm;
    const fits = diff >= -EPSILON;
    return { dim, neededCm, spaceCm: spaceCm[dim], fits, diffCm: Math.abs(diff) < EPSILON ? 0 : Math.abs(diff) };
  });

export type FitVerdict =
  | { kind: 'short'; amount: string }
  | { kind: 'spare'; amount: string }
  | { kind: 'lessThan'; amount: string }
  | { kind: 'exact' };

/**
 * Turns a result into words-ready parts. A shortfall rounds UP (¼ in or 1 cm) and room to
 * spare rounds DOWN, so we never promise more room than there is.
 */
export const describeFit = (result: FitResult, unit: Unit): FitVerdict => {
  if (!result.fits) {
    const amount = unit === 'in' ? formatInchMark(result.diffCm, 'up') : formatCm(Math.ceil(result.diffCm - EPSILON));
    return { kind: 'short', amount };
  }
  if (result.diffCm === 0) return { kind: 'exact' };

  const roundsToZero = unit === 'in' ? result.diffCm / CM_PER_INCH < 0.25 - EPSILON : result.diffCm < 1 - EPSILON;
  if (roundsToZero) return { kind: 'lessThan', amount: unit === 'in' ? '¼″' : formatCm(1) };

  const amount = unit === 'in' ? formatInchMark(result.diffCm, 'down') : formatCm(Math.floor(result.diffCm + EPSILON));
  return { kind: 'spare', amount };
};

/**
 * Rewrites a space measurement in the other unit when the visitor switches in / cm.
 * It is the visitor's space, so it rounds DOWN (never overstated): cm to 0.1, inches to ¼.
 * 59.944 cm → "59.9", 60 cm → "23 ½" (23.62 in).
 */
export const formatInputLength = (cm: number, unit: Unit): string =>
  unit === 'in' ? quarterNumber(cmToInDown(cm)) : String(Math.floor(cm * 10 + EPSILON) / 10);

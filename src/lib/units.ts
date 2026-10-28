// Product data is stored in cm and kg. US visitors see inches and pounds by default.
// Every conversion rounds UP so a size or weight is never understated.
// (A cm toggle comes in Phase 4b.)

const CM_PER_INCH = 2.54;
const LB_PER_KG = 2.20462;
/** Keeps exact values (e.g. 2.54 cm = 1 in) from being bumped up by float error. */
const EPSILON = 1e-9;
/** Non-breaking space: "31" and "½" never split across lines. */
const NBSP = ' ';
/** Double prime (″), the inch mark. */
const INCH = '″';

const FRACTIONS: Record<number, string> = { 1: '¼', 2: '½', 3: '¾' };

/** cm → inches, rounded up to the next ¼ in. */
export const cmToIn = (cm: number): number => Math.ceil((cm / CM_PER_INCH) * 4 - EPSILON) / 4;

/** kg → lb, rounded up to a whole pound. */
export const kgToLb = (kg: number): number => Math.ceil(kg * LB_PER_KG - EPSILON);

/** 80 → "31 ½" (NBSP before the fraction), 180 → "71". */
const inchNumber = (cm: number): string => {
  const quarters = Math.round(cmToIn(cm) * 4);
  const whole = Math.floor(quarters / 4);
  const fraction = FRACTIONS[quarters % 4];
  if (!fraction) return String(whole);
  return whole === 0 ? fraction : `${whole}${NBSP}${fraction}`;
};

/** 80 → "31 ½ in". */
export const formatInches = (cm: number): string => `${inchNumber(cm)}${NBSP}in`;

/** 45 → "100 lb". */
export const formatPounds = (kg: number): string => `${kgToLb(kg)}${NBSP}lb`;

/** US listing style: "31 ½″W × 15 ¾″D × 71″H". */
export const formatDimensions = (d: { width: number; depth: number; height: number }): string =>
  [
    `${inchNumber(d.width)}${INCH}W`,
    `${inchNumber(d.depth)}${INCH}D`,
    `${inchNumber(d.height)}${INCH}H`,
  ].join(' × ');

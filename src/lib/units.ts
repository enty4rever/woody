// Product data is stored in cm and kg. US visitors see inches and pounds by default,
// with a cm / kg option on the product page.
// Every displayed size or weight rounds UP so it is never understated.
// (cmToInDown is only for "to spare" amounts in the fit checker, which must not be overstated.)

export const CM_PER_INCH = 2.54;
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

/** cm → inches, rounded down to the previous ¼ in. */
export const cmToInDown = (cm: number): number => Math.floor((cm / CM_PER_INCH) * 4 + EPSILON) / 4;

/** kg → lb, rounded up to a whole pound. */
export const kgToLb = (kg: number): number => Math.ceil(kg * LB_PER_KG - EPSILON);

/** 31.5 → "31 ½" (NBSP before the fraction), 71 → "71". Expects a multiple of ¼. */
const quarterNumber = (inches: number): string => {
  const quarters = Math.round(inches * 4);
  const whole = Math.floor(quarters / 4);
  const fraction = FRACTIONS[quarters % 4];
  if (!fraction) return String(whole);
  return whole === 0 ? fraction : `${whole}${NBSP}${fraction}`;
};

/** 80 → "31 ½". */
const inchNumber = (cm: number): string => quarterNumber(cmToIn(cm));

/** 80 → "31 ½ in". */
export const formatInches = (cm: number): string => `${inchNumber(cm)}${NBSP}in`;

/** Inch mark style, rounded to ¼ in: 3.8 cm → "1 ½″" (up), 6.36 cm → "2 ½″" (down). */
export const formatInchMark = (cm: number, round: 'up' | 'down'): string =>
  `${quarterNumber(round === 'up' ? cmToIn(cm) : cmToInDown(cm))}${INCH}`;

/** 45 → "100 lb". */
export const formatPounds = (kg: number): string => `${kgToLb(kg)}${NBSP}lb`;

/** Stored value as is: 80 → "80 cm". */
export const formatCm = (cm: number): string => `${cm}${NBSP}cm`;

/** Stored value as is: 45 → "45 kg". */
export const formatKg = (kg: number): string => `${kg}${NBSP}kg`;

/** US listing style: "31 ½″W × 15 ¾″D × 71″H". */
export const formatDimensions = (d: { width: number; depth: number; height: number }): string =>
  [
    `${inchNumber(d.width)}${INCH}W`,
    `${inchNumber(d.depth)}${INCH}D`,
    `${inchNumber(d.height)}${INCH}H`,
  ].join(' × ');

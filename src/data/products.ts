// Single source of truth for product facts. Pages read only from here.
// Lengths are given in inches and stored as inches × 2.54 (cm), so pages show whole inches.
import { formatInches, formatInchesTenth, formatCm, formatPounds, formatKg } from '../lib/units.ts';

export interface ProductImage {
  /** File name in src/assets/products/, without ".webp" (resolved by src/lib/images.ts). */
  file: string;
  alt: string;
}

export interface ProductColor {
  id: string;
  name: string;
  /** Swatch color, e.g. '#8b5a3c'. */
  hex: string;
  /** Gallery images shown when this color is selected. */
  images: ProductImage[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProductFeature {
  title: string;
  text: string;
}

export interface Product {
  slug: string;
  type: 'cabinet' | 'shelf';
  name: string;
  /** One sentence. */
  shortLine: string;
  /** Proposed retail price, USD with cents. */
  priceUsd: number;
  /** Exterior size in cm: width × depth × height. A corner piece: along wall 1 × along wall 2 × height. */
  dimensionsCm: {
    width: number;
    depth: number;
    height: number;
  };
  /** Corner piece only: width across the front edge, in cm. */
  frontWidthCm?: number;
  /** Stored in kg, displayed in lb. */
  weightKg: number;
  /** Design load for each shelf or tier, in kg. */
  maxLoadPerShelfKg: number;
  woodType: string;
  finish: string;
  colors: ProductColor[];
  /** Where the mother-of-pearl inlay is and what it shows. */
  inlay: string;
  doors: number;
  /** e.g. 'sliding tempered glass'. Only when doors > 0. */
  doorStyle?: string;
  /** e.g. 'tempered glass'. Only when they differ from the main material. */
  sidePanels?: string;
  drawers: number;
  /** e.g. 'black lacquered'. Only when drawers > 0. */
  drawerFronts?: string;
  /** e.g. 'quarter-round 90° corner'. A corner piece is measured along each wall (see isCorner). */
  shape?: string;
  /** Display levels (cabinet) or tiers (shelf). */
  shelves: number;
  /** e.g. '2 fixed wood shelves plus the base, not adjustable'. */
  shelfDetail?: string;
  /** Approximate space between tiers, in cm. */
  shelfSpacingCm?: number;
  legs?: string;
  hardware?: string;
  setup: 'free-standing' | 'wall-mounted';
  antiTipKit: boolean;
  /** e.g. 'heavy-duty'. Only when antiTipKit is true. */
  antiTipKitType?: string;
  assembly: {
    method: string;
    time: string;
    people: string;
    guide: string;
  };
  warranty: string;
  /** 3–4 lines. */
  care: string[];
  /** 5–6 items. */
  faq: FaqItem[];
  /** 4–5 numbered points on the product page. */
  features: ProductFeature[];
  /** Cabinet only: closed and open views for the door toggle. */
  doorImages?: { closed: ProductImage; open: ProductImage };
  /** Cabinet only: room in cm needed in front to pull out the drawers. Added to depth in the fit checker. */
  frontClearanceCm?: number;
  /** True while the entry holds sample data. The production build refuses to run. */
  isPlaceholder: boolean;
}

/** Inches → stored cm. */
const inch = (n: number): number => n * 2.54;

/** A corner piece is measured from the corner along each wall (fit checker, Fit & Care). */
export const isCorner = (product: Pick<Product, 'shape'>): boolean => product.shape?.endsWith('corner') ?? false;

/** Same for both products. Also shown on the Policies page. */
export const warranty =
  '12 months on parts and defects. Glass or wood parts damaged in shipping are replaced right away.';
const guide = 'English picture guide in the box';

// For FAQ text, which does not follow the in / cm toggle: "20 lb (9 kg)", "12 in (30.5 cm)".
const lbKg = (kg: number): string => `${formatPounds(kg)} (${formatKg(kg)})`;
const inCm = (cm: number): string => `${formatInches(cm)} (${formatCm(cm)})`;
const inCmTenth = (cm: number): string => `${formatInchesTenth(cm)} (${formatCm(cm)})`;

const CABINET = {
  loadKg: 9,
  clearanceCm: inch(12),
};

const SHELF = {
  wallCm: inch(15),
  heightCm: inch(47),
  frontCm: inch(21.2),
  spacingCm: inch(14.3),
  loadKg: 9,
};

/** Every product image is a rendering, so every alt text starts with "Rendering: ". */
const img = (file: string, alt: string): ProductImage => ({ file, alt: `Rendering: ${alt}` });

// Text printed inside the diagram renders, word for word, so screen readers get it too.
const CABINET_DIMENSIONS_TEXT =
  'Measure your space. Cabinet dimensions. 54 in / 1372 mm. 32 in / 813 mm. 14 in / 356 mm.';
const CABINET_ASSEMBLY_TEXT =
  'Step 01: Unpack and check every part. Step 02: Follow the picture guide. No tools needed. ' +
  'Step 03: Fit the legs, shelves and glass doors. Step 04: Anchor to the wall. Check the doors slide smoothly.';
const SHELF_DIMENSIONS_TEXT =
  'Fits the corner. Shelf dimensions. 47 in / 1194 mm. 21.2 in / 539 mm. 15 in / 381 mm. 15 in / 381 mm.';
const SHELF_ASSEMBLY_TEXT =
  'Step 01: Check all parts against the list. Step 02: Follow the picture guide. No tools needed. ' +
  'Step 03: Slide the posts in, tier by tier. Step 04: Anchor to the wall. Check it stands level.';

const cabinetAngle = img('cabinet-angle', 'Cabinet, angled view with the doors closed');
const cabinetStyled = img('cabinet-styled', 'Cabinet with one door slid open, styled with glassware and ceramics');

/** Assembly renders, also shown on the Support page (#assembly). */
export const assemblyImages = {
  cabinet: img('cabinet-assembly', `Cabinet assembly steps. ${CABINET_ASSEMBLY_TEXT}`),
  shelf: img('shelf-assembly', `Corner shelf assembly steps. ${SHELF_ASSEMBLY_TEXT}`),
};

export const products: Product[] = [
  {
    slug: 'wood-cabinet',
    type: 'cabinet',
    name: 'Pearl Inlaid Glass Display Cabinet',
    shortLine:
      'A solid acacia display cabinet with sliding glass doors and two drawers inlaid with mother-of-pearl.',
    priceUsd: 449.99,
    dimensionsCm: { width: inch(32), depth: inch(14), height: inch(54) },
    weightKg: 38.5,
    maxLoadPerShelfKg: CABINET.loadKg,
    woodType: 'Solid acacia, kiln-dried to 8–12% moisture',
    finish: 'Water-based PU, walnut stain',
    colors: [
      {
        id: 'walnut',
        name: 'Walnut',
        hex: '#5a3a26',
        images: [
          img('cabinet-front', 'Cabinet, front view'),
          cabinetAngle,
          cabinetStyled,
          img('cabinet-side', 'Cabinet, side view'),
          img('cabinet-views', 'Cabinet from several angles, with a close-up of the drawer inlay'),
          img('cabinet-dimensions', `Cabinet dimensions diagram. ${CABINET_DIMENSIONS_TEXT}`),
          assemblyImages.cabinet,
        ],
      },
    ],
    inlay: 'Mother-of-pearl clouds and cranes on both drawer fronts',
    doors: 2,
    doorStyle: 'sliding tempered glass',
    sidePanels: 'tempered glass',
    drawers: 2,
    drawerFronts: 'black lacquered',
    shelves: 3,
    shelfDetail: '2 fixed wood shelves plus the base, not adjustable',
    legs: 'Mid-century tapered',
    setup: 'free-standing',
    antiTipKit: true,
    antiTipKitType: 'heavy-duty',
    assembly: {
      method: 'Tool-free, modular. Rubber-padded joints hold the glass.',
      time: 'About 30 minutes',
      people: '2 people recommended (glass)',
      guide,
    },
    warranty,
    care: [
      'Wipe the mother-of-pearl inlay with a soft, dry cloth.',
      'Do not use abrasive or ammonia cleaners on the inlay, and keep the cabinet out of direct sun.',
      'Clean the lacquered drawer fronts with a soft, damp cloth and dry them right away. Do not use solvents.',
      'Keep the cabinet away from heat sources, and use coasters on the shelves.',
    ],
    faq: [
      {
        question: 'Do I need tools to put it together?',
        answer:
          'No. Assembly is tool-free and modular, and an English picture guide comes in the box. ' +
          'It takes about 30 minutes. We recommend two people because of the glass.',
      },
      {
        question: 'Are the shelves adjustable?',
        answer: 'No. Two fixed wood shelves plus the base give you three display levels.',
      },
      {
        question: 'How much can each shelf hold?',
        answer: `The design load is ${lbKg(CABINET.loadKg)} per shelf.`,
      },
      {
        question: 'How much room do I need in front of it?',
        answer: `Leave ${inCm(CABINET.clearanceCm)} in front so the drawers can open.`,
      },
      {
        question: 'Do I need to anchor it to the wall?',
        answer:
          'The cabinet is free-standing. A heavy-duty anti-tip kit comes in the box, and we recommend using it.',
      },
      {
        question: 'What does the warranty cover?',
        answer: warranty,
      },
    ],
    features: [
      {
        title: 'Mother-of-pearl drawers',
        text: 'Two drawers with black lacquered fronts, inlaid with mother-of-pearl clouds and cranes.',
      },
      {
        title: 'Glass doors and sides',
        text: 'Two sliding doors and both side panels are tempered glass, so what you display stays in view.',
      },
      {
        title: 'Solid acacia',
        text: 'Kiln-dried to 8–12% moisture and finished with water-based PU in a walnut stain.',
      },
      {
        title: 'Tool-free assembly',
        text: 'Modular parts go together without tools. Rubber-padded joints hold the glass in place.',
      },
      {
        title: 'Steady on its legs',
        text: 'Mid-century tapered legs lift it off the floor. A heavy-duty anti-tip kit is included.',
      },
    ],
    doorImages: { closed: cabinetAngle, open: cabinetStyled },
    frontClearanceCm: CABINET.clearanceCm,
    isPlaceholder: false,
  },
  {
    slug: 'wood-corner-shelf',
    type: 'shelf',
    name: 'Pearl Inlaid Wood Corner Shelf',
    shortLine: 'A four-tier corner shelf in solid acacia, with herringbone mother-of-pearl inlay on every tier.',
    priceUsd: 129.99,
    dimensionsCm: { width: SHELF.wallCm, depth: SHELF.wallCm, height: SHELF.heightCm },
    frontWidthCm: SHELF.frontCm,
    weightKg: 9,
    maxLoadPerShelfKg: SHELF.loadKg,
    woodType: 'Solid acacia, kiln-dried',
    finish: 'Water-based PU',
    colors: [
      {
        id: 'walnut',
        name: 'Walnut',
        hex: '#5a3a26',
        images: [
          img('shelf-front', 'Corner shelf, front view'),
          img('shelf-styled', 'Corner shelf styled with books, a framed photo, a plant and ceramics'),
          img('shelf-side', 'Corner shelf, side view'),
          img('shelf-views', 'Corner shelf from several angles, with a top view and a close-up of the inlay'),
          img('shelf-dimensions', `Corner shelf dimensions diagram. ${SHELF_DIMENSIONS_TEXT}`),
          assemblyImages.shelf,
        ],
      },
    ],
    inlay: 'Herringbone mother-of-pearl on every tier',
    doors: 0,
    drawers: 0,
    shape: 'quarter-round 90° corner',
    shelves: 4,
    shelfSpacingCm: SHELF.spacingCm,
    hardware: 'Brass-tone post caps',
    setup: 'free-standing',
    antiTipKit: false,
    assembly: {
      method: 'Tool-free',
      time: '10–15 minutes',
      people: 'One person',
      guide,
    },
    warranty,
    care: [
      'Wipe the mother-of-pearl inlay with a soft, dry cloth.',
      'Do not use abrasive or ammonia cleaners.',
      'Keep the shelf out of direct sun and away from heat sources.',
      'Use coasters on the tiers.',
    ],
    faq: [
      {
        question: 'Will it fit my corner?',
        answer:
          `It is made for a 90° corner. It needs ${inCm(SHELF.wallCm)} along each wall and ` +
          `${inCm(SHELF.heightCm)} of height. The front edge is ${inCmTenth(SHELF.frontCm)} across.`,
      },
      {
        question: 'Do I need tools to put it together?',
        answer:
          'No. Assembly is tool-free and takes 10–15 minutes. One person can do it. ' +
          'An English picture guide comes in the box.',
      },
      {
        question: 'How much can each tier hold?',
        answer: `The design load is ${lbKg(SHELF.loadKg)} per tier.`,
      },
      {
        question: 'How far apart are the tiers?',
        answer: `About ${inCmTenth(SHELF.spacingCm)}.`,
      },
      {
        question: 'Does it come with an anti-tip kit?',
        answer: 'No. The corner shelf does not include an anti-tip kit.',
      },
      {
        question: 'What does the warranty cover?',
        answer: warranty,
      },
    ],
    features: [
      {
        title: 'Made for the corner',
        text: 'A quarter-round shape fits a 90° corner and puts an empty corner to use.',
      },
      {
        title: 'Herringbone inlay on every tier',
        text: 'Each of the four tiers carries a herringbone pattern in mother-of-pearl.',
      },
      {
        title: 'Solid acacia',
        text: 'Kiln-dried acacia with a water-based PU finish, topped with brass-tone post caps.',
      },
      {
        title: 'Up in minutes',
        text: 'Tool-free assembly takes 10–15 minutes, and one person can do it.',
      },
    ],
    isPlaceholder: false,
  },
];

export const getProduct = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

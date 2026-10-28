// Single source of truth for product facts. Pages read only from here.
// Field order follows PLAN.md section 1 and data-input.md.

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
  /** Exterior size, stored in cm: width × depth × height. Displayed in inches (src/lib/units.ts). */
  dimensionsCm: {
    width: number;
    depth: number;
    height: number;
  };
  /** Stored in kg, displayed in lb. */
  weightKg: number;
  maxLoadPerShelfKg: number;
  woodType: string;
  finish: string;
  colors: ProductColor[];
  doors: number;
  /** e.g. 'sliding glass'. Only when doors > 0. */
  doorStyle?: string;
  drawers: number;
  /** e.g. 'glass'. Only when they differ from the main material. */
  sidePanels?: string;
  /** e.g. 'quarter-round corner'. A corner piece is measured along each wall. */
  shape?: string;
  shelves: number;
  compartments: number;
  setup: 'free-standing' | 'wall-mounted';
  antiTipKit: boolean;
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
    name: '[SAMPLE] Wood cabinet',
    shortLine: '[SAMPLE] One short sentence about the cabinet.',
    priceUsd: 649.99,
    dimensionsCm: { width: 80, depth: 40, height: 180 },
    weightKg: 45,
    maxLoadPerShelfKg: 20,
    woodType: '[SAMPLE] wood type',
    finish: '[SAMPLE] finish',
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
    doors: 2,
    doorStyle: 'sliding glass',
    drawers: 2,
    sidePanels: 'glass',
    shelves: 4,
    compartments: 1,
    setup: 'free-standing',
    antiTipKit: true,
    care: [
      '[SAMPLE] Care instruction line 1.',
      '[SAMPLE] Care instruction line 2.',
      '[SAMPLE] Care instruction line 3.',
      '[SAMPLE] Care instruction line 4.',
    ],
    faq: [
      { question: '[SAMPLE] Question 1?', answer: '[SAMPLE] Answer 1.' },
      { question: '[SAMPLE] Question 2?', answer: '[SAMPLE] Answer 2.' },
      { question: '[SAMPLE] Question 3?', answer: '[SAMPLE] Answer 3.' },
      { question: '[SAMPLE] Question 4?', answer: '[SAMPLE] Answer 4.' },
      { question: '[SAMPLE] Question 5?', answer: '[SAMPLE] Answer 5.' },
    ],
    features: [
      { title: '[SAMPLE] Point 1 title', text: '[SAMPLE] One sentence for point 1.' },
      { title: '[SAMPLE] Point 2 title', text: '[SAMPLE] One sentence for point 2.' },
      { title: '[SAMPLE] Point 3 title', text: '[SAMPLE] One sentence for point 3.' },
      { title: '[SAMPLE] Point 4 title', text: '[SAMPLE] One sentence for point 4.' },
      { title: '[SAMPLE] Point 5 title', text: '[SAMPLE] One sentence for point 5.' },
    ],
    doorImages: { closed: cabinetAngle, open: cabinetStyled },
    frontClearanceCm: 40,
    isPlaceholder: true,
  },
  {
    slug: 'wood-shelf',
    type: 'shelf',
    name: '[SAMPLE] Wood shelf',
    shortLine: '[SAMPLE] One short sentence about the shelf.',
    priceUsd: 289.99,
    dimensionsCm: { width: 80, depth: 30, height: 160 },
    weightKg: 18,
    maxLoadPerShelfKg: 15,
    woodType: '[SAMPLE] wood type',
    finish: '[SAMPLE] finish',
    colors: [
      {
        id: 'walnut',
        name: 'Walnut',
        hex: '#5a3a26',
        images: [
          img('shelf-front', 'Corner shelf, front view'),
          img('shelf-styled', 'Corner shelf styled with books and decor'),
          img('shelf-side', 'Corner shelf, side view'),
          img('shelf-views', 'Corner shelf from several angles, with a top view and a close-up of the inlay'),
          img('shelf-dimensions', `Corner shelf dimensions diagram. ${SHELF_DIMENSIONS_TEXT}`),
          assemblyImages.shelf,
        ],
      },
    ],
    doors: 0,
    drawers: 0,
    shape: 'quarter-round corner',
    shelves: 4,
    compartments: 0,
    setup: 'free-standing',
    antiTipKit: true,
    care: [
      '[SAMPLE] Care instruction line 1.',
      '[SAMPLE] Care instruction line 2.',
      '[SAMPLE] Care instruction line 3.',
      '[SAMPLE] Care instruction line 4.',
    ],
    faq: [
      { question: '[SAMPLE] Question 1?', answer: '[SAMPLE] Answer 1.' },
      { question: '[SAMPLE] Question 2?', answer: '[SAMPLE] Answer 2.' },
      { question: '[SAMPLE] Question 3?', answer: '[SAMPLE] Answer 3.' },
      { question: '[SAMPLE] Question 4?', answer: '[SAMPLE] Answer 4.' },
      { question: '[SAMPLE] Question 5?', answer: '[SAMPLE] Answer 5.' },
    ],
    features: [
      { title: '[SAMPLE] Point 1 title', text: '[SAMPLE] One sentence for point 1.' },
      { title: '[SAMPLE] Point 2 title', text: '[SAMPLE] One sentence for point 2.' },
      { title: '[SAMPLE] Point 3 title', text: '[SAMPLE] One sentence for point 3.' },
      { title: '[SAMPLE] Point 4 title', text: '[SAMPLE] One sentence for point 4.' },
    ],
    isPlaceholder: true,
  },
];

export const getProduct = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

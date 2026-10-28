// Single source of truth for product facts. Pages read only from here.
// Field order follows PLAN.md section 1 and data-input.md.

export interface ProductImage {
  src: string;
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
  /** Cabinet only: photo with the doors open. */
  openImage?: ProductImage;
  /** Cabinet only: room in cm needed in front to pull out the drawers. Added to depth in the fit checker. */
  frontClearanceCm?: number;
  /** True while the entry holds sample data. The production build refuses to run. */
  isPlaceholder: boolean;
}

/** Every product image is a rendering, so every alt text starts with "Rendering: ". */
const img = (file: string, alt: string): ProductImage => ({
  src: `/images/placeholder/${file}.svg`,
  alt: `Rendering: ${alt}`,
});

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
        id: 'color-1',
        name: '[SAMPLE] color 1',
        hex: '#a07a55',
        images: [
          img('cabinet-color1-front', '[SAMPLE] Cabinet – color 1 – front'),
          img('cabinet-color1-detail', '[SAMPLE] Cabinet – color 1 – detail'),
        ],
      },
      {
        id: 'color-2',
        name: '[SAMPLE] color 2',
        hex: '#5c4030',
        images: [
          img('cabinet-color2-front', '[SAMPLE] Cabinet – color 2 – front'),
          img('cabinet-color2-detail', '[SAMPLE] Cabinet – color 2 – detail'),
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
    openImage: img('cabinet-open', '[SAMPLE] Cabinet – doors open'),
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
        id: 'color-1',
        name: '[SAMPLE] color 1',
        hex: '#a07a55',
        images: [
          img('shelf-color1-front', '[SAMPLE] Shelf – color 1 – front'),
          img('shelf-color1-detail', '[SAMPLE] Shelf – color 1 – detail'),
        ],
      },
      {
        id: 'color-2',
        name: '[SAMPLE] color 2',
        hex: '#5c4030',
        images: [
          img('shelf-color2-front', '[SAMPLE] Shelf – color 2 – front'),
          img('shelf-color2-detail', '[SAMPLE] Shelf – color 2 – detail'),
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

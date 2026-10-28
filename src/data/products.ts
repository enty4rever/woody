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

export interface Product {
  slug: string;
  type: 'cabinet' | 'shelf';
  name: string;
  /** One sentence. */
  shortLine: string;
  /** Proposed retail price, VNĐ. */
  priceVnd: number;
  /** Exterior size in cm: width (R) × depth (S) × height (C). */
  dimensionsCm: {
    width: number;
    depth: number;
    height: number;
  };
  weightKg: number;
  maxLoadPerShelfKg: number;
  woodType: string;
  finish: string;
  colors: ProductColor[];
  doors: number;
  shelves: number;
  compartments: number;
  setup: 'free-standing' | 'wall-mounted';
  antiTipKit: boolean;
  /** 3–4 lines. */
  care: string[];
  /** 5–6 items. */
  faq: FaqItem[];
  /** Cabinet only: photo with the doors open. */
  openImage?: ProductImage;
  /** Cabinet only: extra depth in cm needed in front to open the doors. */
  doorClearanceCm?: number;
  /** True while the entry holds sample data. The production build refuses to run. */
  isPlaceholder: boolean;
}

const img = (file: string, alt: string): ProductImage => ({
  src: `/images/placeholder/${file}.svg`,
  alt,
});

export const products: Product[] = [
  {
    slug: 'tu-go',
    type: 'cabinet',
    name: '[MẪU] Tủ gỗ',
    shortLine: '[MẪU] Một câu mô tả ngắn về tủ gỗ.',
    priceVnd: 6500000,
    dimensionsCm: { width: 80, depth: 40, height: 180 },
    weightKg: 45,
    maxLoadPerShelfKg: 20,
    woodType: '[MẪU] loại gỗ',
    finish: '[MẪU] hoàn thiện',
    colors: [
      {
        id: 'mau-1',
        name: '[MẪU] màu 1',
        hex: '#a07a55',
        images: [
          img('cabinet-color1-front', '[MẪU] Tủ – màu 1 – mặt trước'),
          img('cabinet-color1-detail', '[MẪU] Tủ – màu 1 – chi tiết'),
        ],
      },
      {
        id: 'mau-2',
        name: '[MẪU] màu 2',
        hex: '#5c4030',
        images: [
          img('cabinet-color2-front', '[MẪU] Tủ – màu 2 – mặt trước'),
          img('cabinet-color2-detail', '[MẪU] Tủ – màu 2 – chi tiết'),
        ],
      },
    ],
    doors: 2,
    shelves: 4,
    compartments: 1,
    setup: 'free-standing',
    antiTipKit: true,
    care: [
      '[MẪU] Hướng dẫn bảo quản dòng 1.',
      '[MẪU] Hướng dẫn bảo quản dòng 2.',
      '[MẪU] Hướng dẫn bảo quản dòng 3.',
      '[MẪU] Hướng dẫn bảo quản dòng 4.',
    ],
    faq: [
      { question: '[MẪU] Câu hỏi 1?', answer: '[MẪU] Trả lời 1.' },
      { question: '[MẪU] Câu hỏi 2?', answer: '[MẪU] Trả lời 2.' },
      { question: '[MẪU] Câu hỏi 3?', answer: '[MẪU] Trả lời 3.' },
      { question: '[MẪU] Câu hỏi 4?', answer: '[MẪU] Trả lời 4.' },
      { question: '[MẪU] Câu hỏi 5?', answer: '[MẪU] Trả lời 5.' },
    ],
    openImage: img('cabinet-open', '[MẪU] Tủ – mở cửa'),
    doorClearanceCm: 40,
    isPlaceholder: true,
  },
  {
    slug: 'ke-go',
    type: 'shelf',
    name: '[MẪU] Kệ gỗ',
    shortLine: '[MẪU] Một câu mô tả ngắn về kệ gỗ.',
    priceVnd: 2900000,
    dimensionsCm: { width: 80, depth: 30, height: 160 },
    weightKg: 18,
    maxLoadPerShelfKg: 15,
    woodType: '[MẪU] loại gỗ',
    finish: '[MẪU] hoàn thiện',
    colors: [
      {
        id: 'mau-1',
        name: '[MẪU] màu 1',
        hex: '#a07a55',
        images: [
          img('shelf-color1-front', '[MẪU] Kệ – màu 1 – mặt trước'),
          img('shelf-color1-detail', '[MẪU] Kệ – màu 1 – chi tiết'),
        ],
      },
      {
        id: 'mau-2',
        name: '[MẪU] màu 2',
        hex: '#5c4030',
        images: [
          img('shelf-color2-front', '[MẪU] Kệ – màu 2 – mặt trước'),
          img('shelf-color2-detail', '[MẪU] Kệ – màu 2 – chi tiết'),
        ],
      },
    ],
    doors: 0,
    shelves: 5,
    compartments: 0,
    setup: 'free-standing',
    antiTipKit: true,
    care: [
      '[MẪU] Hướng dẫn bảo quản dòng 1.',
      '[MẪU] Hướng dẫn bảo quản dòng 2.',
      '[MẪU] Hướng dẫn bảo quản dòng 3.',
      '[MẪU] Hướng dẫn bảo quản dòng 4.',
    ],
    faq: [
      { question: '[MẪU] Câu hỏi 1?', answer: '[MẪU] Trả lời 1.' },
      { question: '[MẪU] Câu hỏi 2?', answer: '[MẪU] Trả lời 2.' },
      { question: '[MẪU] Câu hỏi 3?', answer: '[MẪU] Trả lời 3.' },
      { question: '[MẪU] Câu hỏi 4?', answer: '[MẪU] Trả lời 4.' },
      { question: '[MẪU] Câu hỏi 5?', answer: '[MẪU] Trả lời 5.' },
    ],
    isPlaceholder: true,
  },
];

export const getProduct = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

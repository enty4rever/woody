// All page copy lives here. Pages read text only from this file (product facts: products.ts).
// Sample copy carries the placeholder marker (see scripts/check-data.mjs). The production build
// refuses to run while any remain.

export interface SiteLink {
  label: string;
  href: string;
}

export const site = {
  /** True while the copy below holds sample text. The production build refuses to run. */
  isPlaceholder: true,
  header: {
    menuLabel: 'Menu',
  },
  home: {
    meta: {
      title: '[MẪU] Woody | Tủ và kệ gỗ',
      description: '[MẪU] Mô tả trang',
    },
    hero: {
      eyebrow: '[MẪU] Bộ sưu tập xem trước',
      title: '[MẪU] Tiêu đề chính của trang chủ',
      intro:
        '[MẪU] Hai đến ba dòng giới thiệu thương hiệu và hai sản phẩm gỗ. Nói ngắn gọn sản phẩm là gì, làm từ gì và dành cho ai.',
      image: {
        src: '/images/placeholder/cabinet-open.svg',
        alt: '[MẪU] Tủ gỗ mở cửa',
        width: 800,
        height: 1000,
      },
      primary: { label: 'Xem bộ sưu tập', href: '/collection' } as SiteLink,
      secondary: { label: 'Cách đo không gian', href: '/fit-and-care' } as SiteLink,
    },
    products: {
      eyebrow: '[MẪU] Sản phẩm',
      title: '[MẪU] Hai món, một bộ',
    },
    /** Eyebrow on each product card, by product.type. */
    productTypeLabel: {
      cabinet: '[MẪU] Tủ',
      shelf: '[MẪU] Kệ',
    },
    productCta: 'Xem chi tiết',
    steps: {
      eyebrow: '[MẪU] Trước khi chọn',
      title: 'Chọn đúng ngay từ đầu',
      items: [
        { title: 'Đo không gian', text: '[MẪU] Mô tả ngắn cách đo rộng, sâu, cao của chỗ đặt.' },
        { title: 'Chừa chỗ mở cửa', text: '[MẪU] Mô tả ngắn khoảng trống cần để mở cửa tủ.' },
        { title: 'Lên phương án lắp', text: '[MẪU] Mô tả ngắn cách đặt đứng hoặc cố định vào tường.' },
      ],
    },
    story: {
      quote: '[MẪU] Một câu trích từ câu chuyện thương hiệu.',
      cite: '[MẪU] Người sáng lập',
      link: { label: 'Đọc câu chuyện', href: '/our-story' } as SiteLink,
    },
  },
};

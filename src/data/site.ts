// All page copy lives here. Pages read text only from this file (product facts: products.ts).
// Sample copy carries the placeholder marker (see scripts/check-data.mjs). The production build
// refuses to run while any remain.

export interface SiteLink {
  label: string;
  href: string;
}

export const site = {
  /** Brand name. The only place it is written: <title>, header, footer and copyright read it from here. */
  brand: 'Woody',
  /** True while the copy below holds sample text. The production build refuses to run. */
  isPlaceholder: true,
  /** Label on every product image (all are renderings). */
  rendering: 'Rendering',
  announcement: 'Collection preview · Not taking orders yet.',
  header: {
    menuLabel: 'Menu',
    navLabel: 'Main navigation',
  },
  footer: {
    note: 'Preview only. Nothing is for sale.',
    delivery: 'Planned delivery: United States only.',
    renderings: 'Product images are renderings.',
    navLabel: 'Footer navigation',
  },
  /** Shared by header and footer. footerOnly links are left out of the header. */
  nav: [
    { href: '/collection', label: 'Collection' },
    { href: '/our-story', label: 'Our Story' },
    { href: '/fit-and-care', label: 'Fit & Care' },
    { href: '/policies', label: 'Policies', footerOnly: true },
    { href: '/contact', label: 'Contact' },
  ] as (SiteLink & { footerOnly?: boolean })[],
  home: {
    meta: {
      title: '[SAMPLE] Wood cabinet and shelf',
      description: '[SAMPLE] Page description',
    },
    hero: {
      eyebrow: '[SAMPLE] Collection preview',
      title: '[SAMPLE] Main home page headline',
      intro:
        '[SAMPLE] Two to three lines introducing the brand and its two wood pieces. Say briefly what they are, what they are made of and who they are for.',
      image: {
        src: '/images/placeholder/cabinet-open.svg',
        alt: 'Rendering: [SAMPLE] Wood cabinet with doors open',
        width: 800,
        height: 1000,
      },
      primary: { label: 'Explore the collection', href: '/collection' } as SiteLink,
      secondary: { label: 'How to measure', href: '/fit-and-care' } as SiteLink,
    },
    products: {
      eyebrow: '[SAMPLE] Products',
      title: '[SAMPLE] Two pieces, one set',
    },
    /** Eyebrow on each product card, by product.type. */
    productTypeLabel: {
      cabinet: '[SAMPLE] Cabinet',
      shelf: '[SAMPLE] Shelf',
    },
    productCta: 'View details',
    steps: {
      eyebrow: '[SAMPLE] Before you choose',
      title: 'Choose with confidence',
      items: [
        { title: 'Measure your space', text: '[SAMPLE] Short note on measuring the width, depth and height of the spot.' },
        { title: 'Check front clearance', text: '[SAMPLE] Short note on the room needed in front to pull out the drawers.' },
        { title: 'Plan your setup', text: '[SAMPLE] Short note on free-standing or anchoring to the wall.' },
      ],
    },
    story: {
      quote: '[SAMPLE] One line quoted from the brand story.',
      cite: '[SAMPLE] Founder',
      link: { label: 'Read our story', href: '/our-story' } as SiteLink,
    },
  },
  product: {
    meta: {
      description: '[SAMPLE] Product page description',
    },
    breadcrumb: {
      label: 'Breadcrumb',
      home: { label: 'Home', href: '/' } as SiteLink,
      collection: { label: 'Collection', href: '/collection' } as SiteLink,
    },
    priceNote: 'Proposed retail price',
    cta: { label: 'Get notified when orders open', href: '/contact' } as SiteLink,
    colorLegend: 'Color',
    gallery: {
      label: 'Product images',
      prev: 'Previous image',
      next: 'Next image',
      thumb: 'Show image',
    },
    keyFacts: {
      label: 'Key facts',
      wood: 'Wood',
      weight: 'Weight',
      /** Used when there is more than one color; a single color shows "Color: <name>". */
      colors: (count: number) => `${count} colors available`,
      color: 'Color',
      setup: {
        'free-standing': 'Free-standing',
        'wall-mounted': 'Wall-mounted',
      },
      antiTip: 'Includes an anti-tip wall anchor',
    },
    doorView: {
      eyebrow: '[SAMPLE] Door view',
      title: '[SAMPLE] Section title for the closed and open views',
      label: 'Door view',
      closed: 'Closed',
      open: 'Open',
      caption: '[SAMPLE] One sentence caption for the closed and open views.',
    },
    features: {
      eyebrow: '[SAMPLE] Details',
      title: '[SAMPLE] Section title for the numbered points',
    },
    units: {
      legend: 'Units',
      in: 'in',
      cm: 'cm',
    },
    dimensions: {
      eyebrow: '[SAMPLE] Dimensions',
      title: '[SAMPLE] Section title for the size and specs',
      width: 'Width',
      depth: 'Depth',
      height: 'Height',
      note: 'Nominal design dimensions.',
      tableLabel: 'Specifications',
      rows: {
        wood: 'Wood',
        finish: 'Finish',
        colors: 'Colors',
        shape: 'Shape',
        doors: 'Doors',
        drawers: 'Drawers',
        sidePanels: 'Side panels',
        shelves: 'Shelves',
        compartments: 'Compartments',
        weight: 'Weight',
        maxLoad: 'Max load per shelf',
        setup: 'Setup',
        antiTip: 'Anti-tip kit',
        frontClearance: 'Room in front for drawers',
      },
      none: 'None',
      yes: 'Included',
      no: 'Not included',
    },
    fit: {
      eyebrow: '[SAMPLE] Will it fit?',
      title: '[SAMPLE] Section title for the fit checker',
      intro: '[SAMPLE] One sentence asking the visitor to measure the space and type the sizes.',
      labels: {
        width: 'Width',
        depth: 'Depth',
        height: 'Height',
      },
      /** Shelf with shape 'quarter-round corner': measured along each wall. */
      cornerLabels: {
        width: 'Along wall 1',
        depth: 'Along wall 2',
        height: 'Height',
      },
      cornerHint: 'Measure from the corner along each wall.',
      submit: 'Check fit',
      resultsLabel: 'Fit results',
      error: '[SAMPLE] Enter a size above 0, for example 23 1/2.',
      fits: (amount: string) => `Fits, ${amount} to spare`,
      lessThan: (amount: string) => `Fits, less than ${amount} to spare`,
      exact: 'Fits, no room to spare',
      tooSmall: (amount: string) => `Too small by ${amount}`,
      clearanceNote: (amount: string) => `[SAMPLE] Depth includes ${amount} in front to pull out the drawers.`,
      noScript: '[SAMPLE] Turn on JavaScript to use the fit checker, or compare your space with the sizes above.',
    },
    care: {
      eyebrow: '[SAMPLE] Care',
      title: '[SAMPLE] Section title for care',
    },
    faq: {
      eyebrow: '[SAMPLE] FAQ',
      title: '[SAMPLE] Section title for questions',
    },
    crossSell: {
      eyebrow: '[SAMPLE] Pairs well with',
      title: '[SAMPLE] Section title for the other product',
    },
  },
};

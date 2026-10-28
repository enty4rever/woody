// All page copy lives here. Pages read text only from this file (product facts: products.ts).
// Sample copy, if any comes back, must carry the placeholder marker (see scripts/check-data.mjs):
// the production build refuses to run while any remain.
import { warranty } from './products.ts';

export interface SiteLink {
  label: string;
  href: string;
}

export const site = {
  /** Brand name. The only place it is written: <title>, header, footer and copyright read it from here. */
  brand: 'Woody',
  /** True while the copy below holds sample text. The production build refuses to run. */
  isPlaceholder: false,
  /** Label on every product image (all are renderings). */
  rendering: 'Rendering',
  announcement: 'Collection preview · Not taking orders yet.',
  /** First link on every page, visible on keyboard focus. */
  skipLink: 'Skip to content',
  seo: {
    /** Preview site: keep search engines out. Set to false at launch. */
    noindex: true,
    ogType: 'website',
  },
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
  /** Shared by every page except Home and 404. */
  breadcrumb: {
    label: 'Breadcrumb',
    home: { label: 'Home', href: '/' } as SiteLink,
    collection: { label: 'Collection', href: '/collection' } as SiteLink,
  },
  /** Shared by header and footer. footerOnly links are left out of the header. */
  nav: [
    { href: '/collection', label: 'Collection' },
    { href: '/our-story', label: 'Our Story' },
    { href: '/fit-and-care', label: 'Fit & Care' },
    { href: '/policies', label: 'Policies', footerOnly: true },
    { href: '/contact', label: 'Contact' },
    { href: '/support', label: 'Support', footerOnly: true },
  ] as (SiteLink & { footerOnly?: boolean })[],
  home: {
    meta: {
      title: 'Pearl inlay furniture',
      description:
        'A glass display cabinet and a corner shelf in solid acacia, with mother-of-pearl inlay hand-cut and set by artisans in Huế, Vietnam.',
    },
    hero: {
      eyebrow: 'Collection preview',
      title: 'Vietnamese pearl inlay for the modern home',
      intro:
        'Woody brings mother-of-pearl inlay from Huế, Vietnam, into US homes. Artisans there cut and set the inlay by hand. The first collection has two pieces: a glass display cabinet and a corner shelf.',
      /** File name in src/assets/products/ (resolved by src/lib/images.ts). */
      image: {
        file: 'cabinet-room',
        alt: 'Rendering: Cabinet in a bright room, styled with a plant, glassware and ceramics',
      },
      primary: { label: 'Explore the collection', href: '/collection' } as SiteLink,
      secondary: { label: 'How to measure', href: '/fit-and-care' } as SiteLink,
    },
    products: {
      eyebrow: 'The collection',
      title: 'Two pieces to start',
    },
    /** Eyebrow on each product card, by product.type. */
    productTypeLabel: {
      cabinet: 'Display cabinet',
      shelf: 'Corner shelf',
    },
    productCta: 'View details',
    steps: {
      eyebrow: 'Before you choose',
      title: 'Choose with confidence',
      items: [
        { title: 'Measure your space', text: 'Measure the width, depth and height of the spot. Then check the fit on the product page.' },
        { title: 'Check front clearance', text: 'Drawers need room to open. Count that space in front when you measure the depth.' },
        { title: 'Plan your setup', text: 'Decide where the piece will stand, and whether you will anchor it to the wall.' },
      ],
    },
    story: {
      quote: 'An effortless touch of Vietnamese pearl inlay, bringing timeless elegance into your modern home.',
      cite: 'The Woody team',
      link: { label: 'Read our story', href: '/our-story' } as SiteLink,
    },
  },
  product: {
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
      /** 'heavy-duty' → "Includes a heavy-duty anti-tip kit". */
      /** Corner pieces: "15″ along each wall × 47″H". */
      cornerSize: (wall: string, height: string) => `${wall} along each wall × ${height}`,
      antiTip: (type?: string) => (type ? `Includes a ${type} anti-tip kit` : 'Includes an anti-tip kit'),
    },
    doorView: {
      eyebrow: 'Door view',
      title: 'Closed or open',
      label: 'Door view',
      closed: 'Closed',
      open: 'Open',
      caption: 'Switch between the doors closed and one door slid open.',
    },
    features: {
      eyebrow: 'Details',
      title: 'Why it works',
    },
    units: {
      legend: 'Units',
      in: 'in',
      cm: 'cm',
    },
    dimensions: {
      eyebrow: 'Dimensions',
      title: 'Size and specs',
      width: 'Width',
      depth: 'Depth',
      height: 'Height',
      note: 'Nominal design dimensions.',
      tableLabel: 'Specifications',
      rows: {
        wood: 'Wood',
        finish: 'Finish',
        colors: 'Color',
        inlay: 'Inlay',
        shape: 'Shape',
        frontWidth: 'Width across the front',
        doors: 'Doors',
        sidePanels: 'Side panels',
        drawers: 'Drawers',
        /** By product.type. */
        shelves: { cabinet: 'Display levels', shelf: 'Tiers' },
        legs: 'Legs',
        hardware: 'Hardware',
        weight: 'Weight',
        /** By product.type. */
        maxLoad: { cabinet: 'Design load per shelf', shelf: 'Design load per tier' },
        setup: 'Setup',
        antiTip: 'Anti-tip kit',
        frontClearance: 'Room in front for drawers',
        assembly: 'Assembly',
        assemblyTime: 'Assembly time',
        guide: 'Instructions',
        warranty: 'Warranty',
      },
      /** "4, about 14.3 in apart". */
      spacing: (count: string, gap: string) => `${count}, about ${gap} apart`,
      /** Drawers row: "2, black lacquered fronts". */
      fronts: 'fronts',
      none: 'None',
      yes: 'Included',
      no: 'Not included',
    },
    fit: {
      eyebrow: 'Will it fit?',
      title: 'Check your space',
      intro: 'Measure the space where it will go, then type the sizes below.',
      labels: {
        width: 'Width',
        depth: 'Depth',
        height: 'Height',
      },
      /** Corner pieces (isCorner in products.ts): measured along each wall. */
      cornerLabels: {
        width: 'Along wall 1',
        depth: 'Along wall 2',
        height: 'Height',
      },
      cornerHint: 'Measure from the corner along each wall.',
      submit: 'Check fit',
      resultsLabel: 'Fit results',
      error: 'Enter a size above 0, for example 23 1/2.',
      fits: (amount: string) => `Fits, ${amount} to spare`,
      lessThan: (amount: string) => `Fits, less than ${amount} to spare`,
      exact: 'Fits, no room to spare',
      tooSmall: (amount: string) => `Too small by ${amount}`,
      /** Shown after the results, never as a pass or fail. {comfort} = comfortCm below. */
      clearanceNote: (amount: string, comfort: string) =>
        `Leave about ${amount} in front to open the drawers (about ${comfort} to stand and use them comfortably).`,
      /** Room to stand at open drawers: general advice, not a product fact. 30 in. */
      comfortCm: 30 * 2.54,
      noScript: 'Turn on JavaScript to use the fit checker, or compare your space with the sizes above.',
    },
    care: {
      eyebrow: 'Care',
      title: 'Caring for it',
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Questions and answers',
    },
    crossSell: {
      eyebrow: 'Pairs well with',
      title: 'Also in the collection',
    },
  },
  collection: {
    meta: {
      title: 'Collection',
      description:
        'The first Woody collection: a glass display cabinet and a corner shelf, with mother-of-pearl inlay from Huế, Vietnam.',
    },
    eyebrow: 'The collection',
    title: 'The first collection',
    intro: 'Two pieces with mother-of-pearl inlay, hand-cut and set by artisans in Huế, Vietnam.',
  },
  ourStory: {
    meta: {
      title: 'Our Story',
      description: 'How Woody brings mother-of-pearl inlay from artisans in Huế, Vietnam, to homes in the United States.',
    },
    title: 'Pearl inlay from Huế',
    paragraphs: [
      'Woody started with one craft: mother-of-pearl inlay from Huế, in central Vietnam.',
      'Artisans in Huế cut the inlay by hand, one piece at a time, and set each piece by hand as well. ' +
        'The pattern you see on a Woody piece is the work of their hands.',
      'We want to bring that work into American homes. Not as something to keep behind a rope, but as furniture ' +
        'you use every day: a cabinet for the glasses and ceramics you like to see, and a shelf for a corner that sits empty.',
      'So we keep the shapes simple and modern. Clean lines and solid acacia leave room for the inlay to stand out. ' +
        'Both pieces go together without tools, with an English picture guide in the box.',
      'This site is a preview. We are not taking orders yet. If you would like to hear when we do, send us an email.',
    ],
    /** Photo (not a rendering) in src/assets/story/, imported by the page. */
    image: {
      alt: 'Hands setting small pieces of mother-of-pearl into a carved wooden tabletop.',
      caption: 'Mother-of-pearl inlay, set piece by piece by hand.',
    },
    quote: 'An effortless touch of Vietnamese pearl inlay, bringing timeless elegance into your modern home.',
    cite: 'The Woody team',
  },
  fitCare: {
    meta: {
      title: 'Fit & Care',
      description: 'How to measure for the cabinet and the corner shelf, and how to care for the inlay and the lacquered drawer fronts.',
    },
    title: 'Fit & Care',
    intro: 'Measure before you choose, and care for the piece once it is home.',
    measure: {
      eyebrow: 'Before you choose',
      title: 'How to measure',
      cabinet: {
        title: 'Measuring for the cabinet',
        /** {amount} = frontClearanceCm from products.ts. */
        text: (amount: string) =>
          `Measure the width, depth and height of the space. Sliding doors need no extra room; the drawers need about ${amount} in front.`,
        frontTitle: 'Cabinet space, front view',
        frontDesc: 'The space between two walls, with arrows for width (W) across and height (H) from floor to top.',
        sideTitle: 'Cabinet space, side view',
        sideDesc:
          'The cabinet against the back wall. The depth arrow (D) runs from the wall to the cabinet front. A dashed drawer is pulled out from the front, with an arrow above it for the drawer pull-out.',
        front: 'Front view',
        side: 'Side view',
        wall: 'Wall',
        /** Two lines above the drawn drawer: "Drawer pull-out" / "≈ 12″". */
        pullOut: 'Drawer pull-out',
        pullOutAmount: (amount: string) => `≈ ${amount}`,
      },
      corner: {
        title: 'Measuring for the corner shelf',
        text: 'Start at the corner and measure along each wall. Then measure the height.',
        svgTitle: 'How to measure a corner for the corner shelf',
        svgDesc:
          'Top view of a room corner where two walls meet. A dashed quarter circle shows where the shelf sits. Arrows start at the corner and run along wall 1 and along wall 2.',
        top: 'Top view',
        corner: 'Corner',
        wall1: 'Wall 1',
        wall2: 'Wall 2',
      },
      /** Short letters inside the drawings. */
      abbr: { width: 'W', depth: 'D', height: 'H' },
      checkFit: 'Check fit on the product page',
    },
    care: {
      eyebrow: 'Care',
      title: 'Caring for your piece',
      blocks: [
        {
          title: 'General care',
          items: ['Keep the piece away from heat sources.', 'Use coasters.'],
        },
        {
          title: 'Caring for the mother-of-pearl inlay',
          items: [
            'Wipe it with a soft, dry cloth.',
            'Do not use abrasive or ammonia cleaners.',
            'Keep it out of direct sun.',
          ],
        },
        {
          title: 'Caring for the lacquered drawer fronts',
          items: ['Wipe them with a soft, damp cloth, then dry them right away.', 'Do not use solvents.'],
        },
      ],
    },
  },
  policies: {
    meta: {
      title: 'Policies',
      description: 'How this preview site works: no orders or payment, renderings only, planned US delivery, privacy and warranty.',
    },
    title: 'Policies',
    intro: 'This page explains how the preview site works.',
    sections: [
      {
        id: 'preview',
        title: 'Collection preview',
        text: [
          'This site is a preview of the collection. We are not taking orders yet.',
          'No payment is collected on this site, and nothing can be bought here.',
        ],
      },
      {
        id: 'renderings',
        title: 'Product images are renderings',
        text: ['Every product image on this site is a rendering, not a photo. The finished pieces may look slightly different.'],
      },
      {
        id: 'delivery',
        title: 'Planned delivery: United States only',
        text: ['When orders open, we plan to deliver within the United States only.'],
      },
      {
        id: 'privacy',
        title: 'Privacy',
        text: [
          'We don’t collect personal data or use tracking cookies, and nothing loads from third parties. ' +
            'Our hosting provider keeps standard access logs. ' +
            'Your browser remembers one setting on your device: inches or centimeters.',
        ],
      },
      {
        id: 'warranty',
        title: 'Warranty',
        text: [`Both pieces carry the same warranty. ${warranty}`],
      },
    ],
    contact: {
      id: 'contact',
      title: 'Contact',
      text: 'Questions about these policies?',
      link: { label: 'Contact us', href: '/contact' } as SiteLink,
    },
  },
  contact: {
    meta: {
      title: 'Contact',
      description: 'Email Woody to hear when orders open.',
    },
    title: 'Contact',
    intro: 'Want to know when orders open? Send us an email and we will let you know.',
    email: 'woodyfur@gmail.com',
    subject: 'Notify me when orders open',
    note: 'The link opens your own mail app, with the subject filled in.',
  },
  support: {
    meta: {
      title: 'Support',
      description: 'Assembly steps for both pieces, anchoring the cabinet to the wall, and how to reach us.',
    },
    title: 'Support',
    intro: 'Help with putting your piece together and setting it up.',
    assembly: {
      id: 'assembly',
      title: 'Assembly',
      text: 'These are the main steps for each piece. The full picture guide comes in the box.',
    },
    /** Cabinet only. */
    anchor: {
      id: 'anchor',
      title: 'Anchor it to the wall',
      text: [
        'We recommend anchoring the cabinet to the wall before you load the shelves.',
        'Use the anti-tip kit to fix the cabinet to the wall, and keep children from climbing on it.',
      ],
    },
    contactSupport: {
      id: 'contact-support',
      title: 'Contact support',
      emailLabel: 'Email',
      /** Same address as the Contact page (site.contact.email). */
      subject: 'Assembly help',
      phoneLabel: 'Support line',
      phone: '+1 (202) 555-0142',
      phoneHref: 'tel:+12025550142',
      phoneNote: 'Demo number, not in service.',
      hours: 'Planned hours: Mon–Fri, 9 AM–5 PM ET',
    },
    /** Links on the product page, near the spec table. */
    productLinks: {
      assembly: { label: 'Assembly help', href: '/support#assembly' } as SiteLink,
      anchor: { label: 'How to anchor it', href: '/support#anchor' } as SiteLink,
    },
  },
  /** Button-only help dialog (QuickHelp.astro). Answers reuse strings from elsewhere in this file. */
  quickHelp: {
    open: 'Quick help',
    title: 'Quick help',
    disclaimer: 'Automated quick help, not a live person.',
    close: 'Close',
    back: 'Back to questions',
    questions: {
      fit: 'Will it fit?',
      order: 'When can I order?',
      ship: 'Do you ship to me?',
      assembly: 'Assembly help',
      care: 'How do I care for it?',
      person: 'Talk to a person',
    },
  },
  notFound: {
    meta: {
      title: 'Page not found',
      description: 'This page does not exist.',
    },
    title: 'Page not found',
    text: 'This page does not exist. It may have moved, or the link may be wrong.',
    home: { label: 'Go to Home', href: '/' } as SiteLink,
    collection: { label: 'See the collection', href: '/collection' } as SiteLink,
  },
};

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
      title: '[SAMPLE] Wood cabinet and shelf',
      description: '[SAMPLE] Page description',
    },
    hero: {
      eyebrow: '[SAMPLE] Collection preview',
      title: '[SAMPLE] Main home page headline',
      intro:
        '[SAMPLE] Two to three lines introducing the brand and its two wood pieces. Say briefly what they are, what they are made of and who they are for.',
      /** File name in src/assets/products/ (resolved by src/lib/images.ts). */
      image: {
        file: 'cabinet-room',
        alt: 'Rendering: Cabinet in a bright room, styled with a plant, glassware and ceramics',
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
  collection: {
    meta: {
      title: 'Collection',
      description: '[SAMPLE] Collection page description',
    },
    eyebrow: '[SAMPLE] The collection',
    title: '[SAMPLE] Collection page headline',
    intro: '[SAMPLE] One sentence introducing the pieces in the collection.',
  },
  ourStory: {
    meta: {
      title: 'Our Story',
      description: '[SAMPLE] Our Story page description',
    },
    title: '[SAMPLE] Our Story headline',
    // TODO: story text (150–300 words) to be written by the owner.
    paragraphs: [
      '[SAMPLE] Paragraph 1 of the brand story.',
      '[SAMPLE] Paragraph 2 of the brand story.',
      '[SAMPLE] Paragraph 3 of the brand story.',
      '[SAMPLE] Paragraph 4 of the brand story.',
    ],
    quote: '[SAMPLE] One line quoted from the brand story.',
    cite: '[SAMPLE] Founder',
  },
  fitCare: {
    meta: {
      title: 'Fit & Care',
      description: '[SAMPLE] Fit & Care page description',
    },
    title: 'Fit & Care',
    intro: '[SAMPLE] One sentence on measuring before you choose and caring for the piece after.',
    measure: {
      eyebrow: '[SAMPLE] Before you choose',
      title: 'How to measure',
      cabinet: {
        title: '[SAMPLE] Measuring for the cabinet',
        text: '[SAMPLE] Measure the width, depth and height of the space, then add room in front to pull out the drawers.',
        frontTitle: 'Cabinet space, front view',
        frontDesc: 'The space between two walls, with arrows for width (W) across and height (H) from floor to top.',
        sideTitle: 'Cabinet space, side view',
        sideDesc:
          'The cabinet against the back wall, with a dashed area in front marked front clearance: the room needed to pull out the drawers. The depth arrow (D) runs from the wall to the outer edge of that dashed area.',
        front: 'Front view',
        side: 'Side view',
        wall: 'Wall',
        clearance: 'Front clearance',
      },
      corner: {
        title: '[SAMPLE] Measuring for the corner shelf',
        text: '[SAMPLE] Start at the corner and measure along each wall, then measure the height.',
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
      eyebrow: '[SAMPLE] Care',
      title: '[SAMPLE] Caring for your piece',
      // TODO: owner will write the inlay and drawer-front care text. Do not mention lacquer (not confirmed).
      blocks: [
        {
          title: '[SAMPLE] General care',
          items: [
            '[SAMPLE] General care line 1.',
            '[SAMPLE] General care line 2.',
            '[SAMPLE] General care line 3.',
          ],
        },
        {
          title: '[SAMPLE] Caring for the mother-of-pearl inlay',
          items: ['[SAMPLE] Inlay care line 1.', '[SAMPLE] Inlay care line 2.'],
        },
        {
          title: '[SAMPLE] Caring for the drawer fronts',
          items: ['[SAMPLE] Drawer front care line 1.', '[SAMPLE] Drawer front care line 2.'],
        },
      ],
    },
  },
  policies: {
    meta: {
      title: 'Policies',
      description: '[SAMPLE] Policies page description',
    },
    title: 'Policies',
    intro: '[SAMPLE] One sentence saying this page explains how the preview site works.',
    sections: [
      {
        id: 'preview',
        title: 'Collection preview',
        text: [
          '[SAMPLE] This site is a preview of the collection. We are not taking orders yet.',
          '[SAMPLE] No payment is collected on this site, and nothing can be bought here.',
        ],
      },
      {
        id: 'renderings',
        title: 'Product images are renderings',
        text: ['[SAMPLE] Every product image on this site is a rendering, not a photo. The finished pieces may look slightly different.'],
      },
      {
        id: 'delivery',
        title: 'Planned delivery: United States only',
        text: ['[SAMPLE] When orders open, we plan to deliver within the United States only.'],
      },
      {
        id: 'privacy',
        title: 'Privacy',
        text: [
          '[SAMPLE] This site collects no personal data and loads nothing from third parties. There are no tracking cookies.',
          '[SAMPLE] Your browser’s local storage keeps one setting: whether you chose inches or centimeters. It stays on your device.',
        ],
      },
    ],
    contact: {
      id: 'contact',
      title: 'Contact',
      text: '[SAMPLE] Questions about these policies?',
      link: { label: 'Contact us', href: '/contact' } as SiteLink,
    },
  },
  contact: {
    meta: {
      title: 'Contact',
      description: '[SAMPLE] Contact page description',
    },
    title: 'Contact',
    intro: '[SAMPLE] One sentence inviting visitors to email to hear when orders open.',
    email: 'hello@example.com', // [SAMPLE] replace with the real address
    subject: 'Notify me when orders open',
    note: '[SAMPLE] One sentence saying the email opens in your own mail app, with the subject filled in.',
  },
  support: {
    meta: {
      title: 'Support',
      description: '[SAMPLE] Support page description',
    },
    title: 'Support',
    intro: '[SAMPLE] One sentence on getting help with assembly and setup.',
    // TODO: assembly steps and parts list will come with the first production run. No placeholders.
    assembly: {
      id: 'assembly',
      title: 'Assembly',
      text: '[SAMPLE] A visual assembly guide will ship with the first production run.',
    },
    /** Cabinet only. */
    anchor: {
      id: 'anchor',
      title: 'Anchor it to the wall',
      text: [
        '[SAMPLE] We recommend anchoring the cabinet to the wall before you load the shelves.',
        '[SAMPLE] Use the anti-tip kit to fix the top of the cabinet to the wall, and keep children from climbing on it.',
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
      description: '[SAMPLE] Page not found description',
    },
    title: 'Page not found',
    text: '[SAMPLE] One sentence saying this page does not exist.',
    home: { label: 'Go to Home', href: '/' } as SiteLink,
    collection: { label: 'See the collection', href: '/collection' } as SiteLink,
  },
};

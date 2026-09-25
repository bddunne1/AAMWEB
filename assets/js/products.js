// Product catalog data. Names come from the current aamstrand.com product pages.
// Specs (diameters, breaking strength, put-ups) are placeholders until
// the real catalog numbers are supplied — see README.md "Content to verify".

const MATERIALS = {
  nylon: {
    label: 'Nylon',
    summary: 'Highest strength and stretch. Absorbs shock loads; good abrasion resistance.',
    traits: { strength: 5, stretch: 5, uv: 3, floats: false },
  },
  polyester: {
    label: 'Polyester',
    summary: 'Low stretch with excellent UV and abrasion resistance. Holds up outdoors.',
    traits: { strength: 4, stretch: 2, uv: 5, floats: false },
  },
  polypropylene: {
    label: 'Polypropylene',
    summary: 'Lightweight and economical. Floats and resists rot and mildew.',
    traits: { strength: 3, stretch: 3, uv: 2, floats: true },
  },
  blend: {
    label: 'Poly Blend',
    summary: 'Blended fibers balance strength, handling and cost.',
    traits: { strength: 3, stretch: 3, uv: 3, floats: false },
  },
  natural: {
    label: 'Natural Fiber',
    summary: 'Manila, sisal, cotton and jute. Traditional look, firm grip, knots well.',
    traits: { strength: 2, stretch: 1, uv: 2, floats: false },
  },
};

const CATEGORIES = {
  braided: {
    label: 'Braided Rope',
    blurb: 'Solid, diamond, single and double braid constructions that stay round, run smoothly and don’t kink.',
  },
  twisted: {
    label: 'Twisted Rope',
    blurb: 'Classic 3-strand rope that is easy to splice and grips well, in synthetic and natural fibers.',
  },
  twine: {
    label: 'Twine & Cord',
    blurb: 'Tying, seine, baler and cable cord twines for packaging, fishing, agriculture and crafts.',
  },
  specialty: {
    label: 'Specialty Rope',
    blurb: 'Shock cord, static kernmantle and paraline, built for more demanding jobs.',
  },
};

const INDUSTRIES = {
  marine: 'Marine & Sailing',
  arborist: 'Arborist & Tree Care',
  rescue: 'Rescue & Climbing',
  agriculture: 'Agriculture',
  industrial: 'Industrial & Commercial',
  retail: 'Retail & Hardware',
  fishing: 'Commercial Fishing',
};

// construction: drawing used for the cross-section icon (see main.js ropeIcon)
const PRODUCTS = [
  // Braided
  { id: 'solid-braid-nylon', name: 'Solid Braid Nylon', category: 'braided', material: 'nylon', construction: 'solid',
    uses: ['industrial', 'retail', 'marine'],
    desc: 'A firm, round braid that holds its shape and won’t unravel when cut. Works well through pulleys and for sash cord, flag halyards and general utility.' },
  { id: 'solid-braid-polyester', name: 'Solid Braid Polyester', category: 'braided', material: 'polyester', construction: 'solid',
    uses: ['industrial', 'retail', 'marine'],
    desc: 'Low stretch with excellent sunlight resistance. A durable choice for flagpole halyards, awnings and outdoor rigging.' },
  { id: 'solid-braid-mfp', name: 'Solid Braid Polypropylene MFP', category: 'braided', material: 'polypropylene', construction: 'solid',
    uses: ['industrial', 'retail'],
    desc: 'Economical multifilament polypropylene solid braid. Lightweight, rot-proof and suited to general-purpose tie-downs.' },
  { id: 'diamond-braid-nylon', name: 'Diamond Braid Nylon', category: 'braided', material: 'nylon', construction: 'diamond',
    uses: ['marine', 'retail', 'industrial'],
    desc: 'A hollow-core diamond braid with a smooth, flexible hand. Popular for utility lines, pull cords and light marine use.' },
  { id: 'diamond-braid-polyester', name: 'Diamond Braid Polyester', category: 'braided', material: 'polyester', construction: 'diamond',
    uses: ['marine', 'retail', 'industrial'],
    desc: 'Diamond braid in UV-stable polyester, for outdoor lines that need to stay strong and colorfast.' },
  { id: 'double-braid-nylon', name: 'Double Braid Nylon', category: 'braided', material: 'nylon', construction: 'double',
    uses: ['marine', 'arborist', 'industrial'],
    desc: 'A braided core inside a braided jacket, sometimes called braid-on-braid. It is strong, easy to handle and absorbs shock well, which makes it the preferred dock and anchor line.' },
  { id: '12-strand-polyester', name: '12 Strand Single Braid Polyester', category: 'braided', material: 'polyester', construction: 'single',
    uses: ['marine', 'arborist', 'industrial'],
    desc: 'A torque-free single braid that is easy to splice and inspect. Low stretch and firm for control lines and rigging.' },
  { id: '8-strand-nylon', name: '8 Strand Single Braid Nylon', category: 'braided', material: 'nylon', construction: 'single',
    uses: ['marine', 'industrial'],
    desc: 'A flexible, non-rotating single braid with high shock absorption. Easy to splice.' },
  { id: 'hollow-braid-polypro', name: 'Hollow Braid Polypropylene', category: 'braided', material: 'polypropylene', construction: 'hollow',
    uses: ['marine', 'retail', 'fishing'],
    desc: 'Floating, lightweight and easy to splice. A go-to for ski tow ropes, pool lane lines and throw lines.' },
  { id: 'econobraid', name: 'Econobraid', category: 'braided', material: 'blend', construction: 'double',
    uses: ['industrial', 'retail'],
    desc: 'All-purpose cord with a low-stretch polyester jacket over a polyester/polypropylene core. Strong, weather- and abrasion-resistant, and economical.' },

  // Twisted
  { id: '3-strand-nylon', name: '3 Strand Twisted Nylon', category: 'twisted', material: 'nylon', construction: 'twisted',
    uses: ['marine', 'industrial', 'retail'],
    desc: 'Strong and elastic, with excellent shock absorption. The classic anchor and mooring line, and easy to splice.' },
  { id: '3-strand-polyester', name: '3 Strand Twisted Polyester', category: 'twisted', material: 'polyester', construction: 'twisted',
    uses: ['marine', 'industrial'],
    desc: 'Low stretch and highly UV resistant. Dependable for rigging and lines that stay outdoors.' },
  { id: '3-strand-polypro', name: '3 Strand Twisted Polypro', category: 'twisted', material: 'polypropylene', construction: 'twisted',
    uses: ['marine', 'industrial', 'retail', 'agriculture'],
    desc: 'Floats and resists rot and mildew. A lightweight, economical all-purpose rope.' },
  { id: '3-strand-combo', name: '3 Strand Combo Rope', category: 'twisted', material: 'blend', construction: 'twisted',
    uses: ['marine', 'fishing', 'industrial'],
    desc: 'A blended-fiber twisted rope that balances strength, grip and cost.' },
  { id: 'california-truck-rope', name: 'California Truck Rope', category: 'twisted', material: 'blend', construction: 'twisted',
    uses: ['industrial', 'retail'],
    desc: 'Heavy-duty twisted rope for tying down loads on trucks and trailers.' },
  { id: '3-strand-cotton', name: '3 Strand Twisted Cotton', category: 'twisted', material: 'natural', construction: 'twisted',
    uses: ['retail', 'industrial'],
    desc: 'Soft on the hands and knots easily. Used for décor, crafts, stage work and animal handling.' },
  { id: '3-strand-manila', name: '3 Strand Twisted Manila', category: 'twisted', material: 'natural', construction: 'twisted',
    uses: ['retail', 'marine', 'industrial'],
    desc: 'Traditional natural-fiber rope with a firm grip and a classic nautical look.' },
  { id: '3-strand-sisal', name: '3 Strand Twisted Sisal Rope', category: 'twisted', material: 'natural', construction: 'twisted',
    uses: ['retail', 'agriculture'],
    desc: 'Biodegradable, economical natural rope for general utility, landscaping and pet scratching posts.' },

  // Twine
  { id: 'polypro-tying-twine', name: 'Polypropylene Tying Twine', category: 'twine', material: 'polypropylene', construction: 'twine',
    uses: ['industrial', 'retail', 'agriculture'],
    desc: 'Clean, strong and economical tying twine for bundling, packaging and the garden.' },
  { id: 'twisted-nylon-seine', name: 'Twisted Nylon Seine Twine', category: 'twine', material: 'nylon', construction: 'twine',
    uses: ['fishing', 'industrial', 'retail'],
    desc: 'Strong, abrasion-resistant twine for net making and repair, lashing and construction layout.' },
  { id: 'braided-nylon-seine', name: 'Braided Nylon Seine Twine', category: 'twine', material: 'nylon', construction: 'twine',
    uses: ['fishing', 'industrial', 'retail'],
    desc: 'Braided seine twine that won’t unravel and runs smoothly. Also used as mason’s line.' },
  { id: 'sisal-twine', name: 'Sisal Twine', category: 'twine', material: 'natural', construction: 'twine',
    uses: ['agriculture', 'retail'],
    desc: 'Natural, biodegradable twine for garden, nursery and packaging use.' },
  { id: 'cotton-twine', name: 'Cotton Twine', category: 'twine', material: 'natural', construction: 'twine',
    uses: ['retail', 'industrial'],
    desc: 'Soft, versatile twine for tying, crafts, food service and packaging.' },
  { id: 'jute-twine', name: 'Jute Twine', category: 'twine', material: 'natural', construction: 'twine',
    uses: ['retail', 'agriculture'],
    desc: 'Rustic, biodegradable twine for gardening, gift wrap and crafts.' },
  { id: 'cotton-cable-cord', name: 'Cotton Cable Cord', category: 'twine', material: 'natural', construction: 'twine',
    uses: ['retail', 'industrial'],
    desc: 'Smooth, round cotton cord for piping, upholstery, drapery and crafts.' },
  { id: 'sisal-baler-twine', name: 'Sisal Baler Twine', category: 'twine', material: 'natural', construction: 'twine',
    uses: ['agriculture'],
    desc: 'Natural baler twine that biodegrades in the field. Available in multiple put-ups.' },
  { id: 'plastic-baler-twine', name: 'Plastic Baler Twine', category: 'twine', material: 'polypropylene', construction: 'twine',
    uses: ['agriculture'],
    desc: 'Single-ply polypropylene twine for tying hay bales. UV treated, rot- and mildew-resistant, and harmless to livestock.' },

  // Specialty
  { id: 'shock-cord', name: 'Shock Cord', category: 'specialty', material: 'blend', construction: 'kernmantle',
    uses: ['marine', 'industrial', 'retail'],
    desc: 'An elastic core in a braided jacket. For tie-downs, tarps, tents and marine covers.' },
  { id: 'static-kernmantle', name: 'Static Kernmantle', category: 'specialty', material: 'nylon', construction: 'kernmantle',
    uses: ['rescue', 'arborist'],
    desc: 'A low-stretch core-and-sheath rope for rescue, rappelling, rigging and access work.' },
  { id: 'paraline', name: 'Paraline', category: 'specialty', material: 'nylon', construction: 'kernmantle',
    uses: ['retail', 'industrial', 'rescue'],
    desc: 'Lightweight braided utility cord for outdoor gear, crafts and general tying.' },
];

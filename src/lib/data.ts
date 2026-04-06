export type Product = {
  slug: string;
  name: string;
  category: string;
  price: string;
  description: string;
  longDescription: string;
  image?: string;
  imageAlt?: string;
  featured?: boolean;
  specs?: string[];
};

export const products: Product[] = [
  {
    slug: 'bicycle-lane-bureaucracy-decal',
    name: 'Bicycle Lane Bureaucracy Decal',
    category: 'Sticker',
    price: '$6',
    description:
      'Weatherproof vinyl sticker with deadpan traffic-sign energy for frames, laptops, and passive-aggressive infrastructure critique.',
    longDescription:
      'A six-inch vinyl sticker for anyone who has watched a bike lane become a loading zone, scooter corral, and amateur valet stand within the same block. Matte finish, sharp black type, and enough civic resentment to survive bad weather.',
    featured: true,
    specs: ['6 in.', 'Matte laminate', 'Outdoor rated']
  },
  {
    slug: 'stop-wheezing-tee',
    name: 'STOP WHEEZING Tee',
    category: 'Apparel',
    price: '$42',
    description: 'Heavyweight cotton tee for climbs, coffee rides, and unsolicited pacing advice.',
    longDescription:
      'Boxy cut, thick cotton, and a front print for riders who prefer their encouragement blunt. It is not subtle, but it is easy to wear and harder to ignore.',
    image: 'https://images.unsplash.com/photo-1560847581-19fd6f636822?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Black t-shirt merch photo',
    specs: ['Heavy cotton', 'Boxy fit', 'Printed chest graphic']
  },
  {
    slug: 'pass-faster-socks',
    name: 'PASS FASTER Socks',
    category: 'Footwear',
    price: '$18',
    description: 'Thin race socks with enough contrast to register from half a block away.',
    longDescription:
      'Lightweight performance sock with a high cuff and loud color hit. Built for riding fast and making sure everyone else knows exactly where they stand.',
    image: 'https://images.unsplash.com/photo-1585499583264-491df5142e83?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Colorful socks hanging on a line',
    specs: ['High cuff', 'Combed cotton blend', 'Breathable knit']
  },
  {
    slug: 'apex-pest-cap',
    name: 'APEX PEST Cap',
    category: 'Cap',
    price: '$34',
    description: 'Five-panel cap for quick errands that accidentally become longer rides.',
    longDescription:
      'A low-profile five-panel with just enough structure to look intentional and just enough attitude to work off-bike. Good for sunny rides, post-ride coffee, and casual antagonism.',
    image: 'https://images.unsplash.com/photo-1627733041826-77dd65dc5a19?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Black cap photographed on dark clothing',
    specs: ['Five-panel', 'Low profile', 'Adjustable strap']
  },
  {
    slug: 'hate-tailgates-bottle',
    name: 'HATE TAILGATES Bottle',
    category: 'Bottle',
    price: '$24',
    description: 'Insulated bottle with restrained styling and worse intentions.',
    longDescription:
      'A clean bottle shape with enough insulation for long commutes and enough copy to make a point at the stoplight. Useful first, rude second, which is the correct order.',
    image: 'https://images.unsplash.com/photo-1700506844069-6da3871c78e4?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Glass water bottle displayed on a rock by a stream',
    specs: ['Insulated', 'Soft nozzle', 'Fits standard cages']
  },
  {
    slug: 'sticker-starter-pack',
    name: 'Sticker Starter Pack',
    category: 'Bundle',
    price: '$15',
    description: 'Three stickers, including the lane decal, for surfaces that need better opinions.',
    longDescription:
      'A small pack built for laptops, toolboxes, top tubes, and any other blank surface that looks too compliant. Includes the lane decal, a logo slap, and one mystery rectangle.',
    specs: ['3-pack', 'Weatherproof vinyl', 'Mixed sizes']
  }
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

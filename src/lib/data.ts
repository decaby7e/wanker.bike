export type Product = {
  name: string;
  category: string;
  price: string;
  description: string;
  image?: string;
  imageAlt?: string;
  featured?: boolean;
  specs?: string[];
};

export const products: Product[] = [
  {
    name: 'Bicycle Lane Bureaucracy Decal',
    category: 'Sticker',
    price: '$6',
    description:
      'Weatherproof vinyl sticker with deadpan traffic-sign energy for frames, laptops, and passive-aggressive infrastructure critique.',
    featured: true,
    specs: ['6 in.', 'Matte laminate', 'Outdoor rated']
  },
  {
    name: 'STOP WHEEZING Tee',
    category: 'Apparel',
    price: '$42',
    description: 'Heavyweight cotton tee with a cleaner fit and less yelling than the old page.',
    image: 'https://images.unsplash.com/photo-1560847581-19fd6f636822?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Black t-shirt merch photo'
  },
  {
    name: 'PASS FASTER Socks',
    category: 'Footwear',
    price: '$18',
    description: 'Thin race socks with enough contrast to register from half a block away.',
    image: 'https://images.unsplash.com/photo-1585499583264-491df5142e83?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Colorful socks hanging on a line'
  },
  {
    name: 'APEX PEST Cap',
    category: 'Cap',
    price: '$34',
    description: 'Five-panel cap for quick errands that accidentally become longer rides.',
    image: 'https://images.unsplash.com/photo-1627733041826-77dd65dc5a19?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Black cap photographed on dark clothing'
  },
  {
    name: 'HATE TAILGATES Bottle',
    category: 'Bottle',
    price: '$24',
    description: 'Insulated bottle with restrained styling and less fake marketplace noise.',
    image: 'https://images.unsplash.com/photo-1700506844069-6da3871c78e4?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Glass water bottle displayed on a rock by a stream'
  },
  {
    name: 'Sticker Starter Pack',
    category: 'Bundle',
    price: '$15',
    description: 'Three stickers, including the lane decal, for surfaces that need better opinions.'
  }
];

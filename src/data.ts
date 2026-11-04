export interface Product {
  id: number;
  name: string;
  origin: string;
  category: string;
  price: number;
  weight: string;
  roast: string;
  description: string;
  notes: string[];
  intensity: number;
  image: string;
}

export const categories = [
  'All',
  'Light Roast',
  'Medium Roast',
  'Dark Roast',
  'Espresso',
  'Decaf',
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Ethiopian Yirgacheffe',
    origin: 'Ethiopia',
    category: 'Light Roast',
    price: 18.5,
    weight: '250g',
    roast: 'Light',
    description:
      'A vibrant and complex single-origin coffee from the birthplace of coffee. Grown at elevations above 1,800 meters in the Yirgacheffe region, this lot delivers an extraordinary cup with floral aromatics and a silky body that dances on the palate.',
    notes: ['Jasmine', 'Bergamot', 'Peach', 'Honey'],
    intensity: 2,
    image: '🫘',
  },
  {
    id: 2,
    name: 'Colombian Supremo',
    origin: 'Colombia',
    category: 'Medium Roast',
    price: 16.0,
    weight: '250g',
    roast: 'Medium',
    description:
      'Sourced from small farms in the Huila region of Colombia, this Supremo grade coffee offers a beautifully balanced cup. The medium roast brings out rich caramel sweetness while preserving the bean\'s natural fruit character.',
    notes: ['Caramel', 'Red Apple', 'Cocoa', 'Walnut'],
    intensity: 3,
    image: '☕',
  },
  {
    id: 3,
    name: 'Sumatra Mandheling',
    origin: 'Indonesia',
    category: 'Dark Roast',
    price: 19.0,
    weight: '250g',
    roast: 'Dark',
    description:
      'A bold and full-bodied coffee from the volcanic highlands of Sumatra. The wet-hulled processing method unique to this region creates an earthy, complex cup with a syrupy mouthfeel and lingering finish that coffee lovers crave.',
    notes: ['Dark Chocolate', 'Cedar', 'Tobacco', 'Black Pepper'],
    intensity: 5,
    image: '🌋',
  },
  {
    id: 4,
    name: 'Artisan Espresso Blend',
    origin: 'Brazil & Ethiopia',
    category: 'Espresso',
    price: 17.5,
    weight: '250g',
    roast: 'Medium-Dark',
    description:
      'Our master roaster\'s signature espresso blend combines the chocolatey depth of Brazilian Santos with the bright fruit notes of Ethiopian natural process beans. Designed to produce a rich, syrupy shot with a golden crema.',
    notes: ['Dark Chocolate', 'Dried Fig', 'Hazelnut', 'Brown Sugar'],
    intensity: 4,
    image: '✨',
  },
  {
    id: 5,
    name: 'Morning Ritual Blend',
    origin: 'Guatemala & Kenya',
    category: 'Medium Roast',
    price: 15.0,
    weight: '250g',
    roast: 'Medium',
    description:
      'The perfect everyday companion. This thoughtfully crafted blend combines the smooth, chocolatey base of Guatemalan Antigua beans with the sparkling acidity of Kenyan AA for a cup that\'s both comforting and invigorating.',
    notes: ['Milk Chocolate', 'Orange Zest', 'Toasted Almond', 'Honey'],
    intensity: 3,
    image: '🌅',
  },
  {
    id: 6,
    name: 'Swiss Water Decaf',
    origin: 'Mexico',
    category: 'Decaf',
    price: 17.0,
    weight: '250g',
    roast: 'Medium',
    description:
      'Proof that decaf can be delicious. Using the chemical-free Swiss Water process, we preserve the full flavor of this organic Mexican coffee while removing 99.9% of caffeine. Enjoy a rich cup any time of day without compromise.',
    notes: ['Milk Chocolate', 'Vanilla', 'Toasted Marshmallow', 'Pecan'],
    intensity: 2,
    image: '🌙',
  },
];

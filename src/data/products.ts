
import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 1,
    name: "Triple Chocolate Cake",
    description: "Indulge in layers of rich chocolate sponge cake with creamy chocolate ganache and chocolate buttercream frosting.",
    price: 35.99,
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    category: "cakes",
    stock: 15,
    featured: true
  },
  {
    id: 2,
    name: "Strawberry Cheesecake",
    description: "Creamy cheesecake with a graham cracker crust topped with fresh strawberry compote.",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    category: "cakes",
    stock: 10,
    featured: true
  },
  {
    id: 3,
    name: "Classic Macarons (Box of 12)",
    description: "Delicate almond meringue cookies in assorted flavors including vanilla, chocolate, raspberry, and pistachio.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    category: "cookies",
    stock: 20,
    featured: true
  },
  {
    id: 4,
    name: "Vanilla Cupcakes (Box of 6)",
    description: "Fluffy vanilla cupcakes topped with creamy buttercream frosting and rainbow sprinkles.",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1607478900766-efe13248b125?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    category: "cupcakes",
    stock: 30,
    featured: false
  },
  {
    id: 5,
    name: "Red Velvet Cake",
    description: "Moist red velvet cake layers with cream cheese frosting and red velvet crumbs.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1586788680434-30d324626f4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    category: "cakes",
    stock: 12,
    featured: true
  },
  {
    id: 6,
    name: "Chocolate Chip Cookies (Box of 12)",
    description: "Classic chocolate chip cookies with a soft center and crispy edges.",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    category: "cookies",
    stock: 40,
    featured: false
  },
  {
    id: 7,
    name: "Lemon Tart",
    description: "Tangy lemon curd in a buttery pastry shell topped with fresh berries.",
    price: 22.99,
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d5b1ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    category: "pastries",
    stock: 15,
    featured: false
  },
  {
    id: 8,
    name: "Chocolate Eclairs (Box of 4)",
    description: "Light choux pastry filled with vanilla custard and topped with chocolate ganache.",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1607920592519-bab2d135e9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    category: "pastries",
    stock: 25,
    featured: false
  },
  {
    id: 9,
    name: "Cinnamon Rolls (Box of 6)",
    description: "Soft and fluffy cinnamon rolls with cream cheese frosting.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1583527976469-b7cdab93a913?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    category: "pastries",
    stock: 20,
    featured: true
  },
  {
    id: 10,
    name: "Fruit Tart",
    description: "Buttery tart shell filled with vanilla custard and topped with fresh seasonal fruits.",
    price: 26.99,
    image: "https://images.unsplash.com/photo-1562777717-dc6984f65a63?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    category: "pastries",
    stock: 18,
    featured: false
  },
  {
    id: 11,
    name: "Chocolate Brownies (Box of 8)",
    description: "Fudgy chocolate brownies with a crackly top and walnuts.",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    category: "cookies",
    stock: 35,
    featured: false
  },
  {
    id: 12,
    name: "Birthday Cake",
    description: "Festive vanilla cake with rainbow sprinkles, buttercream frosting, and birthday decorations.",
    price: 42.99,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    category: "cakes",
    stock: 10,
    featured: true
  }
];

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'cakes', name: 'Cakes' },
  { id: 'cupcakes', name: 'Cupcakes' },
  { id: 'cookies', name: 'Cookies' },
  { id: 'pastries', name: 'Pastries' }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

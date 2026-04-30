export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
};

export type Category = {
  id: string;
  name: string;
};

export const MOCK_CATEGORIES: Category[] = [
  { id: "1", name: "Hambúrgueres" },
  { id: "2", name: "Bebidas" },
  { id: "3", name: "Porções" },
  { id: "4", name: "Sobremesas" },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Smash Burger",
    description: "Pão brioche, 2x smash burger 80g, queijo cheddar, molho da casa.",
    price: 28.9,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    categoryId: "1",
  },
  {
    id: "p2",
    name: "Classic Bacon",
    description: "Pão australiano, blend 160g, muito bacon, queijo prato e maionese verde.",
    price: 34.9,
    image: "https://images.unsplash.com/photo-1594212691516-015822f6fa7c?auto=format&fit=crop&w=800&q=80",
    categoryId: "1",
  },
  {
    id: "p3",
    name: "Coca-Cola Lata",
    description: "Lata 350ml bem gelada.",
    price: 6.5,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
    categoryId: "2",
  },
  {
    id: "p4",
    name: "Batata Frita Rústica",
    description: "Porção de 400g de batatas rústicas com alecrim e alho.",
    price: 18.0,
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80",
    categoryId: "3",
  },
  {
    id: "p5",
    name: "Milkshake de Morango",
    description: "Milkshake artesanal com pedaços de morango, 400ml.",
    price: 15.0,
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80",
    categoryId: "4",
  },
];

// types.ts
export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity?: number;
  description?: string;
  category?: string;
  rating?: { rate: number; count: number };
}
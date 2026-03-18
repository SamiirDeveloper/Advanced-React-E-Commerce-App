// /app/types.ts

// Represents a single product in the shopping cart
export interface CartItem {
  id: number;           // Product ID from FakeStore API
  title: string;        // Product title
  price: number;        // Price per unit
  image: string;        // Product image URL
  quantity: number;     // Number of this product in the cart
}
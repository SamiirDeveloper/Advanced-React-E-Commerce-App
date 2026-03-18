// /app/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ✅ Define CartItem type
interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

// Slice state type
interface CartState {
  items: CartItem[];
}

// Initialize state from sessionStorage
const initialState: CartState = {
  items: JSON.parse(sessionStorage.getItem("cart") || "[]"),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state: CartState, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      sessionStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart(state: CartState, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      sessionStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart(state: CartState) {
      state.items = [];
      sessionStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
const savedCart = sessionStorage.getItem("cart");
const initialState = {
    items: savedCart ? JSON.parse(savedCart) : [],
};
const saveCart = (items) => {
    sessionStorage.setItem("cart", JSON.stringify(items));
};
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const existing = state.items.find(item => item.id === action.payload.id);
            if (existing) {
                existing.quantity += 1;
            }
            else {
                state.items.push(Object.assign(Object.assign({}, action.payload), { quantity: 1 }));
            }
            saveCart(state.items);
        },
        removeFromCart(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload);
            saveCart(state.items);
        },
        clearCart(state) {
            state.items = [];
            saveCart(state.items);
        },
    },
});
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

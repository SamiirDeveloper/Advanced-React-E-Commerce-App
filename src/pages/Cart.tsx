// /pages/Cart.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { removeFromCart, clearCart } from "../app/cartSlice";

export default function Cart() {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total price
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (items.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <img src={item.image} alt={item.title} />
            <div>
              <span>{item.title}</span>
              <span> x {item.quantity}</span>
            </div>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
            <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
          </li>
        ))}
      </ul>

      <p><strong>Total:</strong> ${totalPrice.toFixed(2)}</p>

      <button className="checkout" onClick={() => dispatch(clearCart())}>
        Checkout
      </button>
    </div>
  );
}
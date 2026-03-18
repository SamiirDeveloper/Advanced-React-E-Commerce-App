// /pages/Cart.tsx
import React from "react";
import { removeFromCart, clearCart } from "../app/cartSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";

export default function Cart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  // Calculate total price
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="cart" style={{ padding: "1rem" }}>
      <h2>Shopping Cart</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1rem",
              borderBottom: "1px solid #ccc",
              paddingBottom: "0.5rem",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
                (e.currentTarget.src = "https://via.placeholder.com/80")
              }
            />

            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0 }}>{item.title}</h4>
              <p style={{ margin: 0 }}>Quantity: {item.quantity}</p>
            </div>

            <span style={{ fontWeight: "bold" }}>${(item.price * item.quantity).toFixed(2)}</span>

            <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "1rem" }}>
        <p>
          <strong>Total:</strong> ${totalPrice.toFixed(2)}
        </p>
        <button onClick={() => dispatch(clearCart())}>Checkout</button>
      </div>
    </div>
  );
}
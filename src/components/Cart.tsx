// src/components/Cart.tsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { removeFromCart, clearCart, CartItem } from "../app/cartSlice";

const Cart: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const cartItems: CartItem[] = useSelector((state: RootState) => state.cart) || [];
  const dispatch = useDispatch();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Cart Button */}
      <button
        className="btn btn-primary position-relative"
        onClick={() => setCartOpen(!cartOpen)}
      >
        🛒 {totalItems}
      </button>

      {/* Slide-out Cart Drawer */}
      <div className={`cart-drawer ${cartOpen ? "open" : ""}`}>
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className="d-flex align-items-center justify-content-between mb-2">
                  <img src={item.image} alt={item.title} />
                  <div className="flex-grow-1 ms-2">
                    <p className="mb-0">{item.title}</p>
                    <small>Qty: {item.quantity}</small>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <hr />
            <p>
              <strong>Total Items:</strong> {totalItems} <br />
              <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
            </p>
            <button
              className="btn btn-success w-100 mt-2"
              onClick={() => {
                dispatch(clearCart());
                alert("Checkout successful!");
              }}
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
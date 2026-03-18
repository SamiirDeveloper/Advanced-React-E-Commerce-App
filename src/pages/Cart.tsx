import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { removeFromCart, clearCart } from "../app/cartSlice";

const Cart: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart) || [];
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.price * (item.quantity || 1)),
    0
  );

  const totalItems = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 0),
    0
  );

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => setCartOpen(!cartOpen)}
      >
        🛒 {totalItems}
      </button>

      <div className={`cart-drawer ${cartOpen ? "open" : ""}`}>
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <span>{item.title}</span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                  <span>${item.price}</span>
                  <button onClick={() => dispatch(removeFromCart(item.id))}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <p>Total: ${totalPrice.toFixed(2)}</p>
            <button
              className="checkout"
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
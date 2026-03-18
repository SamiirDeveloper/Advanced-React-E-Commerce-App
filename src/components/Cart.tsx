import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { removeFromCart, clearCart } from "../app/cartSlice";

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleCheckout = () => {
    dispatch(clearCart());
    alert("Checkout successful! Your cart is now empty.");
  };

  if (cartItems.length === 0)
    return <h3>Your cart is empty. Add some products!</h3>;

  return (
    <>
      <h2>Your Shopping Cart</h2>
      <ul className="list-group mb-3">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center">
              <img
                src={item.image}
                alt={item.title}
                width={50}
                height={50}
                className="me-3"
              />
              <span>{item.title} x {item.quantity}</span>
            </div>
            <div>
              <span className="me-3">${(item.price * item.quantity).toFixed(2)}</span>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h4>Total Items: {totalQuantity}</h4>
      <h4>Total Price: ${totalPrice}</h4>

      <button className="btn btn-success mt-3" onClick={handleCheckout}>
        Checkout
      </button>
    </>
  );
};

export default Cart;
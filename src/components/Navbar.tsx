// src/components/Navbar.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { removeFromCart, clearCart } from "../app/cartSlice";

const Navbar: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Calculate total quantity and total price
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    dispatch(clearCart());
    alert("Checkout successful! Your cart is now empty.");
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        {/* Clickable brand */}
        <Link className="navbar-brand" to="/">
          Samir's Advanced React FakeStore
        </Link>

        {/* Cart Dropdown */}
        <div className="ms-auto position-relative">
          <button
            className="btn btn-outline-light position-relative"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Cart ({totalQuantity})
          </button>

          {dropdownOpen && (
            <div
              className="dropdown-menu dropdown-menu-end p-3 shadow"
              style={{ minWidth: "300px", right: 0, display: "block" }}
            >
              {cartItems.length === 0 ? (
                <p className="text-center mb-0">Cart is empty</p>
              ) : (
                <>
                  {/* List cart items */}
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between align-items-center mb-2"
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          width={40}
                          height={40}
                          className="me-2"
                        />
                        <span>
                          {item.title} x {item.quantity}
                        </span>
                      </div>
                      <div>
                        <span className="me-2">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Totals */}
                  <hr />
                  <div className="d-flex justify-content-between fw-bold mb-2">
                    <span>Total Items:</span>
                    <span>{totalQuantity}</span>
                  </div>
                  <div className="d-flex justify-content-between fw-bold mb-2">
                    <span>Total Price:</span>
                    <span>${totalPrice}</span>
                  </div>

                  {/* Checkout button */}
                  <button
                    className="btn btn-success w-100"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
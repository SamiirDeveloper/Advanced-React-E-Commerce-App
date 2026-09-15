import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { removeFromCart, clearCart } from "../app/cartSlice";

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleCheckout = () => {
    dispatch(clearCart());
    alert("Checkout successful! Your cart is now empty.");
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-5">
        <div className="card shadow-sm border-0">
          <div className="card-body text-center py-5">
            <div className="display-4 mb-3">🛒</div>

            <h3 className="fw-bold">Your cart is empty</h3>

            <p className="text-muted mb-4">
              Add some products to your cart and they will appear here.
            </p>

            <button className="btn btn-primary px-4">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row g-4">
        {/* Cart Items */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3">
              <h2 className="h4 mb-0 fw-bold">
                🛒 Your Shopping Cart
              </h2>
            </div>

            <ul className="list-group list-group-flush">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item py-3"
                >
                  <div className="row align-items-center g-3">
                    {/* Product */}
                    <div className="col-md-6">
                      <div className="d-flex align-items-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          width={70}
                          height={70}
                          className="rounded border me-3"
                          style={{ objectFit: "contain" }}
                        />

                        <div>
                          <h6 className="mb-1 fw-semibold">
                            {item.title}
                          </h6>

                          <span className="badge bg-secondary">
                            Qty: {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Price & Remove */}
                    <div className="col-md-6">
                      <div className="d-flex justify-content-md-end align-items-center gap-3">
                        <span className="fw-bold fs-5">
                          $
                          {(item.price * item.quantity).toFixed(2)}
                        </span>

                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() =>
                            dispatch(removeFromCart(item.id))
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h4 className="fw-bold mb-4">Order Summary</h4>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Total Items</span>
                <span className="fw-semibold">{totalQuantity}</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Subtotal</span>
                <span className="fw-semibold">${totalPrice}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <span className="fw-bold">Total Price</span>
                <span className="fw-bold fs-4 text-success">
                  ${totalPrice}
                </span>
              </div>

              <button
                className="btn btn-success w-100 py-2 fw-semibold"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>

              <button
                className="btn btn-outline-danger w-100 mt-2"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

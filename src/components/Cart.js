import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../app/cartSlice";
const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
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
        return _jsx("h3", { children: "Your cart is empty. Add some products!" });
    return (_jsxs(_Fragment, { children: [_jsx("h2", { children: "Your Shopping Cart" }), _jsx("ul", { className: "list-group mb-3", children: cartItems.map((item) => (_jsxs("li", { className: "list-group-item d-flex justify-content-between align-items-center", children: [_jsxs("div", { className: "d-flex align-items-center", children: [_jsx("img", { src: item.image, alt: item.title, width: 50, height: 50, className: "me-3" }), _jsxs("span", { children: [item.title, " x ", item.quantity] })] }), _jsxs("div", { children: [_jsxs("span", { className: "me-3", children: ["$", (item.price * item.quantity).toFixed(2)] }), _jsx("button", { className: "btn btn-danger btn-sm", onClick: () => dispatch(removeFromCart(item.id)), children: "Remove" })] })] }, item.id))) }), _jsxs("h4", { children: ["Total Items: ", totalQuantity] }), _jsxs("h4", { children: ["Total Price: $", totalPrice] }), _jsx("button", { className: "btn btn-success mt-3", onClick: handleCheckout, children: "Checkout" })] }));
};
export default Cart;

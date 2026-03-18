import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../app/cartSlice";
const Navbar = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    // Calculate totals
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
        setDropdownOpen(false); // Close dropdown after checkout
    };
    return (_jsx("nav", { className: "navbar navbar-expand-lg navbar-dark bg-primary", children: _jsxs("div", { className: "container", children: [_jsx("span", { className: "navbar-brand", children: "Samir's Advanced React FakeStore" }), _jsxs("div", { className: "ms-auto position-relative", children: [_jsxs("button", { className: "btn btn-outline-light position-relative", onClick: () => setDropdownOpen(!dropdownOpen), children: ["Cart (", totalQuantity, ")"] }), dropdownOpen && (_jsx("div", { className: "dropdown-menu dropdown-menu-end p-3 shadow", style: { minWidth: "300px", right: 0, display: "block" }, children: cartItems.length === 0 ? (_jsx("p", { className: "text-center mb-0", children: "Cart is empty" })) : (_jsxs(_Fragment, { children: [cartItems.map((item) => (_jsxs("div", { className: "d-flex justify-content-between align-items-center mb-2", children: [_jsxs("div", { className: "d-flex align-items-center", children: [_jsx("img", { src: item.image, alt: item.title, width: 40, height: 40, className: "me-2" }), _jsxs("span", { children: [item.title, " x ", item.quantity] })] }), _jsxs("div", { children: [_jsxs("span", { className: "me-2", children: ["$", (item.price * item.quantity).toFixed(2)] }), _jsx("button", { className: "btn btn-sm btn-danger", onClick: () => dispatch(removeFromCart(item.id)), children: "\u00D7" })] })] }, item.id))), _jsx("hr", {}), _jsxs("div", { className: "d-flex justify-content-between fw-bold mb-2", children: [_jsx("span", { children: "Total Items:" }), _jsx("span", { children: totalQuantity })] }), _jsxs("div", { className: "d-flex justify-content-between fw-bold mb-2", children: [_jsx("span", { children: "Total Price:" }), _jsxs("span", { children: ["$", totalPrice] })] }), _jsx("button", { className: "btn btn-success w-100", onClick: handleCheckout, children: "Checkout" })] })) }))] })] }) }));
};
export default Navbar;

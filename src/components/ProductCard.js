import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/cartSlice";
export default function ProductCard({ product }) {
    const dispatch = useDispatch();
    return (_jsxs("div", { style: { border: "1px solid gray", padding: "1rem", margin: "1rem" }, children: [_jsx("img", { src: product.image, alt: product.title, onError: (e) => {
                    e.target.src =
                        "https://via.placeholder.com/150";
                }, width: "150" }), _jsx("h3", { children: product.title }), _jsxs("p", { children: ["$", product.price] }), _jsx("p", { children: product.category }), _jsx("p", { children: product.description }), _jsxs("p", { children: ["Rating: ", product.rating.rate] }), _jsx("button", { onClick: () => dispatch(addToCart(Object.assign(Object.assign({}, product), { quantity: 1 }))), children: "Add to Cart" })] }));
}

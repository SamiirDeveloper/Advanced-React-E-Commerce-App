var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/cartSlice";
import axios from "axios";
// Fetch categories from API
const fetchCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios.get("https://fakestoreapi.com/products/categories");
    return res.data;
});
// Fetch products from API (all or by category)
const fetchProducts = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const url = category
        ? `https://fakestoreapi.com/products/category/${category}`
        : "https://fakestoreapi.com/products";
    const res = yield axios.get(url);
    return res.data;
});
const Home = () => {
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState("");
    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });
    const { data: products, isLoading } = useQuery({
        queryKey: ["products", selectedCategory],
        queryFn: () => fetchProducts(selectedCategory),
    });
    if (isLoading)
        return _jsx("p", { children: "Loading products..." });
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "mb-4", children: _jsxs("select", { className: "form-select w-auto", value: selectedCategory, onChange: (e) => setSelectedCategory(e.target.value), children: [_jsx("option", { value: "", children: "All Categories" }), categories === null || categories === void 0 ? void 0 : categories.map((cat) => (_jsx("option", { value: cat, children: cat }, cat)))] }) }), _jsx("div", { className: "row", children: products === null || products === void 0 ? void 0 : products.map((product) => (_jsx("div", { className: "col-md-4 mb-4", children: _jsxs("div", { className: "card h-100", children: [_jsx("img", { src: product.image, className: "card-img-top", alt: product.title, onError: (e) => (e.target.src = "https://via.placeholder.com/150") }), _jsxs("div", { className: "card-body d-flex flex-column", children: [_jsx("h5", { className: "card-title", children: product.title }), _jsx("p", { className: "card-text flex-grow-1", children: product.description }), _jsxs("p", { className: "card-text", children: [_jsxs("strong", { children: ["$", product.price] }), " | Rating: ", product.rating.rate, " \u2B50"] }), _jsx("button", { className: "btn btn-primary mt-auto", onClick: () => dispatch(addToCart({
                                            id: product.id,
                                            title: product.title,
                                            price: product.price,
                                            image: product.image,
                                            quantity: 1,
                                        })), children: "Add to Cart" })] })] }) }, product.id))) })] }));
};
export default Home;

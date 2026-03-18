var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
const fetchCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("https://fakestoreapi.com/products/categories");
    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }
    return response.json();
});
export default function CategorySelect({ selectedCategory, onSelectCategory, }) {
    const { data: categories, isLoading, isError, error, } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });
    if (isLoading)
        return _jsx("p", { children: "Loading categories..." });
    if (isError)
        return _jsx("p", { children: error.message });
    return (_jsxs("div", { style: { marginBottom: "1rem" }, children: [_jsx("label", { htmlFor: "category", children: "Filter by Category: " }), _jsxs("select", { id: "category", value: selectedCategory, onChange: (e) => onSelectCategory(e.target.value), children: [_jsx("option", { value: "", children: "All Categories" }), categories === null || categories === void 0 ? void 0 : categories.map((category) => (_jsx("option", { value: category, children: category }, category)))] })] }));
}

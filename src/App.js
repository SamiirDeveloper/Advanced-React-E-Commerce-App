import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
function App() {
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsx("div", { className: "container mt-4", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/cart", element: _jsx(Cart, {}) })] }) })] }));
}
export default App;

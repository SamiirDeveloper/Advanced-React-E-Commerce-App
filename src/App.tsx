import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { AuthProvider } from './context/AuthContext';
import Cart from './pages/Cart';
import Register from './pages/Cart';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Profile from './pages/Profile';


function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <AuthProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/Cart">Cart</Link>
      {user ? (
        <>
          <Link to="/Profile">Profile</Link>
          <Link to="/Logout">Logout</Link>
        </>
      ) : (
        <>
          <Link to="/register">Profile</Link>
          <Link to="/login">Logout</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;

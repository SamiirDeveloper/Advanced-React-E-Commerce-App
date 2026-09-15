import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">

        {/* Brand */}
        <Link
          to="/"
          className="navbar-brand fw-bold fs-4"
        >
          🛍️ My Store
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >
          <div className="navbar-nav ms-auto align-items-lg-center">

            <Link
              to="/"
              className="nav-link px-lg-3"
            >
              Home
            </Link>

            <Link
              to="/cart"
              className="nav-link px-lg-3"
            >
              🛒 Cart
            </Link>

            {user ? (
              <>
                <Link
                  to="/profile"
                  className="nav-link px-lg-3"
                >
                  👤 Profile
                </Link>

                <Link
                  to="/logout"
                  className="nav-link px-lg-3"
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="nav-link px-lg-3"
                >
                  Register
                </Link>

                <Link
                  to="/login"
                  className="btn btn-light text-primary fw-semibold ms-lg-2 px-3"
                >
                  Login
                </Link>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

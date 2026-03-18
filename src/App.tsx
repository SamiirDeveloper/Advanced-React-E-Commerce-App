// src/App.tsx
import React from "react";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

function App() {
  return (
    <div className="container py-4">
      {/* Header */}
      <header className="position-relative text-center mb-5">
        <h1 className="fw-bold m-0 display-6 text-primary">
          FakeStore Product Catalog
        </h1>

        {/* Cart Button (top-right) */}
        <div className="position-absolute top-0 end-0 mt-3 me-3">
          <Cart />
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="bg-white p-3 p-md-4 rounded-4 shadow-sm">
          <Home />
        </div>
      </main>
    </div>
  );
}

export default App;
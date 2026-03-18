import Home from "./pages/Home";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="container py-4">
      {/* Header */}
      <header className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
        <h1 className="fw-bold text-center text-md-start m-0">
          FakeStore Product Catalog
        </h1>

        <div className="ms-md-auto">
          <Cart />
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="bg-light p-3 p-md-4 rounded-4 shadow-sm">
          <Home />
        </div>
      </main>
    </div>
  );
}

export default App;
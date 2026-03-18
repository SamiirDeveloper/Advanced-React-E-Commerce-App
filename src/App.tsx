import Home from "./pages/Home";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>FakeStore Product Catalog</h1>

        <div className="cart-wrapper">
          <Cart />
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;
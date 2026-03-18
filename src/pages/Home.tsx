import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/cartSlice";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: { rate: number; count: number };
}

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("https://fakestoreapi.com/products");
  return res.json();
};

const fetchCategories = async (): Promise<string[]> => {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  return res.json();
};

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Fetch products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: async () => {
      if (!selectedCategory) return fetchProducts();
      const res = await fetch(
        `https://fakestoreapi.com/products/category/${selectedCategory}`
      );
      return res.json();
    },
  });

  if (isLoading) return <p>Loading products...</p>;

  return (
    <div>
      {/* Category Dropdown */}
      <div className="category-select mb-4 d-flex justify-content-center">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.image}
              alt={product.title}
              onError={(e) =>
                ((e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/150")
              }
            />
            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-category">{product.category}</p>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price}</p>
              <button onClick={() => dispatch(addToCart(product as any))}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
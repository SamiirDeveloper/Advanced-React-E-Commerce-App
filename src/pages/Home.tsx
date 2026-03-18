// src/pages/Home.tsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/cartSlice";

// Define TypeScript types
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Fetch all categories dynamically
  const { data: categories = [] } = useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get("https://fakestoreapi.com/products/categories");
      return res.data;
    },
  });

  // Fetch products (all or by selected category)
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["products", selectedCategory],
    queryFn: async () => {
      const url =
        selectedCategory === "all"
          ? "https://fakestoreapi.com/products"
          : `https://fakestoreapi.com/products/category/${selectedCategory}`;
      const res = await axios.get<Product[]>(url);
      return res.data;
    },
  });

  // Fallback image in case of broken URLs
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://via.placeholder.com/150";
  };

  return (
    <div className="container my-4">
      <h2 className="mb-3">Product Catalog</h2>

      {/* Category Dropdown */}
      <div className="mb-4">
        <select
          className="form-select w-auto"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((category: string) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="row">
        {products.map((product: Product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={product.image}
                className="card-img-top p-3"
                alt={product.title}
                onError={handleImageError}
                style={{ height: "250px", objectFit: "contain" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text text-truncate">{product.description}</p>
                <p className="mb-1">
                  <strong>Category:</strong> {product.category}
                </p>
                <p className="mb-1">
                  <strong>Rating:</strong> {product.rating.rate} / 5
                </p>
                <p className="mb-3">
                  <strong>Price:</strong> ${product.price}
                </p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <p className="text-center">No products found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
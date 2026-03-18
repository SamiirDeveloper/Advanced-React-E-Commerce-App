import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/cartSlice";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

// Fetch categories from API
const fetchCategories = async () => {
  const res = await axios.get<string[]>("https://fakestoreapi.com/products/categories");
  return res.data;
};

// Fetch products from API (all or by category)
const fetchProducts = async (category?: string) => {
  const url = category
    ? `https://fakestoreapi.com/products/category/${category}`
    : "https://fakestoreapi.com/products";
  const res = await axios.get<Product[]>(url);
  return res.data;
};

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () => fetchProducts(selectedCategory),
  });

  if (isLoading) return <p>Loading products...</p>;

  return (
    <>
      <div className="mb-4">
        <select
          className="form-select w-auto"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories?.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="row">
        {products?.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.title}
                onError={(e) =>
                  ((e.target as HTMLImageElement).src = "https://via.placeholder.com/150")
                }
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text flex-grow-1">{product.description}</p>
                <p className="card-text">
                  <strong>${product.price}</strong> | Rating: {product.rating.rate} ⭐
                </p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() =>
                    dispatch(
                      addToCart({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.image,
                        quantity: 1,
                      })
                    )
                  }
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
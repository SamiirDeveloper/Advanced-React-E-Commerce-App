import { useState } from "react";
import { useQuery, keepPreviousData as tanstackKeepPreviousData } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";
import CategorySelect from "../components/CategorySelect";

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
  };
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const fetchProducts = async (): Promise<Product[]> => {
    const url = selectedCategory
      ? `https://fakestoreapi.com/products/category/${selectedCategory}`
      : "https://fakestoreapi.com/products";
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch products");
    return (await res.json()) as Product[];
  };

  const { data, isLoading, isError, error } = useQuery<Product[]>({
    queryKey: ["products", selectedCategory],
    queryFn: fetchProducts,
    placeholderData: tanstackKeepPreviousData, // ✅ v5 replacement
  });

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>{(error as Error).message}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Product Catalog</h1>

      <CategorySelect
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1rem",
        }}
      >
        {(data ?? []).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
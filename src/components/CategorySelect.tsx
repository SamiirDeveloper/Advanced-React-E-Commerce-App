import { useQuery } from "@tanstack/react-query";

interface CategorySelectProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const fetchCategories = async (): Promise<string[]> => {
  const response = await fetch(
    "https://fakestoreapi.com/products/categories"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
};

export default function CategorySelect({
  selectedCategory,
  onSelectCategory,
}: CategorySelectProps) {
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isLoading) return <p>Loading categories...</p>;
  if (isError) return <p>{(error as Error).message}</p>;

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="category">Filter by Category: </label>

      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => onSelectCategory(e.target.value)}
      >
        <option value="">All Categories</option>

        {categories?.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
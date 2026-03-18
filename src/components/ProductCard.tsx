import { useDispatch } from "react-redux";
import { addToCart } from "../app/cartSlice";

interface Product {
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

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();

  return (
    <div style={{ border: "1px solid gray", padding: "1rem", margin: "1rem" }}>
      
      <img
        src={product.image}
        alt={product.title}
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://via.placeholder.com/150";
        }}
        width="150"
      />

      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <p>{product.category}</p>
      <p>{product.description}</p>
      <p>Rating: {product.rating.rate}</p>

      <button onClick={() => dispatch(addToCart(product))}>
        Add to Cart
      </button>
    </div>
  );
}
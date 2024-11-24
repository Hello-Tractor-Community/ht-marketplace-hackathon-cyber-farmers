import { useEffect, useState } from "react";
import { Product } from "./types/Product";
import { mockProducts } from "@/app/mock-data/products";

const useProducts = (filterCondition: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        let filteredProducts = [...mockProducts];

        if (filterCondition === "new") {
          filteredProducts = filteredProducts.filter((product) => product.condition === "new");
        } else if (filterCondition === "used") {
          filteredProducts = filteredProducts.filter((product) => product.condition === "used");
        }

        if (!signal.aborted) {
          setProducts(filteredProducts.slice(0, 8)); // Adjust as needed
          setLoading(false);
        }
      } catch (error) {
        if (!signal.aborted) {
          console.error("Failed to fetch products:", error);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [filterCondition]); // Use only the primitive value

  return { products, loading };
};

export default useProducts;


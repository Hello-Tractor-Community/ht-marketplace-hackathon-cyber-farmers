import { useEffect, useState } from "react";
import { Product } from "./types/Product";
import { mockProducts } from "@/app/mock-data/products";

const useProducts = (filters: { condition: string }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        let filteredProducts = [...mockProducts];

        // Apply filtering logic
        switch (filters.condition) {
          case "new":
            filteredProducts = filteredProducts.filter(
              (product) => product.condition === "new"
            );
            break;
          case "used":
            filteredProducts = filteredProducts.filter(
              (product) => product.condition === "used"
            );
            break;
          case "fastMoving":
            filteredProducts = filteredProducts.filter(
              (product) => product.fastMoving
            );
            break;
          case "location":
            filteredProducts = filteredProducts.filter(
              (product) => product.location.toLowerCase() === "kisumu"
            );
            break;
          case "under1m":
            filteredProducts = filteredProducts.filter(
              (product) => product.price <= 1000000
            );
            break;
          default:
            break;
        }

        setTimeout(() => {
          if (!signal.aborted) {
            setProducts(filteredProducts.slice(0, 8));
            setLoading(false);
          }
        }, 500); // Simulate delay
      } catch (err) {
        // Check if the error is an instance of Error
        if (err instanceof Error) {
          console.error("Error fetching products:", err.message);
        } else {
          console.error("Unexpected error:", err);
        }
      }
    };

    fetchData();

    return () => controller.abort(); // Cleanup on unmount or re-run
  }, [filters]); // Re-run only when `filters` changes

  return { products, loading };
};

export default useProducts;

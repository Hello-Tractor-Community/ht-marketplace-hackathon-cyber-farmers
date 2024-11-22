import { useEffect, useState } from "react";
import { Product } from "./types/Product";
import { mockProducts } from "./products";

const useProducts = (filters: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Replace this logic with an actual API call when the backend is ready
      const data = mockProducts; // Mock data for now

      // Apply filters
      let filteredProducts = data;
      if (filters.condition) {
        filteredProducts = filteredProducts.filter(
          (product) => product.condition === filters.condition
        );
      }
      if (filters.fastMoving) {
        filteredProducts = filteredProducts.filter(
          (product) => product.fastMoving === filters.fastMoving
        );
      }
      // Add more filters as needed...

      setProducts(filteredProducts);
      setLoading(false);
    };

    fetchData();
  }, [filters]);

  return { products, loading };
};

export default useProducts;

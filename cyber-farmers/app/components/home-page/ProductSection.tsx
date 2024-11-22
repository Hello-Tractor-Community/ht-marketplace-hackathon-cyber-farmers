import useProducts from "@/app/mock-data/useProducts";
import React, { useState } from "react";


const ProductSection = () => {
  const [filters, setFilters] = useState({ condition: "new" }); // Default filter
  const { products, loading } = useProducts(filters);

  const handleFilterChange = (newFilter: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, condition: newFilter }));
  };

  return (
    <div>
      <div className="filters">
        <button onClick={() => handleFilterChange("new")}>New</button>
        <button onClick={() => handleFilterChange("used")}>Used</button>
        <button onClick={() => handleFilterChange("fastMoving")}>
          Fast Moving
        </button>
        {/* Add more buttons */}
      </div>
      <div className="products">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                {/* Render product details */}
                <h3>{product.brandName}</h3>
                <img src={product.image} alt={product.brandName} />
                <p>Price: {product.price}</p>
                <p>Condition: {product.condition}</p>
                <p>Power: {product.power}</p>
                {/* Add 'Add to Cart' and 'Quick Buy' buttons */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default ProductSection ;
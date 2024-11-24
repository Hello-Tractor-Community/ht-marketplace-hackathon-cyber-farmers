import React, { useState } from "react";
import Header from "../Header";
import { Product } from "@/app/mock-data/types/Product";
import { mockProducts } from "@/app/mock-data/products";
import ProductCard from "../productcard";

const products = mockProducts; 
const App: React.FC = () => {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = (productId: string) => {
    setCartCount((prevCount) => prevCount + 1);
    console.log(`Product ${productId} added to cart`);
  };


  return (
    <div>
      <Header cartCount={cartCount} />
      <div className="product-list grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

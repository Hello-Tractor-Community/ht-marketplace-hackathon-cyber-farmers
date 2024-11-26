import React from "react";
import ProductCard from "../ProductCard"
import { ListingWithSeller } from "@/types/Listing";

interface ProductSectionProps {
  products: ListingWithSeller[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ products }) => {
  const addToCart = (listingId: number) => {
    console.log(`Added product ${listingId} to cart`);
    // Implement actual cart functionality here
  };

  return (
    <div className="px-4 py-14 bg-bg-clr flex flex-col items-center text-center">
      {/* Heading */}
      <h2 className="text-primary-clr text-2xl mb-2">Discover</h2>
      <h1 className="font-bold text-3xl mb-11">A world of possibilities</h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 m-2 w-full max-w-[1400px] px-8">
        {products?.map((product) => (
          <ProductCard key={product.id} listing={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductSection;


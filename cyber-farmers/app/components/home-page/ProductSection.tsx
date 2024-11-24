import React, { useState, useMemo } from "react";
import useProducts from "@/app/mock-data/useProducts";
import ProductCard from "../productcard";

const ProductSection: React.FC = () => {
  const [filter, setFilter] = useState("new"); // Default filter

  // Memoize the filters object to ensure stability
  const filters = useMemo(() => ({ condition: filter }), [filter]);

  const { products, loading } = useProducts(filters);

  return (
    <div className="px-4 py-14 bg-bg-clr flex flex-col items-center text-center">
      {/* Heading */}
      <h2 className="text-primary-clr text-2xl mb-2">Discover</h2>
      <h1 className="font-bold text-3xl mb-11">A world of possibilities</h1>

      {/* Filters */}
      <div className="filters flex flex-wrap gap-4 mb-6 justify-center items-center">
        {["new", "used", "fastMoving", "location", "under1m"].map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-5 py-2 rounded-xl border border-primary-clr text-primary-clr font-semibold ${
              filter === filterType ? "text-white bg-primary-clr" : "border-primary-clr"
            } hover:border-white`}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1).replace(/([A-Z])/g, " $1")}
          </button>
        ))}
        <button className="sm:right-[50px] px-5 py-2 rounded-xl font-semibold border-2 border-black hover:border-white">
          Shop All
        </button>
      </div>

      {/* Products */}
      <div className="products w-full flex justify-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 m-2 w-full max-w-[1400px] px-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSection;

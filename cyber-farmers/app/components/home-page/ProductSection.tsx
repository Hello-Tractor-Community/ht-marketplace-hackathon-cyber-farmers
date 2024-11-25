import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Ensure router is used properly
import useProducts from "@/app/mock-data/useProducts";
import ProductCard from "../productcard";

interface ProductSectionProps {
  addToCart: (listingId: number) => void;
}

const ProductSection: React.FC<ProductSectionProps> = ({ addToCart }) => {
  const [filter, setFilter] = useState({ isNew: true, under1M: false, location: "all" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [activeFilter, setActiveFilter] = useState<string>("new"); // Track which filter is active

  const router = useRouter(); 

  const { products, loading } = useProducts(filter, currentPage, itemsPerPage);

  const handleFilterChange = (type: string) => {
    setCurrentPage(1); // Reset pagination when filters change

    // Update the filter state based on the clicked button
    switch (type) {
      case "new":
        setFilter({ ...filter, isNew: true, under1M: false, location: "all" });
        setActiveFilter("new"); // Set active filter
        break;
      case "used":
        setFilter({ ...filter, isNew: false, under1M: false, location: "all" });
        setActiveFilter("used"); // Set active filter
        break;
      case "location":
        setFilter({ ...filter, location: "Nairobi", isNew: true, under1M: false });
        setActiveFilter("location"); // Set active filter
        break;
      case "under1m":
        setFilter({ ...filter, under1M: true, isNew: true, location: "all" });
        setActiveFilter("under1m"); // Set active filter
        break;
      default:
        setFilter({ isNew: true, under1M: false, location: "all" });
        setActiveFilter("new"); // Default active filter
        break;
    }
  };

  return (
    <div className="px-4 py-14 bg-bg-clr flex flex-col items-center text-center">
      <h2 className="text-primary-clr text-2xl mb-2">Discover</h2>
      <h1 className="font-bold text-3xl mb-11">A world of possibilities</h1>

      {/* Filters */}
      <div className="filters flex flex-wrap gap-4 mb-6 justify-center items-center">
        {["new", "used", "location", "under1m"].map((filterType) => (
          <button
            key={filterType}
            onClick={() => handleFilterChange(filterType)}
            className={`px-5 py-2 rounded-xl border ${
              activeFilter === filterType
                ? "bg-primary-clr text-white"
                : "text-primary-clr"
            } hover:border-white`}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="products w-full flex justify-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 m-2 w-full max-w-[1400px] px-8">
            {products.map((listing) => (
              <ProductCard key={listing.id} listing={listing} addToCart={addToCart} />
            ))}
          </div>
        )}
      </div>

      {/* Show All Button */}
      <div className="mt-6">
        <button
          onClick={() => router.push("/products")}
          className="px-6 py-2 bg-primary-clr text-white font-bold rounded-xl"
        >
          Show All
        </button>
      </div>
    </div>
  );
};

export default ProductSection;


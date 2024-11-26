import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ListingWithSeller } from "@/types/Listing";

interface ProductCardProps {
  listing: ListingWithSeller;
  addToCart: (listingId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(function ProductCard({ listing, addToCart }) {
  return (
    <div className="product-card w-full max-w-[300px] bg-white rounded-xl p-5 flex flex-col mx-auto shadow-lg transition-shadow duration-300 cursor-pointer hover:shadow-xl">
      {/* Seller Info */}
      <div className="flex mb-2">
        <div>
          <p className="font-bold">{listing.sellerDetails.firstName}&apos;s Tractors</p>
          <div className="flex justify-between mb-2">
            <p className="text-sm font-bold text-primary-clr">
              {listing.brand}
            </p>
            <p className={`text-sm px-3 rounded-lg ${listing.hours_used === 0 ? "bg-green-500" : "bg-gray-500"} text-white`}>
              {listing.hours_used === 0 ? "New" : "Used"}
            </p>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <p>{listing.hours_used} hours used</p>
            <p>{listing.location}</p>
          </div>
        </div>
      </div>

      {/* Product Image */}
      <div className="mb-4 bg-slate-100 w-full h-[147px] rounded-xl overflow-hidden">
        <Image
          src={listing.image || "/placeholder.svg?height=147&width=300"}
          width={300}
          height={147}
          alt={`Image of ${listing.title}`}
          className="rounded-xl w-full h-full object-cover"
        />
      </div>

      {/* Price and Title */}
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold text-gray-700">
          Price: <span className="text-primary-clr font-bold">Ksh {Number(listing.price).toLocaleString()}</span>
        </p>
        <p className="text-sm text-primary-clr font-semibold truncate">
          {listing.title}
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => addToCart(listing.id)}
          className="px-4 py-2 font-semibold border border-primary-clr text-primary-clr rounded-lg text-sm hover:bg-primary-clr hover:text-white"
        >
          Add to cart
        </button>
        <Link
          href={`/product/${listing.id}`}
          className="px-4 py-2 bg-primary-clr text-white rounded-lg text-sm font-semibold hover:bg-white hover:text-primary-clr hover:border border-primary-clr"
        >
          Quick Buy
        </Link>
      </div>
    </div>
  );
});

export default ProductCard;


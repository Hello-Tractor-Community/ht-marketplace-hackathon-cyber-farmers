import React from "react";
import Link from "next/link";
import { Listing } from "../hello_interfaces";
import Image from "next/image";

interface ProductCardProps {
  listing: Listing;
  addToCart: (listingId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({ listing, addToCart }) => {
  return (
    <div className="product-card w-full max-w-[300px] h-auto bg-white rounded-xl p-5 flex flex-col mx-auto shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
      {/* Seller Info */}
      <div className="flex mb-2">
        <div>
          <p className="font-bold">{listing.seller.firstName}'s Tractors</p>
          <div className="flex justify-between mb-2">
            <p className="text-sm font-bold text-primary-clr">
              {listing.specification?.horsepower ? `${listing.specification.horsepower} HP` : "HP not available"}
            </p>
            <p className="text-sm bg-primary-clr text-white px-3 rounded-lg">
              {listing.hoursUsed === 0 ? "New" : "Used"}
            </p>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <p>{listing.age} years</p>
            <p>{listing.hoursUsed} hours used</p>
            <p>{listing.location}</p>
          </div>
        </div>
      </div>

      {/* Product Image */}
      <div className="mb-4 bg-slate-100 w-full h-[147px] rounded-xl">
        <Image
          src={listing.images[0]}
          width={500}
          height={500}
          alt={`Image of ${listing.title}`}
          className="rounded-xl w-full h-full object-cover"
        />
      </div>

      {/* Price and Reviews */}
      <div className="flex justify-between">
        <p className="text-sm font-semibold text-slate-300">
          Price: <span className="text-primary-clr font-bold">Ksh {listing.price.toLocaleString()}</span>
        </p>
        <p className="text-primary-clr font-semibold">{listing.reviews.length} Reviews</p>
      </div>

      {/* Actions */}
      <div className="flex justify-between mt-2">
        <button
          onClick={() => addToCart(listing.id)}
          className="px-4 py-2 font-semibold border border-primary-clr text-primary-clr rounded-lg text-sm hover:bg-primary-clr hover:text-white"
        >
          Add to cart
        </button>
        <Link
          href={`/product/${listing.id}`}
          className="px-4 py-2 border font-semibold bg-primary-clr text-white rounded-lg text-sm hover:text-primary-clr hover:bg-white hover:border-primary-clr"
        >
          Quick Buy
        </Link>
      </div>
    </div>
  );
});

export default ProductCard;

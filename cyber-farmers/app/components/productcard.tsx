import React from "react";
import Link from "next/link";
import { Product } from "../mock-data/types/Product";

interface ProductCardProps {
  product: Product;
  addToCart: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product, addToCart }) => {
  return (
    <div className="product-card w-full max-w-[300px] h-auto bg-white rounded-xl p-5 flex flex-col mx-auto shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
      {/* Logo and Brand */}
      <div className="flex mb-2">
        <img
          src={product.logo}
          alt={product.brandName}
          className="rounded object-cover w-[88px] h-[66px] mr-3"
        />
        <div>
          <p className="font-bold">{product.wd} Tractors</p>
          <div className="flex justify-between mb-2">
            <p className="text-sm font-bold text-primary-clr">{product.power}</p>
            <p className="text-sm bg-primary-clr text-white px-3 rounded-lg">{product.condition}</p>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <p>{product.age}</p>
            <p>{product.miles}</p>
            <p>{product.location}</p>
          </div>
        </div>
      </div>

      {/* Product Image */}
      <div className="mb-4 bg-slate-100 w-full h-[147px] rounded-xl">
        <img
          src={product.image}
          alt={product.brandName}
          className="rounded-xl w-full h-full object-cover"
        />
      </div>

      {/* Price and Reviews */}
      <div className="flex justify-between">
        <p className="text-sm font-semibold text-slate-300">
          Price: <span className="text-primary-clr font-bold">Ksh {product.price.toLocaleString()}</span>
        </p>
        <p className="text-primary-clr font-semibold">{product.reviews}</p>
      </div>
      
      {/* Actions */}
      <div className="flex justify-between mt-2">
        <button
          onClick={() => addToCart(product.id)}
          className="px-4 py-2 font-semibold border border-primary-clr text-primary-r rounded-lg text-sm hover:bg-primary-clr hover:text-white"
        >
          Add to cart
        </button>
        <Link
          href="/"
          className="px-4 py-2 border font-semibold bg-primary-clr text-white rounded-lg text-sm hover:text-primary-clr hover:bg-white hover:border-primary-clr"
        >
          Quick Buy
        </Link>
      </div>
    </div>
  );
});

export default ProductCard;


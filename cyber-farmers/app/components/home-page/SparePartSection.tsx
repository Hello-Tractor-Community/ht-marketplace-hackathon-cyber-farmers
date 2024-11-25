import React from "react";
import Image from 'next/image';

const Section = () => {
  const products = [
    {
      id: 1,
      name: "L4508 ",
      price: "2,500000",
      power: "75 HP",
      age: "2 years",
      miles: "0 miles",
      location: "Nairobi",
      condition: "New",
      image: "/img/tractor-images/L4508.png",
    },
    {
      id: 2,
      name: "L3408",
      price: "150000",
      power: "15 HP",
      age: "1 year",
      miles: "500 miles",
      location: "Kisumu",
      condition: "Used",
      image: "/img/tractor-images/L3408.png",
    },
    {
      id: 3,
      name: "L3408",
      price: "600000",
      power: "100 HP",
      age: "3 years",
      miles: "2000 miles",
      location: "Mombasa",
      condition: "Used",
      image: "/img/tractor-images/L3408.png",
    },
  ];
  const spares = [
    {
      id:11,
      image: '/img/spares/augers.png',
      name: 'Augers',
      price: '5,000'
    },
    {
      id:22,
      image: '/img/spares/feederhousechain.png',
      name: 'Feeder House Chain',
      price: '4,000'
    },
    {
      id:33,
      image: '/img/spares/bearings.png',
      name: 'Bearings',
      price: '1,000'
    }
  ]

  return (
    <section className="w-full px-4 lg:px-12 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Column 1: Show Featured products. e.g Budget friendly equipment*/}
        <div className="space-y-4">
          <h2 className="text-gray-600 text-lg font-semibold text-primary-clr">Featured Products</h2>
          <h3 className="text-3xl font-bold text-gray-900">The Versatile Kubota L Series</h3>
          <div className="space-y-4">
            {/* Product Cards */}
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center space-x-4 border p-4 rounded-md shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  width={128}
                  height={128}
                  className="w-32 h-32 object-cover rounded"
                />
                <div>
                  <h4 className="text-sm font-medium text-gray-800">{product.name}</h4>
                  <p className="font-bold">4WD Tractors</p>
                 
                  <div className="flex  mb-2">
                    <p className="text-sm font-bold mr-1 text-primary-clr">{product.power}</p>
                    <p className="text-sm bg-primary-clr text-white px-3 rounded-lg">{product.condition}</p>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <p>{product.age}</p>
                    <p>{product.miles}</p>
                    <p>{product.location}</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-300">
                    Price: <span className="text-primary-clr font-bold"> Ksh {product.price.toLocaleString()} </span>
                  </p>
        
                </div>
              </div>
            ))}
          </div>
          <a
            href="#"
            className="text-sm text-primary-clr hover:underline font-semibold"
          >
            View More
          </a>
        </div>

        {/* Column 2: Featured Banner */}
        <div
          className="relative h-[97%] rounded-md overflow-hidden flex  justify-center"
          style={{
            background: "linear-gradient(to bottom, rgba(255,72,34, 0.5), rgba(0, 0, 0, 0)), url('img/bg/tractor-on-field.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-white px-6 my-2 ">
            <h2 className="text-5xl font-bold">Hello, happy farmer!</h2>
            <p className="text-lg mt-2">Get 5% off on your first spares & add-ons purchase.</p>
            <button
              className="mt-4 bg-white text-primary-clr px-6 py-2 rounded-md hover:bg-primary-clr hover:text-white transition-colors"
            >
              Let&apos;s Go
            </button>
          </div>
        </div>

        {/* Column 3: Fast Moving Spares */}
        <div className="space-y-0">
          <h2 className=" text-lg font-semibold text-primary-clr">Fast Moving Spares</h2>
          <h3 className="text-3xl font-bold text-gray-900">Most popular spare parts with high reviews</h3>
          <div className="space-y-4">
            {/* Product Cards */}
            {spares.map((product) => (
              <div
                key={product.id}
                className="flex items-center space-x-4 border p-4 rounded-md shadow-sm hover:shadow-md transition-shadow"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={160}
                  height={144}
                  className=" object-cover rounded"
                />
                <div>
                  <h4 className="text-lg font-medium ">{product.name}</h4>
                  <p className="text-2xl font-semibold text-primary-clr">Price: {product.price}</p>
                  
                </div>
              </div>
            ))}
          </div>
          <a
            href="#"
            className="text-sm text-primary-clr hover:underline font-semibold"
          >
            View More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Section;


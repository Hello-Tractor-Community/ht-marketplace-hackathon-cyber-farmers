import React, { useState } from "react";

const HeroFilter = () => {
  const [filter, setFilter] = useState<"new" | "used">("new");
  const [brand, setBrand] = useState("");
  const [power, setPower] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState([50000, 1000000]);

  const handleSearch = () => {
    // Placeholder for search action.I'll change later on
    console.log({
      filter,
      brand,
      power,
      location,
      priceRange,
    });
    alert("Search functionality triggered!");
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = +e.target.value;
    if (newMin < priceRange[1]) {
      setPriceRange([newMin, priceRange[1]]);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = +e.target.value;
    if (newMax > priceRange[0]) {
      setPriceRange([priceRange[0], newMax]);
    }
  };

  return (
    <div className="bg-black text-white p-8  rounded-xl shadow-lg w-[330px] h-[520px] bg-opacity-70 absolute left-12 bottom-0 ">
      <h1 className="text-3xl font-medium mb-2">Find your next Tractor</h1>
      <p className="text-sm font-light mb-4">
        With over <span className="font-semibold ">120,000</span> tractors in over 20+ locations across Kenya & Tanzania
      </p>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setFilter("new")}
          className={`text-sm font-semibold pb-1 ${
            filter === "new" ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-500"
          }`}
        >
          New
        </button>
        <button
          onClick={() => setFilter("used")}
          className={`text-sm font-semibold pb-1 ${
            filter === "used" ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-500"
          }`}
        >
          Used
        </button>
      </div>

      {/* Brand Input */}
      <select
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="w-full p-1.5 mb-4 border text-slate-700 border-gray-300 rounded-xl"
      >
        <option value="" disabled>
          Brand*
        </option>
        <option value="John Deere">John Deere</option>
        <option value="Kubota">Kubota</option>
        <option value="Massey Ferguson">Massey Ferguson</option>
        {/* Add more options */}
      </select>

      {/* Power Input */}
      <select
        value={power}
        onChange={(e) => setPower(e.target.value)}
        className="w-full p-1.5 mb-4 border text-slate-700 border-gray-300 rounded-xl"
      >
        <option value="" disabled>
          Select Power (HP)
        </option>
        <option value="50-100">50-100 HP</option>
        <option value="101-200">101-200 HP</option>
        <option value="201+">201+ HP</option>
      </select>

      {/* Location Input */}
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full p-1.5 mb-4 border text-slate-700 border-gray-300 rounded-xl"
      >
        <option value="" disabled>
          Location
        </option>
        <option value="Nairobi">Nairobi</option>
        <option value="Mombasa">Mombasa</option>
        <option value="Kisumu">Kisumu</option>
        {/* Add more options */}
      </select>

      {/* Price Range */}
      <div className="mb-8">
        <label className="text-xl font-extralight">Price Range</label>
        <div className="flex justify-between text-xs text-gray-500 mb-3">
          <span>Ksh. {priceRange[0].toLocaleString()}</span>
          <span>Ksh. {priceRange[1].toLocaleString()}</span>
        </div>
        {/* Range slider with two draggable points */}
        <div className="relative w-full mb-2 accent-secondary-clr">
          <input
            type="range"
            min="50000"
            max="1000000"
            value={priceRange[0]}
            step="10000"
            onChange={handleMinPriceChange}
            className="absolute w-full h-1  rounded-full"
          />
          <input
            type="range"
            min="50000"
            max="1000000"
            value={priceRange[1]}
            step="10000"
            onChange={handleMaxPriceChange}
            className="absolute w-full h-1  rounded-full"
          />
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="w-full bg-primary-clr text-white py-1.5 rounded-xl hover:bg-btn-hover-clr transition"
      >
        Search
      </button>
    </div>
  );
};

export default HeroFilter;

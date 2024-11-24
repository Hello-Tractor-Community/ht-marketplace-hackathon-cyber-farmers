import React, { useState } from "react";
import Link from "next/link";

const Header: React.FC = () => {
  const [cartCount, setCartCount] = useState(2); // Placeholder
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "Kenya",
    flag: "/img/flags/kenya.png",
  });

  const countries = [
    { name: "Kenya", flag: "/img/flags/kenya.png" },
    { name: "Tanzania", flag: "/img/flags/Tanzania.png" },
    { name: "Nigeria", flag: "/img/flags/nigeria.png" },
  ];

  const handleCountrySelect = (country: typeof selectedCountry) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-neutral-900 shadow-md p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <img src="/img/Logo/HT_LOGO_RGB_Orange.png" className="w-[180px]" alt="Logo" />
        </Link>

        {/* Actions */}
        <div className="flex items-center space-x-6">
          {/* Seller Button */}
          <Link
            href="/"
            className="bg-primary-clr text-white px-4 py-2 rounded-md hover:bg-btn-hover-clr"
          >
            Become a Seller today
          </Link>

          {/* Country Selector */}
          <div className="relative">
            <div
              className="flex items-center cursor-pointer space-x-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img
                src={selectedCountry.flag}
                alt={selectedCountry.name}
                className="w-6 h-4 rounded"
              />
              <span className="text-sm text-white">{selectedCountry.name}</span>
            </div>

            {isDropdownOpen && (
              <ul className="absolute z-10 mt-2 bg-neutral-800 text-white rounded-md shadow-lg w-40">
                {countries.map((country) => (
                  <li
                    key={country.name}
                    className="flex items-center p-2 hover:bg-primary-clr cursor-pointer"
                    onClick={() => handleCountrySelect(country)}
                  >
                    <img src={country.flag} alt={country.name} className="w-6 h-4 rounded mr-2" />
                    <span>{country.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Cart */}
          <div className="relative">
            <Link href="/cart">
              <p className="text-white">
                🛒
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              </p>
            </Link>
          </div>

          {/* Account Dropdown */}
          <div className="relative">
            <button className="border border-gray-300 rounded-md p-2">
              <img src="/img/icons/profile-icon.png" className="w-6" alt="Profile" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

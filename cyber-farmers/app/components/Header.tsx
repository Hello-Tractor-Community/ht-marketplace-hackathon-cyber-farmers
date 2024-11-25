import React, { useState } from "react";
import Link from "next/link";
import Image from 'next/image';

const Header: React.FC<{ cartCount: number }> = ({ cartCount }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
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
    setIsDropdownOpen(false); // Close the dropdown when a country is selected
  };

  const closeMenus = () => {
    setIsDropdownOpen(false);
    setIsProfileMenuOpen(false);
  };

  return (
    <header className="bg-neutral-900 shadow-md p-4" onClick={closeMenus}>
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/img/Logo/HT_LOGO_RGB_Orange.png"
            className=" w-[hidden sm:block"
            alt="Logo"
            width={180}
            height={180}
          />
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
              onClick={(e) => {
                e.stopPropagation(); // Prevent click from closing the dropdown
                setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
              }}
            >
              <Image
                src={selectedCountry.flag}
                alt={selectedCountry.name}
                className=" rounded"
                width={18}
                height={16}
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
                    <Image
                      src={country.flag}
                      width={18}
                      height={16}
                      alt={country.name}
                      className=" rounded mr-2"
                    />
                    <span>{country.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Cart Icon */}
          <div className="relative hover:scale-105 transition-transform">
            <p className="text-white cursor-pointer">
              🛒
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {cartCount}
              </span>
            </p>
          </div>

          {/* Profile Menu */}
          <div
            className="relative"
            onClick={(e) => {
              e.stopPropagation(); // Prevent click from closing the dropdown
              setIsProfileMenuOpen(!isProfileMenuOpen); // Toggle profile menu visibility
            }}
          >
            <button className="border border-gray-300 rounded-md p-2 hover:bg-gray-700 transition-colors">
              <Image src="/img/icons/profile-icon.png" width={16}
                height={16} alt="Profile" />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 bg-neutral-800 text-white rounded-md shadow-lg w-40">
                <div className="p-4">
                  <p className="font-bold">User Name</p>
                  <p className="text-sm text-gray-400">user@example.com</p>
                </div>
                <hr className="border-gray-600" />
                <ul>
                  <li className="p-2 hover:bg-primary-clr cursor-pointer">
                    <Link href="/profile">Profile</Link>
                  </li>
                  <li className="p-2 hover:bg-primary-clr cursor-pointer">
                    <Link href="/settings">Settings</Link>
                  </li>
                  <li className="p-2 hover:bg-primary-clr cursor-pointer">
                    <Link href="/orders">Orders</Link>
                  </li>
                  <li className="p-2 hover:bg-primary-clr cursor-pointer">
                    <Link href="/logout">Logout</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


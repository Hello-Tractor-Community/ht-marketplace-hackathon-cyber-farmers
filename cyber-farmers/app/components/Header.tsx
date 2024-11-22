import React from 'react';
import Link from 'next/link';
import { useState } from 'react';


const Header: React.FC = () => {
  const [cartCount, setCartCount] = useState(2); // to be replaced with dynamic data later
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "Kenya",
    flag: "/img/flags/kenya.png",
    
  });

  const countries = [
    {
      name: "Ken",
      flag: "/img/flags/kenya.png",
      
    },
    {
      name: "Tz",
      flag: "/img/flags/Tanzania.png",
      
    },
    {
      name: "Ng",
      flag: "/img/flags/nigeria.png",
      
    },
  ];
  const handleCountrySelect = (country: typeof selectedCountry) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };
  return (
    <header className="bg-neutral-900 shadow-md p-0 ">
      <div className="container mx-auto px-4 py-0 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <img src='/img/Logo/HT_LOGO_RGB_Orange.png' className='w-[200px]' alt='logo'></img>
        </Link>
        
        <div className='relative flex ver-txt justify-between items-center space-x-12 '>
          {/* Seller's Button*/}
          <div className="flex flex-1  ">
            
            <Link href='/' className=" bg-primary-clr text-white  px-4 py-2 rounded-md hover:bg-btn-hover-clr">
              Become a Seller today
            </Link>
          </div>

          {/* Country Selector */}
          <div className="relative flex justify-between items-center">
            {/* Selected Country */}
              <div
                className="flex items-center space-x-2 p-2  cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                title="Choose country"
              >
                <img
                  src={selectedCountry.flag}
                  alt={selectedCountry.name}
                  className="w-6 h-4 object-cover rounded-sm"
                />
                <span className="text-sm font-medium"></span>
                <img src="/" alt="" />
              </div>

                    
                 

              {/* Cart */}
              <div className="relative mx-4">
                    <Link href="/">
                      <p className="text-gray-700">
                        🛒 
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                          {cartCount}
                        </span>
                      </p>
                    </Link>
              </div>
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <ul className="absolute z-10 mt-44 rounded-lg text-white  bg-opacity-35 p-0  bg-black shadow-md ">
                  {countries.map((country) => (
                    <li
                      key={country.name}
                      className="flex items-center p-3 rounded-md  hover:bg-btn-hover-clr hover:text-white cursor-pointer"
                      onClick={() => handleCountrySelect(country)}
                    >
                      <img
                        src={country.flag}
                        alt={country.name}
                        className="w-6 h-4 object-cover rounded-sm mr-2"
                      />
                      <span className="text-sm font-medium flex-1">{country.name}</span>
                     
                    </li>
                  ))}
                </ul>
              )}
          </div>
          {/* Account Dropdown */}
          <div className="relative">
            <button className="border border-gray-300 text-white rounded-md px-3 py-2">
              <img src="/img/icons/profile-icon.png" className='w-[20px]' alt="" />
            </button>
          </div>

        </div>

      </div>
    </header>
  );
};

export default Header;
import React, { useState, useEffect } from "react";
import Link from "next/link";

const NavBar = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  // This closes the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event.target.closest('.categories-menu') && !event.target.closest('.menu-toggle')) {
        setIsCategoriesOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex items-center p-2 bg-primary-clr text-white">
      {/* All Categories Button */}
      <div className="flex items-center justify-between space-x-2 mr-12 lg:mr-24">
        <div
          className="flex items-center cursor-pointer space-x-2 menu-toggle"
          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
        >
          <img src="/img/icons/menu.png" alt="hamburger-icon" className="w-5" />
          <h1 className="text-base font-semibold">All Categories</h1>
        </div>

        {/* Dropdown Menu for small screens */}
        {isCategoriesOpen && (
          <div className="categories-menu absolute top-36 left-0 w-64 bg-black  rounded-md shadow-lg mt-2 p-4 z-50 bg-opacity-85">
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-orange-600 text-sm font-medium">
                  Become a Seller
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-orange-600 text-sm font-medium">
                  Log In/Sign Up
                </Link>
              </li>
              <li>
                <Link href="/dealers" className="hover:text-orange-600 text-sm font-medium">
                  Dealers
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-orange-600 text-sm font-medium">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-orange-600 text-sm font-medium">
                  Help
                </Link>
              </li>
            </ul>
            {/* Main Navigation Links Inside Dropdown for small screens */}
            <ul className="space-y-3 mt-4">
              <li>
                <Link href="/" className="hover:text-orange-600 text-sm font-medium">
                  Tractor
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-orange-600 text-sm font-medium">
                  Tractor Add-ons
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-orange-600 text-sm font-medium">
                  Farm Equipment
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-orange-600 text-sm font-medium">
                  Deals
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-600 text-sm font-medium">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-600 text-sm font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-600 text-sm font-medium">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Main Nav Links (Hidden on smaller screens, visible only on large screens) */}
      <div className="hidden lg:flex space-x-12 items-center font-semibold">
        <Link href="/" className="font-bold text-lg hover:text-btn-hover-clr">Tractor</Link>
        <Link href="/" className="hover:text-btn-hover-clr">Tractor Add-ons</Link>
        <Link href="/cart" className="hover:text-btn-hover-clr">Farm Equipment</Link>
        <Link href="/admin" className="hover:text-btn-hover-clr">Deals</Link>
        <Link href="#" className="hover:text-btn-hover-clr">Blog</Link>
        <Link href="#" className="hover:text-btn-hover-clr">About Us</Link>
        <Link href="#" className="hover:text-btn-hover-clr">Contact Us</Link>
      </div>
    </nav>
  );
};

export default NavBar;

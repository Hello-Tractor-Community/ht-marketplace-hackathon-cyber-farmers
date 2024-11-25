"use client";
import "./globals.css";
import React, { useState, useCallback } from "react";
import SparePartSection from './components/home-page/SparePartSection';
import Header from './components/Header';
import HeroSection from './components/home-page/HeroSection';
import NavBar from './components/NavBar';
import CategorySection from "./components/home-page/CategorySection";
import ProductSection from './components/home-page/ProductSection';
import NewsletterSection from "./components/home-page/NewsLetterSection";
import Footer from "./components/Footer";
import useProducts from "@/app/mock-data/useProducts";
import { Listing } from "./hello_interfaces";

const HomePage = () => {
  const [cart, setCart] = useState<Listing[]>([]);

  // Default filter values
  const filters = {
    isNew: true,        // Default filter to show only new products
    under1M: false,     // No price filter by default
    location: "all",    // All locations
  };

  const currentPage = 1;    // Default page 1
  const itemsPerPage = 8;   // Show 8 products per filter criteria

  const { products, loading } = useProducts(filters, currentPage, itemsPerPage);

  const handleAddToCart = useCallback(
    (productId: number) => {
      const product = products.find((prod) => prod.id === productId);
      if (product) {
        const isAlreadyInCart = cart.some((item) => item.id === productId);
        if (!isAlreadyInCart) {
          setCart((prevCart) => [...prevCart, product]);
        }
      }
    },
    [products, cart]
  );

  return (
    <div>
      <Header cartCount={cart.length} />
      <NavBar />
      <HeroSection />
      <CategorySection />
      <ProductSection addToCart={handleAddToCart} />
      <SparePartSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default HomePage;


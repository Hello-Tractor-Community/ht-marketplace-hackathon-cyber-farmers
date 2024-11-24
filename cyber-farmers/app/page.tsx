"use client";
import "./globals.css";
import React, { useState } from "react";

import SparePartSection from './components/home-page/SparePartSection'
import Header from './components/Header';
import HeroSection from './components/home-page/HeroSection';
import NavBar from './components/NavBar';
import CategorySection from "./components/home-page/CategorySection";
//import FeaturedBrands from '../components/home/FeaturedBrands';
import ProductSection from './components/home-page/ProductSection';
import NewsletterSection from "./components/home-page/NewsLetterSection";
import Footer from "./components/Footer";
import ProductCard from "./components/productcard";
import { Product } from "@/app/mock-data/types/Product";
import { mockProducts } from "@/app/mock-data/products";

const HomePage = () => {
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState<Product[]>([]); // State to hold cart products

  const handleAddToCart = (productId: string) => {
    const product = mockProducts.find((prod) => prod.id === productId);
    if (product) {
      setCart((prevCart) => [...prevCart, product]);
      setCartCount((prevCount) => prevCount + 1);
      console.log(`Product ${product.brandName} added to cart`);
    }
  };
  return (
    <div>
      <Header cartCount={cartCount} />
      <NavBar />
      <HeroSection />
      <CategorySection />
      <ProductSection />
      <SparePartSection />
      <NewsletterSection />
      <Footer />
    </div>


  );  
};

export default HomePage;

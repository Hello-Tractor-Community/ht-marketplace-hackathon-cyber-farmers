"use client";
import "./globals.css";

import SparePartSection from './components/home-page/SparePartSection'
import Header from './components/Header';
import HeroSection from './components/home-page/HeroSection';
import NavBar from './components/NavBar';
import CategorySection from "./components/home-page/CategorySection";
//import FeaturedBrands from '../components/home/FeaturedBrands';
import ProductSection from './components/home-page/ProductSection';
import NewsletterSection from "./components/home-page/NewsLetterSection";
import Footer from "./components/Footer";
const HomePage = () => {
  return (
    <div>
      <Header />
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

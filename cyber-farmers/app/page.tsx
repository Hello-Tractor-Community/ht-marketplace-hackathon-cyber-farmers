"use client";
import "./globals.css";


import Header from './components/Header';
import HeroSection from './components/home-page/HeroSection';
import NavBar from './components/NavBar';
import CategorySection from "./components/home-page/CategorySection";
//import FeaturedBrands from '../components/home/FeaturedBrands';
import ProductSection from './components/home-page/ProductSection';

const HomePage = () => {
  return (
    <div>
      <Header />
      <NavBar />
      <HeroSection />
      <CategorySection />
      <ProductSection />
    </div>


  );
};

export default HomePage;

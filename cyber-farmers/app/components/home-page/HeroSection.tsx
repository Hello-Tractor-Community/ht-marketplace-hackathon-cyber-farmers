import React from 'react';
import HeroFilter from "./HeroFilter";
const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-cover bg-center  " >
      <div className=" relative h-[600px] flex bg-cover bg-center " style={{ backgroundImage: "url('/img/bg/hero-section-bg.png')" }}>
        
          <HeroFilter />
        
      </div>
      
    </section>
  );
};

export default HeroSection;
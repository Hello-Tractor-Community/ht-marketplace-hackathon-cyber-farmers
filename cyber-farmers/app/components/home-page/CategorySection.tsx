import React from 'react';
import Image from 'next/image';

const categories = [
  { name: 'Tractors', src: '/img/icons/Tractor.png' },
  { name: 'Spare parts', src: '/img/icons/spare-parts.png' },
  { name: 'Add-ons', src: '/img/icons/add-on.png' },
  { name: 'Farm equipment', src: '/img/icons/farm-equip.png' },
];

const CategorySection = () => {
  return (
    <section
      className="bg-cover bg-center"
      style={{ backgroundImage: "url('/img/bg/hellotractorpattern.png')" }}
    >
      <div className="bg-white bg-opacity-50 h-full">
        <h2 className="text-center text-2xl font-bold mb-6 pt-12 pb-2">
          Shop by category
        </h2>
        <div className="flex flex-wrap justify-center items-center pb-8 space-x-8 md:space-x-32">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex flex-col items-center mb-6 sm:mb-0"
            >
              <div className="bg-primary-clr p-5 items-center rounded-full">
                <Image
                  src={category.src}
                  alt={category.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 sm:w-20 sm:h-20"
                />
              </div>
              <span className="mt-2 text-primary-clr font-semibold text-sm sm:text-base">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

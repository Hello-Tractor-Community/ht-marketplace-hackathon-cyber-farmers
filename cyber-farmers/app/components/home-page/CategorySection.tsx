import React from 'react';

const categories = [
  { name: 'Tractors', src: '/img/icons/Tractor.png' },
  { name: 'Spare parts', src: '/img/icons/spare-parts.png' },
  { name: 'Add-ons', src: '/img/icons/add-on.png' },
  { name: 'Farm equipment', src: '/img/icons/farm-equip.png' },
];

const CategorySection = () => {
  return (
    <section className="  " style={{ backgroundImage: "url('/img/bg/hellotractorpattern.png')" }}>
      <div className='bg-white bg-opacity-50  h-full'>
      <h2 className="text-center text-2xl  font-bold mb-6 pt-12 pb-2">Shop by category</h2>
      <div className="flex justify-center items-center pb-8 space-x-32">
        {categories.map((category) => (
          <div key={category.name} className="flex flex-col items-center ">
            <div className=" bg-primary-clr p-5  items-center rounded-full">
                <img src={category.src} alt={category.name} />
            </div>
            <span className="mt-2 text-primary-clr font- font-semibold">{category.name}</span>
            
          </div>
        ))}
      </div>
      </div>
      
    </section>
  );
};

export default CategorySection;

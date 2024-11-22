'use client';

import { CldImage } from 'next-cloudinary';

export default function Home() {
  console.log('Home');
  return (
    <div className='container'>
      <h1>Cloudinary Image in Next.js with CldImage</h1>
      <CldImage
        src='media/cyberFarmers/8943ba0de16ed09560b83289fd89aa89.jpg'
        width='500'
        height='500'
        alt='Cyber Farmers Image'
        crop='scale'
        priority
      />
    </div>
  );
}

import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="flex items-center p-2 bg-primary-clr  text-white  ">
      <div className='h-4 flex space-x-2 mr-28 justify-between items-center '>
        <img src="/img/icons/menu.png" alt="hamburger-icon" className='w-4'/>
        <h1 className="text-base font-semibold">All Categories</h1>
      </div>
      
      <div className="flex space-x-12 items-center ml-24 font-semibold  ">
        <Link href="/" className='font-bold text-lg hover:text-btn-hover-clr '>Tractor</Link>
        <Link href="/" className='hover:text-btn-hover-clr  '>Tractor Add-ons</Link>
        <Link href="/cart" className='hover:text-btn-hover-clr '>Farm Equipment</Link>
        <Link href="/admin" className='hover:text-btn-hover-clr '>Deals</Link>
        <Link href="#" className='hover:text-btn-hover-clr '>Blog</Link>
        <Link href="#" className='hover:text-btn-hover-clr '>About Us</Link>
        <Link href="#" className='hover:text-btn-hover-clr '>Contact Us</Link>
      </div>
    </nav>
  );
};

export default NavBar;

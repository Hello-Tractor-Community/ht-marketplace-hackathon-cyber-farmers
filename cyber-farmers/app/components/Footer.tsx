const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start space-y-8 lg:space-y-0">
            {/* Left Section */}
            <div className="flex-1">
              <img src="img/Logo/HT_LOGO_RGB_Orange.png" alt="Hello Tractor Logo" className="mb-4 w-[180px]" />
              <p className="text-sm leading-relaxed">
                Hello Tractor connects global buyers and sellers of second-hand tractors and agricultural implements.
              </p>
            </div>
  
            {/* Right Section */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Navigation Links */}
              <div>
                <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/" className="hover:text-orange-600">Home</a></li>
                  <li><a href="/about" className="hover:text-orange-600">About Us</a></li>
                  <li><a href="/contact" className="hover:text-orange-600">Contact</a></li>
                  <li><a href="/services" className="hover:text-orange-600">Services</a></li>
                  <li><a href="/blog" className="hover:text-orange-600">Blog</a></li>
                </ul>
              </div>
  
              {/* Secondary Links */}
              <div>
                <h3 className="text-lg font-bold mb-4">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/faq" className="hover:text-orange-600">FAQ</a></li>
                  <li><a href="/privacy-policy" className="hover:text-orange-600">Privacy Policy</a></li>
                  <li><a href="/become-a-seller" className="hover:text-orange-600">Become a Seller</a></li>
                  <li><a href="/terms" className="hover:text-orange-600">Terms</a></li>
                </ul>
              </div>
  
              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="tel:+1234567890" className="hover:text-orange-600">Phone: +123 456 7890</a>
                  </li>
                  <li>
                    <a href="mailto:support@hellotractor.com" className="hover:text-orange-600">Email: support@hellotractor.com</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
  
          {/* Bottom Section */}
          <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col sm:flex-row justify-between items-center text-sm">
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/twitter.svg" alt="Twitter" className="w-6 h-6 hover:opacity-75" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-6 h-6 hover:opacity-75" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/instagram.svg" alt="Instagram" className="w-6 h-6 hover:opacity-75" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/facebook.svg" alt="Facebook" className="w-6 h-6 hover:opacity-75" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/youtube.svg" alt="YouTube" className="w-6 h-6 hover:opacity-75" />
              </a>
            </div>
  
            {/* Footer Credits */}
            <p className="mt-4 sm:mt-0">
              Designed and developed by <strong>XXXX</strong> for Hello Tractor
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  
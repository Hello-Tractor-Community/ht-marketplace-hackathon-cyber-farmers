const NewsletterSection = () => {
    return (
      <div
        className="relative bg-cover bg-center h-72 py-12 px-4 sm:px-8"
        style={{
          backgroundImage: "linear-gradient(to left, rgba(255,72,34, 0.5), rgba(0, 0, 0, 0)), url('img/bg/tractor-cultivating-field.png')", 
        }}
      >
        <div className="absolute right-0 top-0  h-full w-full  z-10 opacity-90 text-white rounded-md p-8 max-w-4xl mx-auto text-center"
        style={{
          backgroundImage: "linear-gradient(to left, rgba(255,72,34, 8), rgba(0, 0, 0, 0))", 
        }}
        >

        </div>
        <div className="absolute right-0  h-full w-full  z-20 bg-opacity-0 text-white  rounded-md p-8 max-w-4xl mx-auto justify-end items-end text-center">
          <h2 className="text-3xl font-bold mb-2">Join our Newsletter today</h2>
          <p className="mb-6 font-semibold text-xl ">Get 5% off when you register for our newsletter</p>
          <form className="flex justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 p-2 rounded-l-md border-none focus:outline-none text-gray-800"
            />
            <button
              type="submit"
              className="bg-black text-white font-semibold px-4 py-2 rounded-r-md hover:bg-orange-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default NewsletterSection;
  
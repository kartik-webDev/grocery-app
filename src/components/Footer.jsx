import React from "react";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-700 bg-blue-200 mt-24">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
        {/* Brand Text */}
        <div className="md:max-w-96">
          <h1 className="text-3xl font-bold text-indigo-700">GroceryStore</h1>
          <p className="mt-4 text-sm text-gray-600">
            Your trusted online grocery destination. We bring fresh produce, quality essentials, and unbeatable deals right to your doorstep.  
          </p>
        </div>

        {/* Links Section */}
        <div className="flex-1 flex items-start md:justify-end gap-20">
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-indigo-500">Home</a></li>
              <li><a href="#" className="hover:text-indigo-500">About us</a></li>
              <li><a href="#" className="hover:text-indigo-500">Contact us</a></li>
              <li><a href="#" className="hover:text-indigo-500">Privacy policy</a></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p className="hover:text-indigo-500">+1-212-456-7890</p>
              <p className="hover:text-indigo-500">contact@grocerystore.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <p className="pt-4 text-center text-xs md:text-sm pb-5 text-gray-600">
        Copyright 2024 © GroceryStore. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
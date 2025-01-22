import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#eb1414] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-lg font-bold text-white">
              BrandName
            </a>
          </div>

          {/* Menu for larger screens */}
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="hover:text-gray-300">
              About
            </a>
            <a href="#features" className="hover:text-gray-300">
              Features
            </a>
            <a href="#pricing" className="hover:text-gray-300">
              Pricing
            </a>
          </div>

          {/* Buttons */}
          <div className="hidden md:flex space-x-4">
            <a
              href="/login"
              className="bg-transparent border border-gray-500 px-4 py-2 rounded hover:bg-gray-700"
            >
              Login
            </a>
            <a
              href="/signup"
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
            >
              Sign Up
            </a>
          </div>

          {/* Hamburger Icon for mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-700">
          <div className="space-y-1 px-4 pb-4">
            <a
              href="#about"
              className="block text-gray-200 hover:bg-gray-600 px-3 py-2 rounded"
            >
              About
            </a>
            <a
              href="#features"
              className="block text-gray-200 hover:bg-gray-600 px-3 py-2 rounded"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="block text-gray-200 hover:bg-gray-600 px-3 py-2 rounded"
            >
              Pricing
            </a>
            <div className="flex flex-col space-y-2">
              <a
                href="/login"
                className="block bg-gray-500 px-3 py-2 text-center rounded hover:bg-gray-600"
              >
                Login
              </a>
              <a
                href="/signup"
                className="block bg-blue-600 px-3 py-2 text-center rounded hover:bg-blue-500"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

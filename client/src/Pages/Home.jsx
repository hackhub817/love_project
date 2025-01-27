import React from "react";
import { Heart } from "lucide-react";
import homebg from "../assets/home/homebg.png";
import umbrella from "../assets/home/umbrella.png";
import sitting from "../assets/home/sitting.png";
import click from "../assets/home/click.png";

import footer from "../assets/home/footer.png";
export const Home = () => {
  return (
    <>
      {/* Font Import */}
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Playpen+Sans:wght@100..800&display=swap');
      </style>

      <div className="relative min-h-screen bg-pink-100 font-['Playpen_Sans']">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url(${homebg})`,
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 ">
          {/* Navigation Bar */}
          <nav className="p-4 flex justify-end lg:space-x-8 space-x-4 bg-[#ffc2c9] text-black font-light">
            <a href="#" className="flex items-center md:text-base  text-[12px]">
              <Heart className="md:w-4 md:h-4 w-2 h-2 mr-1" /> About
            </a>
            <a href="#" className="flex items-center text-[12px] lg:text-base">
              <Heart className="md:w-4 md:h-4 w-2 h-2 mr-1" /> Privacy Policy
            </a>
            <a href="#" className="flex items-center text-[12px] lg:text-base">
              <Heart className="md:w-4 md:h-4 w-2 h-2 mr-1 " /> Login
            </a>
          </nav>

          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-shadow-pinkGlow container  px-4 md:pt-12 pt-10 pb-10 ">
            <h1 className="md:text-5xl text-xl font-bold   mb-4">
              Welcome to
              <br />
              Your Dream Website
            </h1>
            <p className="text-xs md:text-lg w-60 md:w-1/2 text-pink-600 mb-6 leading-4">
              Create memorable experiences with a unique, personalized touch.
              Our platform helps you make every day special and stand out.
            </p>
            <div className="flex justify-start md:gap-4 gap-2 md:mb-12 mb-4">
              <button className="bg-pink-400 border border-pink-600 text-white md:px-6 md:py-2 px-4 py-2 rounded-full md:text-lg text-xs hover:bg-pink-500">
                Get Started
              </button>
              <button className="border border-pink-600 bg-white/80 text-pink-500 md:px-6 md:py-2 md:text-lg text-xs px-4 py-2 rounded-full hover:bg-white">
                How it works
              </button>
            </div>
          </div>

          {/* Gift Section with Characters */}
          <div className="mb-6 p-1 max-w-4xl mx-auto relative">
            <div className="flex items-center justify-center relative">
              {/* Text Section */}
              <div className="relative z-10 md:w-auto w-52">
                <h2 className="md:text-3xl text-[10px] font-bold text-black bg-[#ffc2c9] p-2 rounded-2xl mb-4 md:p-4">
                  Say Goodbye to Boring Gifts!
                </h2>
                <p className="text-[10px] md:text-xl md:w-1/2 w-44 text-black mb-6">
                  Surprise your BF or GF with unique digital designs. Get ready
                  and spread the love. Make every moment special with a gift
                  that truly stands out!
                </p>
              </div>
              {/* Image Section */}
              <div className="relative -ml-8 -mt-4 z-10">
                <img
                  src={umbrella}
                  alt=""
                  className="md:h-72 md:w-96 h-40 w-40"
                />
              </div>
            </div>
          </div>

          <div className="lg:-mt-10 max-w-4xl mx-auto relative w-full lg:px-4 px-1 ">
            {/* Button with Arrow */}
            <div className="flex items-center gap-4">
              <button className="bg-pink-500 text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-pink-600">
                Watch Demo Here
              </button>
              {/* Curved Arrow */}
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 200 100"
                  className="h-16 w-16"
                >
                  <path
                    d="M10,60 C50,10 150,10 190,50"
                    stroke="black"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrowhead)"
                  />
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="7"
                      refX="10"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon points="0 0, 10 3.5, 0 7" fill="black" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Heart Items */}
            <div className="flex  lg:space-x-4 space-x-1 ">
              {["Vrushika", "Darshan", "Triggered Insaan"].map(
                (name, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-white bg-opacity-30 rounded-full md:px-4 md:py-2 px-3  shadow-md hover:shadow-lg transition-all"
                  >
                    <span className="text-pink-500 text-base md:text-xl md:mr-2 mr-[1px]">
                      ❤️
                    </span>
                    <span className="text-black text-xs  lg:text-sm font-medium">
                      {name}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Feature Icons Section */}
          <div className="container mx-auto md:px-4 px-1">
            <div className=" my-8">
              <div className="bg-[#ffc2c9] flex items-center justify-center">
                <img src={sitting} alt="" className="h-10 w-16" />
                <div className="md:text-2xl font-light  text-[10px] text-black">
                  Now let's make your Valentine's Week Special
                </div>
              </div>
            </div>
            <div className="flex md:py-2 md:gap-2 items-center justify-center">
              <div className="bg-white bg-opacity-30 flex items-center gap-1 py-2 px-4 md:py-3 md:px-6 border border-pink-600 rounded-2xl">
                <div className="text-base md:text-2xl ">
                  Let's bring love to life online
                </div>
                <img
                  src={click}
                  alt=""
                  className="md:h-9 md:w-10 h-7 w-7 mt-2"
                />
              </div>
            </div>
          </div>
          <div>
            <img src={footer} alt="" className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
};

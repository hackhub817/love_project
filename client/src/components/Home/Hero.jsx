import React, { useEffect, useState } from "react";
import img1 from "../../assets/home/1.jpg";
import img2 from "../../assets/home/2.jpg";
import img3 from "../../assets/home/3.jpg";
import img4 from "../../assets/home/4.jpg";

const HeroSection = () => {
  // Array of images
  const images = [img1, img2, img3, img4];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="h-[90vh] text-white flex items-center relative overflow-hidden">
      {/* Background image slider */}
      <div className="absolute inset-0 w-full h-full">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${img})`,
            }}
          ></div>
        ))}
      </div>

      {/* Black overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Content */}
          <div className="text-center md:text-left md:w-1/2 space-y-6">
            <h1 className="text-2xl sm:text-5xl font-bold leading-tight">
              Welcome to Your Dream Website
            </h1>
            <p className="lg:text-lg text-base sm:text-xl">
              Create memorable experiences with a unique, personalized touch.
              Our platform helps you make every day special and stand out.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="#get-started"
                className="bg-white text-[#eb1414] px-6 py-3 rounded font-medium hover:bg-gray-200"
              >
                Get Started
              </a>
              <a
                href="#learn-more"
                className="border border-white text-sm lg:px-6 lg:py-3 px-2 pt-3 rounded font-medium hover:bg-white hover:text-[#eb1414]"
              >
                How it work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

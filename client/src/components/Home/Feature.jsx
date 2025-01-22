import React from "react";
import { FaRocket, FaLaptopCode, FaUserFriends } from "react-icons/fa";

const FeaturesSection = () => {
  return (
    <section className=" text-white py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-red-600">
            Why Choose Us?
          </h2>
          <p className="text-lg sm:text-xl">
            Explore the features that make our platform stand out and deliver an
            amazing user experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center p-6 bg-white text-[#eb1414] rounded-lg shadow-lg hover:scale-105 transition-transform">
            <div className="mb-4 text-6xl">
              <FaRocket />
            </div>
            <h3 className="text-2xl font-bold mb-2">Fast Performance</h3>
            <p>
              Experience blazing-fast speeds with our optimized platform,
              ensuring seamless navigation and interactions.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center p-6 bg-white text-[#eb1414] rounded-lg shadow-lg hover:scale-105 transition-transform">
            <div className="mb-4 text-6xl">
              <FaLaptopCode />
            </div>
            <h3 className="text-2xl font-bold mb-2">Modern Technology</h3>
            <p>
              Built with cutting-edge tools and technologies to provide you with
              the most advanced features.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center p-6 bg-white text-[#eb1414] rounded-lg shadow-lg hover:scale-105 transition-transform">
            <div className="mb-4 text-6xl">
              <FaUserFriends />
            </div>
            <h3 className="text-2xl font-bold mb-2">User-Centric Design</h3>
            <p>
              Every feature is designed with the user in mind, offering an
              intuitive and enjoyable experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

import React from "react";
import Gravity, { MatterBody } from "../fancy/gravity";

const GiftSection = () => {
  return (
    <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 ">
      <div className="grid lg:grid-cols-2 grid-cols-1  h-screen md:flex-row items-center  lg:p-6 sm:p-6 p-2 ">
        {/* Content Section */}
        <div className="p-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-4">
            Say Goodbye to Boring Gifts!
          </h1>

          <p className="text-2xl font-semibold text-gray-700 mb-6">
            Surprise your BF or GF with unique digital delights – heartfelt and
            unforgettable. Make every moment special with a gift that truly
            stands out!
          </p>
          <button className="px-6 py-3 bg-indigo-600 text-white font-medium text-lg rounded-full shadow-md hover:bg-indigo-700 transition duration-300">
            Watch Demo from below <span className="ml-2">&#8595;</span>
          </button>
        </div>

        <div className="w-full lg:h-[400px] h-[200px] flex flex-col relative font-azeretMono ">
          <Gravity gravity={{ x: 0, y: 1 }} className="w-full h-full">
            <MatterBody
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              x="30%"
              y="10%"
            >
              <div className="text-[10px] sm:text-2xl lg:text-3xl bg-red-500 text-white rounded-full hover:cursor-pointer lg:px-8 lg:py-4 px-2 py-1">
                Rose Day
              </div>
            </MatterBody>
            <MatterBody
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              x="30%"
              y="30%"
            >
              <div className=" sm:text-2xl lg:text-3xl text-[10px]  bg-yellow-500 text-white rounded-full hover:cursor-grab lg:px-8 lg:py-4 px-2 py-1">
                Propose Day
              </div>
            </MatterBody>
            <MatterBody
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              x="40%"
              y="20%"
              angle={10}
            >
              <div className=" sm:text-2xl lg:text-3xl text-[10px]  bg-green-400 text-white rounded-full hover:cursor-grab lg:px-8 lg:py-4 px-2 py-1">
                Hug Day
              </div>
            </MatterBody>
            <MatterBody
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              x="75%"
              y="10%"
            >
              <div className=" sm:text-2xl lg:text-3xl text-[10px]  bg-gray-800 text-white rounded-full hover:cursor-grab lg:px-8 lg:py-4 px-2 py-1 ">
                Chocolate Day
              </div>
            </MatterBody>
            <MatterBody
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              x="80%"
              y="20%"
            >
              <div className=" sm:text-2xl lg:text-3xl text-[10px]  bg-orange-500 text-white rounded-full hover:cursor-grab lg:px-8 lg:py-4 px-2 py-1">
                Propose Day
              </div>
            </MatterBody>
            <MatterBody
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              x="50%"
              y="10%"
            >
              <div className=" sm:text-2xl lg:text-3xl text-[10px]  bg-yellow-500 text-white rounded-full hover:cursor-grab lg:px-8 lg:py-4 px-2 py-1">
                Promise Day
              </div>
            </MatterBody>
            <MatterBody
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              x="90%"
              y="10%"
            >
              <div className=" sm:text-2xl lg:text-3xl text-[10px]  bg-green-700 text-white rounded-full hover:cursor-grab lg:px-8 lg:py-4 px-2 py-1">
                Promise Day
              </div>
            </MatterBody>
            <MatterBody
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              x="90%"
              y="10%"
            >
              <div className="text-[10px] sm:text-2xl lg:text-3xl   bg-green-700 text-white rounded-full hover:cursor-grab lg:px-8 lg:py-4 px-2 py-1 ">
                Valentine Day
              </div>
            </MatterBody>
          </Gravity>
        </div>
      </div>
    </div>
  );
};

export default GiftSection;

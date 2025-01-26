import React from "react";
import Gravity, { MatterBody } from "../fancy/gravity";
import { Link } from "react-router-dom";

const GiftSection = () => {
  return (
    <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 overflow-hidden">
      <div className="flex md:flex-row items-center  lg:p-6 sm:p-6 mt-4 ">
        {/* Content Section */}
        <div className="px-3 py-2 w-40">
          <h1 className="md:text-5xl text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-4 ">
            Say Goodbye to Boring Gifts!
          </h1>

          <p className="md:text-2xl text-[10px] font-semibold text-gray-700 mb-6">
            Surprise your BF or GF with unique digital delights – heartfelt and
            unforgettable. Make every moment special with a gift that truly
            stands out!
          </p>
          <button className="lg:px-6 lg:py-3 px-1 py-1 bg-indigo-600 text-white font-medium lg:text-lg text-[8px] rounded-full shadow-md hover:bg-indigo-700 transition duration-300 w-28">
            Watch Demo from below <span className="ml-2">&#8595;</span>
          </button>
        </div>

        <div className="w-full lg:h-[700px] h-[200px] flex flex-col relative font-azeretMono ">
          <Gravity gravity={{ x: 0, y: 1 }} className="w-full h-full">
            <MatterBody
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              x="30%"
              y="10%"
            >
              <div className="text-[8px] sm:text-2xl lg:text-3xl bg-red-500 text-white rounded-full hover:cursor-pointer lg:px-8 lg:py-4 px-1 py-[2px] ">
                Rose Day
              </div>
            </MatterBody>
            <MatterBody
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              x="30%"
              y="30%"
            >
              <div className=" sm:text-2xl lg:text-3xl text-[8px]  bg-yellow-500 text-white rounded-full hover:cursor-grab lg:px-8 lg:py-4 px-1 py-[2px] ">
                Propose Day
              </div>
            </MatterBody>
            <MatterBody
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              x="40%"
              y="20%"
              angle={10}
            >
              <div className=" sm:text-2xl lg:text-3xl text-[8px]  bg-green-400 text-white rounded-full hover:cursor-grab lg:px-8 lg:py-4 px-1 py-[2px] ">
                Hug Day
              </div>
            </MatterBody>
            <MatterBody
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              x="75%"
              y="10%"
            >
              <div className=" sm:text-2xl lg:text-3xl text-[8px]  bg-gray-800 text-white rounded-full hover:cursor-grab lg:px-8 lg:py-4 px-1 py-[2px]  ">
                Chocolate Day
              </div>
            </MatterBody>
            <MatterBody
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              x="80%"
              y="20%"
            >
              <div className=" sm:text-2xl lg:text-3xl text-[8px]  bg-orange-500 text-white rounded-full hover:cursor-grab lg:px-8 lg:py-4 px-1 py-[2px] ">
                Propose Day
              </div>
            </MatterBody>
            <MatterBody
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              x="50%"
              y="10%"
            >
              <div className=" sm:text-2xl lg:text-3xl text-[8px]  bg-yellow-500 text-white rounded-full hover:cursor-grab lg:px-8 lg:py-4 px-1 py-[2px] ">
                Promise Day
              </div>
            </MatterBody>
            <MatterBody
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              x="90%"
              y="10%"
            >
              <div className=" sm:text-2xl lg:text-3xl text-[8px]  bg-green-700 text-white rounded-full hover:cursor-grab lg:px-8 lg:py-4 px-1 py-[2px] ">
                Promise Day
              </div>
            </MatterBody>
            <MatterBody
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              x="90%"
              y="10%"
            >
              <div className="text-[8px] sm:text-2xl lg:text-3xl   bg-green-700 text-white rounded-full hover:cursor-grab lg:px-8 lg:py-4 px-1 py-[2px]  ">
                Valentine Day
              </div>
            </MatterBody>
          </Gravity>
        </div>
      </div>
      <div className="flex items-center justify-center  py-2 gap-2">
        <Link to={"/virushka"}>
          <button className="text-[10px] bg-pink-400 rounded-lg p-2">
            viruska website
          </button>
        </Link>
        <button className="text-[10px] bg-pink-400 rounded-lg p-2">
          darshan website
        </button>
        <button className="text-[10px] bg-pink-400 rounded-lg p-2">
          Triggerd inshan
        </button>
        <button></button>
      </div>
    </div>
  );
};

export default GiftSection;

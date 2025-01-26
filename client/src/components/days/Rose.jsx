import bg from "../../assets/Rose/rosedaybg.png";

import dog1 from "../../assets/Rose/dog.png";
import frame from "../../assets/Rose/circular-frame.png";
import dog2 from "../../assets/Rose/dog2.png";
import dog3 from "../../assets/Rose/dog3.png";
import side from "../../assets/Rose/side.png";
import sideview from "../../assets/Rose/sideview.png";
import tree from "../../assets/Rose/tree.png";
import propose from "../../assets/Rose/propose.png";
import surprise from "../../assets/Rose/surprise.png";
import couple3 from "../../assets/hug/couple3.jpg";

export const Rose = () => {
  return (
    <>
      <div
        className="w-full bg-cover"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <img src={sideview} alt="" className="w-32 lg:w-52" />
            <img src={side} alt="" className="w-32 lg:w-52" />
          </div>
          <div className="relative">
            <div className="-mt-20 flex items-center justify-center">
              <img src={surprise} alt="" className="" />
            </div>
            <div className="lg:text-5xl lg:w-80 lg:top-44 lg:left-32 absolute top-10 text-center left-5 text-2xl w-44 font-bold text-shadow-pinkGlow">
              Happy Rose Day
            </div>
          </div>
          <div>
            <div className="mt-6 lg:text-3xl lg:pb-5 text-lg font-semibold text-pink-800 text-center">
              You're my favorite rose, beautiful and rare.
            </div>
            <div className="relative space-y-3">
              <div className="flex item-center  justify-center gap-4">
                <img
                  src={couple3}
                  className="h-32 w-32 md:h-72 md:w-72 border-[8px] border-[#E57586] border-b-[25px] rounded-sm"
                />
                <img
                  src={couple3}
                  className="h-32 w-32 md:h-72 md:w-72 border-[8px] border-[#E57586] border-b-[25px] rounded-sm"
                  alt=""
                />
              </div>
              <div className="flex item-center  justify-center gap-4">
                <img
                  src={couple3}
                  className="h-32 w-32 md:h-72 md:w-72 border-[8px] border-[#E57586] border-b-[25px] rounded-sm"
                  alt="h-20 w-20"
                />
                <img
                  src={couple3}
                  className="h-32 w-32 md:h-72 md:w-72 border-[8px] border-[#E57586] border-b-[25px] rounded-sm"
                  alt=""
                />
              </div>
              <div className="absolute top-20  overflow-hidden">
                <div className=" flex items-center lg:justify-between justify-center gap-40 lg:gap-[420px]">
                  <img src={tree} className="lg:h-52 lg:w-72   h-24 w-28" />
                  <img src={tree} className="lg:h-52 lg:w-72   h-24 w-28" />
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className=" flex items-center justify-center">
              <img src={propose} alt="" className="" />
            </div>
            <div className="absolute md:top-16 top-4 md:w-[350px] w-40 right-8 md:right-16 flex items-center justify-end">
              <div className="md:text-3xl md:w-[350px] text-xs w-40 p-2 font-semibold italic">
                A rose is a symbol of love, but you’re the one who brings that
                love to life for me. Happy Rose Day, my love. You’re the most
                beautiful part of my life
              </div>
            </div>
          </div>
          <div className="text-center md:text-2xl  md:py-4 font-light text-sm italic px-4 py-2">
            I'd give you a million roses if I could, but I'd rather spend my
            time with you. Happy Rose Day, my love." 🌹❤
          </div>
          <div class="flex justify-center gap-2 items-center ">
            <div className=" ">
              <img src={dog1} alt="" className="h-16 md:h-28 pl-4" />
              <img
                src={couple3}
                alt=""
                className="h-24 w-24 md:h-64 md:w-64 rounded-full -mt-2 border-collapse border-[6px] border-[#E57586] md:border-[12px]  md:-mt-6"
              />
            </div>

            <div className=" ">
              <img src={dog2} alt="" className="h-16 md:h-28 pl-4" />
              <img
                src={couple3}
                alt=""
                className="h-24 w-24 md:h-64 md:w-64 rounded-full -mt-2 md:border-[12px] md:-mt-6 border-collapse border-[6px] border-[#E57586]"
              />
            </div>

            <div className=" ">
              <img src={dog3} alt="" className="h-16 md:h-28 pl-4" />
              <img
                src={couple3}
                alt=""
                className="h-24 w-24 md:h-64 md:w-64 rounded-full -mt-2 md:-mt-6 border-collapse border-[6px] md:border-[12px] border-[#E57586]"
              />
            </div>
          </div>
          <div className="bg-[#E57586] flex mt-2 py-1 item-center justify-center italic text-black font-light lg:text-2xl lg:py-4">
            Made with love
          </div>
        </div>
      </div>
    </>
  );
};

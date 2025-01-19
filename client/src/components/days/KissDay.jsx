import kissBg from "../../assets/kisss/kissBg.png";
import frame from "../../assets/kisss/frame.png";
import kiss from "../../assets/kisss/kiss.png";
import butterfly from "../../assets/kisss/butterfly.png";
import couple from "../../assets/hug/couple1.jpg";
import couple2 from "../../assets/hug/couple2.jpg";
import ribbon from "../../assets/kisss/ribbon.png";

export const KissDay = () => {
  const baseImages = [kiss, kiss, kiss];
  const overlayImages = [frame, frame, frame];
  return (
    <>
      <div
        className="w-full  bg-cover "
        style={{ backgroundImage: `url(${kissBg})` }}
      >
        <div className="max-w-3xl mx-auto">
          <section>
            <div className="flex items-center justify-between">
              <div>
                <img src={butterfly} alt="" className="mb-24 h-[72px]" />
              </div>
              <div>
                <img src={kiss} alt="" className="h-72" />
              </div>
              <div>
                <img src={butterfly} alt="" className="" />
              </div>
            </div>
          </section>
          <section className="mt-10">
            <div className="grid grid-cols-3 relative">
              <div>
                <img src={frame} alt="" className="lg:w-auto sm:w-auto w-32 " />
              </div>
              <div>
                <img src={frame} alt="" className="lg:w-auto sm:w-auto w-32" />
              </div>
              <div>
                <img src={frame} alt="" className="lg:w-auto sm:w-auto w-32" />
              </div>
              <div className=" ">
                <div className="grid grid-cols-3 ">
                  <img
                    src={couple}
                    alt=""
                    className="absolute lg:left-[80px] sm:left-[80px] left-[40px] top-[1px] lg:h-[230px] lg:w-[174px] h-[110px] w-[90px] sm:h-[230px] sm:w-[174px] "
                  />
                  <img
                    src={couple}
                    alt=""
                    className="absolute top-[1px] lg:left-[337px] lg:h-[230px] lg:w-[174px] sm:w-[174px] sm:left-[336px] left-[185px] sm:h-[230px] h-[110px] w-[80px]"
                  />
                  <img
                    src={couple}
                    alt=""
                    className="absolute lg:left-[590px] sm:left-[590px] lg:h-[230px] lg:w-[174px] sm:h-[230px] sm:w-[172px] h-[113px] w-[85px] top-[1px] left-[330px] "
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="mt-10 relative px-4">
            <div className="bg-[#CDBEE9] rounded-2xl lg:h-28 sm:h-28 h-20 ">
              <div className="absolute -top-5 -left-4">
                <img src={ribbon} alt="" className="" />
              </div>
            </div>
          </section>
          <section className="mt-10">
            <div className="grid lg:grid-cols-2 sm:grid-cols-2 grid-cols-1 lg:px-0 sm:px-4 px-8 ">
              <div className="py-4">
                <div className="relative">
                  <img
                    src={couple2}
                    alt=""
                    className="border-[15px] h-80 w-80 rounded-2xl border-[#CDBEE9]"
                  />
                  <img
                    src={ribbon}
                    alt=""
                    className="absolute -top-5 -left-2"
                  />
                  <img
                    src={ribbon}
                    alt=""
                    className="absolute -top-5 left-[270px]"
                  />
                </div>
              </div>
              <div className="py-4">
                <div className="relative">
                  <img
                    src={couple2}
                    alt=""
                    className="border-[15px] h-80 w-80 rounded-2xl border-[#CDBEE9]"
                  />
                  <img
                    src={ribbon}
                    alt=""
                    className="absolute -top-5 -left-2"
                  />
                  <img
                    src={ribbon}
                    alt=""
                    className="absolute -top-5 left-[270px]"
                  />
                </div>
              </div>
              <div className="py-4">
                <div className="relative">
                  <img
                    src={couple2}
                    alt=""
                    className="border-[15px] h-80 w-80 rounded-2xl border-[#CDBEE9]"
                  />
                  <img
                    src={ribbon}
                    alt=""
                    className="absolute -top-5 -left-2"
                  />
                  <img
                    src={ribbon}
                    alt=""
                    className="absolute -top-5 left-[270px]"
                  />
                </div>
              </div>
              <div className="py-4">
                <div className="relative">
                  <img
                    src={couple2}
                    alt=""
                    className="border-[15px] h-80 w-80 rounded-2xl border-[#CDBEE9]"
                  />
                  <img
                    src={ribbon}
                    alt=""
                    className="absolute -top-5 -left-2"
                  />
                  <img
                    src={ribbon}
                    alt=""
                    className="absolute -top-5 left-[270px]"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="bg-[#CDBEE9] h-14 ">
          <div className=" flex max-w-xl mx-auto items-center justify-evenly py-2">
            <div>
              <img src={butterfly} alt="" className="h-10 w-10" />
            </div>
            <div>
              <img src={butterfly} alt="" className="h-10 w-10" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

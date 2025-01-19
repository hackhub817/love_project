import frame from "../../assets/Chocolate/freame.png";
import cartoon from "../../assets/Chocolate/chocoCartoon.png";
import circle from "../../assets/Chocolate/chocoCircle.png";
import love from "../../assets/Chocolate/love_chocolate.png";
import frame2 from "../../assets/Chocolate/chocolateFrame.png";
import chocoBack from "../../assets/Chocolate/chocoBack.png";
import bottomShape from "../../assets/Chocolate/bottom_shape.png";
import cir from "../../assets/Chocolate/cir.png";
import couple3 from "../../assets/hug/couple3.jpg";
import RollingGallery from "../../blocks/Components/RollingGallery/RollingGallery";
import Marquee from "../../components/ui/marquee";

export const ChocolateDay = () => {
  return (
    <div className="bg-[#a97e75] h-auto">
      <div className=" ">
        <div
          className="bg-cover bg-center"
          style={{ backgroundImage: `url(${chocoBack})` }}
        >
          <section className="">
            <div className="max-w-4xl mx-auto">
              <div className="  flex items-center justify-end">
                <div>
                  <img
                    src={cartoon}
                    alt=""
                    className="lg:h-64 lg:w-64 sm:h-64 sm:w-64 h-44 w-44"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className=" max-w-4xl mx-auto mt-20">
            <div className="relative flex justify-center items-center h-64">
              {/* First Image */}
              <img
                src={love}
                alt="Image 1"
                className="lg:w-72  lg:h-72 sm:w-72  sm:h-72 w-48 h-44 relative z-10 "
                style={{ marginRight: "-70px" }} // Adjust overlap here
              />
              {/* Second Image */}
              <img
                src={frame2}
                alt="Image 2"
                className="lg:w-1/2  lg:h-72 sm:w-1/2  sm:h-72 w-48 h-44 relative z-0 "
              />
            </div>
          </section>
          <section className="max-w-6xl mx-auto mt-20">
            {/* <div className="flex justify-center items-center mt-8">
              <div className="relative">
                <img
                  src={cir}
                  alt="Bottom"
                  className="lg:w-[200px] lg:h-[150px] sm:w-[200px] sm:h-[150px] w-[120px] h-[120px] "
                />

                <img
                  src={love}
                  alt="Top"
                  className="absolute lg:top-[120px] sm:top-[120px] top-[54px] left-1/2 lg:w-[200px] lg:h-[150px] sm:w-[200px] sm:h-[150px] w-[75px] h-[75px]  transform -translate-x-1/2 -translate-y-1/2"
                />
              </div>
              <div className="relative">
                <img
                  src={cir}
                  alt="Bottom"
                  className="lg:w-[200px] lg:h-[150px] sm:w-[200px] sm:h-[150px] w-[120px] h-[120px] "
                />

                <img
                  src={love}
                  alt="Top"
                  className="absolute lg:top-[120px] sm:top-[120px] top-[54px] left-1/2 lg:w-[200px] lg:h-[150px] sm:w-[200px] sm:h-[150px] w-[75px] h-[75px]  transform -translate-x-1/2 -translate-y-1/2"
                />
              </div>
              <div className="relative">
                <img
                  src={cir}
                  alt="Bottom"
                  className="lg:w-[200px] lg:h-[150px] sm:w-[200px] sm:h-[150px] w-[120px] h-[120px] "
                />

                <img
                  src={love}
                  alt="Top"
                  className="absolute lg:top-[120px] sm:top-[120px] top-[54px] left-1/2 lg:w-[200px] lg:h-[150px] sm:w-[200px] sm:h-[150px] w-[75px] h-[75px]  transform -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            </div>
            <RollingGallery autoplay={true} pauseOnHover={true} /> */}
            <Marquee pauseOnHover className="[--duration:20s]">
              <img src={couple3} alt="" className=" h-[180px] w-[250px]" />
              <img src={couple3} alt="" className=" h-[180px] w-[250px]" />

              <img src={couple3} alt="" className=" h-[180px] w-[250px]" />
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
              {" "}
              <img src={couple3} alt="" className=" h-[180px] w-[250px]" />
              <img src={couple3} alt="" className=" h-[180px] w-[250px]" />
              <img src={couple3} alt="" className=" h-[180px] w-[250px]" />
            </Marquee>
          </section>
          <section className="mt-20">
            <div className="flex items-center justify-center p-2 ">
              <img src={bottomShape} alt="" className="w-[400px] h-[300px]" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

import frame from "../../assets/Chocolate/freame.png";
import cartoon from "../../assets/Chocolate/chocoCartoon.png";
import circle from "../../assets/Chocolate/chocoCircle.png";
import love from "../../assets/Chocolate/love_chocolate.png";
import frame2 from "../../assets/Chocolate/chocolateFrame.png";
import cir from "../../assets/Chocolate/cir.png";

export const ChocolateDay = () => {
  return (
    <div className="bg-[#a97e75] ">
      <section>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-end">
            <div>
              <img src={cartoon} alt="" className="h-64 w-64" />
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-4xl mx-auto mt-20">
        <div className="relative flex justify-center items-center h-64">
          {/* First Image */}
          <img
            src={love}
            alt="Image 1"
            className="w-72  h-72 relative z-10 "
            style={{ marginRight: "-70px" }} // Adjust overlap here
          />
          {/* Second Image */}
          <img
            src={frame2}
            alt="Image 2"
            className="w-1/2  h-72 relative z-0 "
          />
        </div>
      </section>
      <section className="max-w-4xl mx-auto mt-20">
        <div className="flex justify-center items-center mt-8">
          {/* Container for the images */}
          <div className="relative">
            {/* Bottom Image */}
            <img src={cir} alt="Bottom" className="w-[250px] h-[250px] " />

            {/* Top Image */}
            <img
              src={love}
              alt="Top"
              className="absolute top-[126px] left-1/2 w-[200px] h-[150px]  transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          <div className="relative">
            {/* Bottom Image */}
            <img src={cir} alt="Bottom" className="w-[250px] h-[250px] " />

            {/* Top Image */}
            <img
              src={love}
              alt="Top"
              className="absolute top-[126px] left-1/2 w-[200px] h-[150px]  transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          <div className="relative">
            {/* Bottom Image */}
            <img src={cir} alt="Bottom" className="w-[250px] h-[250px] " />

            {/* Top Image */}
            <img
              src={love}
              alt="Top"
              className="absolute top-[126px] left-1/2 w-[200px] h-[150px]  transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

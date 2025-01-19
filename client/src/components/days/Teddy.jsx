import flower from "../../assets/teddy/flower.png";
import bg from "../../assets/teddy/bg.png";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import couple1 from "../../assets/hug/couple1.jpg";
import sit from "../../assets/teddy/sittingTeddy.png";
import love from "../../assets/teddy/love.png";
import loveteddy from "../../assets/teddy/loveteddy.png";
import loveteddy2 from "../../assets/teddy/teddylove2.png";
import ballon from "../../assets/teddy/ballon.png";
import wall from "../../assets/teddy/wall.png";
import hand from "../../assets/teddy/hand.png";
import bg2 from "../../assets/teddy/bg2.png";

export const Teddy = () => {
  const words = [
    {
      text: "Happy",
    },
    {
      text: "Teddy",
    },
    {
      text: "Day",
    },
    {
      text: "My ",
    },
    {
      text: "Love.",
      className: "text-red-500 ",
    },
  ];

  return (
    <div className="bg-pink-200  relative">
      {/* Background Image with Opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <div className="absolute inset-0 bg-white opacity-[.75]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <section className="max-w-4xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <img src={flower} alt="" className="h-80" />
            <div>
              <TypewriterEffectSmooth className="text-4xl" words={words} />
            </div>
          </div>
        </section>
        <section className="max-w-4xl mx-auto mt-5 sm:px-4">
          <div className="bg-[#483F2C] h-auto grid grid-cols-3 gap-10 ">
            <img
              src={couple1}
              alt="Image 1"
              className="w-full h-auto object-cover py-10"
            />
            <img
              src={couple1}
              alt="Image 2"
              className="w-full h-auto object-cover py-10"
            />
            <img
              src={couple1}
              alt="Image 3"
              className="w-full h-auto object-cover py-10"
            />
          </div>
        </section>
        <section className="max-w-4xl mx-auto mt-5 relative sm:px-6">
          <div className="flex items-center">
            {/* Background Box */}
            <div className="bg-[#483F2C] lg:h-72 sm:h-64 h-52  rounded-[40px] relative z-10 lg:p-12 sm:p-12 p-6 pl-3 -mr-10">
              <div className="text-2xl text-center text-white ">
                Happy Teddy Day!
              </div>
              <div className="lg:text-lg sm:text-lg text-sm text-white">
                You're my favorite teddy bear. You're not just my
                boyfriend/girlfriend, you're my favorite cuddly buddy! 🐻❤️
                Every moment with you feels like a warm hug. I love you more
                than words can say! 🥰
              </div>
            </div>

            {/* Image */}
            <img
              src={sit}
              alt="Image 1"
              className="lg:w-full lg:h-auto sm:h-64 h-52 object-cover relative z-20 -ml-24"
            />
          </div>
        </section>
        <section className="max-w-4xl mx-auto mt-5 sm:px-5  ">
          <div className="flex items-center">
            <img
              src={loveteddy}
              alt="Image 1"
              className="lg:h-52 sm:h-44 h-24 object-cover relative z-20 lg:-ml-10 sm:-ml-10"
            />
            <img
              src={love}
              alt="Image 1"
              className="lg:w-44 lg:h-44 sm:w-32 sm:h-32 h-20   object-cover relative z-20 lg:-ml-10 sm:-ml-10 -ml-2"
            />
            <img
              src={love}
              alt="Image 1"
              className="lg:w-44 lg:h-44 sm:w-32 sm:h-32 h-20   object-cover relative z-20 lg:-ml-10 sm:-ml-10 -ml-2"
            />
            <img
              src={love}
              alt="Image 1"
              className="lg:w-44 lg:h-44 sm:w-32 sm:h-32 h-20   object-cover relative z-20 lg:-ml-10 sm:-ml-10 -ml-2"
            />
            <img
              src={loveteddy2}
              alt="Image 1"
              className="lg:h-52 sm:h-44 h-24 object-cover relative z-20 lg:-ml-10 sm:-ml-10 -ml-2"
            />
          </div>
        </section>
        <section className="max-w-4xl mx-auto mt-5 px-2 relative">
          <div className="flex items-center relative">
            {/* Ballon Image */}
            <img
              src={ballon}
              alt="Image 1"
              className="lg:h-96 sm:h-72 h-44 lg:mb-10 sm:mb-10 mb-28 object-cover relative z-10 lg:-mr-40 sm:-mr-40 -mr-10"
            />

            {/* Wall Image */}
            <div className="relative h-64 ">
              <img
                src={wall}
                alt="Wall Image"
                className="lg:h-full sm:h-56 h-32 lg:w-[850px] sm:w-[550px] w-[300px] object-cover relative  "
              />

              {/* Three Smaller Images */}
              <div className="absolute top-10 lg:left-32 sm:left-32 left-8 w-full flex lg:gap-10 sm:gap-10 gap-2 -mt-5 z-20">
                <img
                  src={couple1}
                  alt="Small Image 1"
                  className="lg:h-24 lg:w-24 sm:h-24 sm:w-24 h-14 w-14   border-4 border-white border-b-[14px] shadow-md"
                />
                <img
                  src={couple1}
                  alt="Small Image 2"
                  className="lg:h-24 lg:w-24 sm:h-24 sm:w-24 h-14 w-14   border-4 border-white border-b-[14px] shadow-md"
                />
                <img
                  src={couple1}
                  alt="Small Image 3"
                  className="lg:h-24 lg:w-24 sm:h-24 sm:w-24 h-14 w-14   border-4 border-white border-b-[14px] shadow-md"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="max-w-4xl mx-auto  px-2 relative">
          <div className="flex items-center relative">
            {/* Hand Image */}
            <img
              src={hand}
              alt="Image 1"
              className="lg:h-64 sm:h-48 h-32 object-cover relative z-20 lg:ml-20 sm:ml-32"
            />

            {/* BG2 Image */}
            <div className="relative lg:w-[550px] sm:w-[450px] w-[300px] px-2 lg:h-60 sm:h-60 h-48 ">
              <img
                src={bg2}
                alt="Background Image"
                className="w-full h-full object-cover"
              />

              {/* Text Overlay */}
              <div className="absolute inset-0 flex items-center justify-center text-center text-white p-4">
                <div>
                  <p className="lg:text-lg sm:text-base text-xs font-semibold mt-2">
                    All our adventures together, from silly movie nights to
                    exploring new places, feel like the best cuddles with my
                    favorite teddy bear. 🐻❤️ You know, I feel like I've found
                    my forever cuddle buddy in you. 🐻 ❤️ You're always there
                    for me, a constant source of comfort and joy. Happy Teddy
                    Day, my love.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

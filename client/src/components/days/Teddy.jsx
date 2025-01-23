import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTeddyDayData } from "../../Pages/api/Api";
import { toast } from "sonner";
import flower from "../../assets/teddy/flower.png";
import bg from "../../assets/teddy/bg.png";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import couple3 from "../../assets/hug/couple3.jpg";
import sit from "../../assets/teddy/sittingTeddy.png";
import loveteddy from "../../assets/teddy/loveteddy.png";
import loveteddy2 from "../../assets/teddy/teddylove2.png";
import wall from "../../assets/teddy/wall.png";
import hand from "../../assets/teddy/hand.png";
import bg2 from "../../assets/teddy/bg2.png";
import love from "../../assets/teddy/3love.png";
import ballon from "../../assets/teddy/teddyballon.png";
import female from "../../assets/teddy/female.png";
import lovehand from "../../assets/teddy/lovehand.png";
// import AnimatedTestimonials from "../../components/ui/animated-testimonials";

export const Teddy = ({
  isPreview,
  previewImages,
  messages,
  ...previewData
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teddyData, setTeddyData] = useState(null);
  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    const fetchTeddyData = async () => {
      try {
        setLoading(true);
        const response = await getTeddyDayData(username);
        if (response.success) {
          setTeddyData(response.dayData);
        }
      } catch (err) {
        console.error("Error fetching teddy day data:", err);
        setError(err.message || "Failed to fetch teddy day data");
        toast.error("Failed to load teddy day data");
      } finally {
        setLoading(false);
      }
    };

    if (!isPreview && username) {
      fetchTeddyData();
    } else if (isPreview) {
      setTeddyData({
        images: previewImages || [],
        messages: messages || [],
        ...previewData,
      });
      setLoading(false);
    }
  }, [isPreview, username, previewImages, messages, previewData]);

  // Helper function to get images
  const getImages = (start, end) => {
    const images = isPreview ? previewImages : teddyData?.images;
    return images?.slice(start, end) || Array(end - start).fill(couple3);
  };

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
    <div className="bg-pink-200 py-2 relative">
      {/* Background Image with Opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <div className="absolute inset-0 bg-white opacity-[0.5]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <section className="max-w-4xl mx-auto lg:p-4 sm:p-4">
          <div className="flex items-center  justify-center">
            <img src={flower} alt="" className="lg:h-80 sm:h-72 h-28" />
            <div>
              <TypewriterEffectSmooth
                className="lg:text-4xl sm:text-4xl text-2xl"
                words={words}
              />
            </div>
          </div>
        </section>
        <section className="max-w-4xl mx-auto lg:mt-5 sm:mt-5 sm:px-4">
          <div className="bg-[#483F2C] lg:h-96 sm:h-96 h-48 grid grid-cols-3 lg:gap-10 sm:gap-10 gap-2">
            {getImages(0, 3).map((imageUrl, idx) => (
              <img
                key={idx}
                src={imageUrl}
                alt={`Image ${idx + 1}`}
                className="w-full lg:h-96 sm:h-96 h-48 object-cover  lg:py-10 sm:py-10 py-4 "
              />
            ))}
          </div>
        </section>
        <section className="max-w-4xl mx-auto mt-5 relative sm:px-6">
          <div className="flex items-center p-2">
            {/* Background Box */}
            <div className="bg-[#483F2C]  lg:h-72 sm:h-64 h-52  rounded-[40px] relative z-10 lg:p-12 sm:p-12 p-4 pl-3 -mr-10">
              <div className="lg:text-2xl sm:text-2xl text-lg ml-3 font-semibold text-white ">
                Happy Teddy Day!
              </div>
              <div className="lg:text-lg sm:text-lg text-xs text-white p-4 w-60 italic">
                All our adventures together, from silly movie nights to
                exploring new places, feel like the best cuddles with my
                favorite teddy bear. 🐻❤️ You know, I feel like I've found my
                forever cuddle buddy in you.
              </div>
            </div>

            {/* Image */}
            <img
              src={sit}
              alt="Image 1"
              className="lg:w-full lg:h-auto sm:h-64 h-32 object-cover relative z-20 lg:-ml-24 sm:-ml-24 -ml-10"
            />
          </div>
        </section>
        <section className="max-w-4xl mx-auto lg:mt-5 sm:mt-5  sm:px-5  ">
          <img src={love} alt="" className="" />
        </section>
        <section className="max-w-4xl mx-auto  lg:px-2  sm:px-2 relative">
          <div className="flex items-center relative">
            <div className="">
              <img
                src={ballon}
                alt="Wall Image"
                // className="lg:h-full sm:h-56 h-32 lg:w-[850px] sm:w-[550px] w-[210px] object-cover relative  "
              />

              {/* Three Smaller Images */}
              {/* <div className="absolute top-10 lg:left-32 sm:left-32 left-8 w-full flex lg:gap-10 sm:gap-10 gap-2 -mt-5 z-20">
                {getImages(3, 6).map((imageUrl, idx) => (
                  <img
                    key={idx}
                    src={imageUrl}
                    alt={`Small Image ${idx + 1}`}
                    className="lg:h-24 lg:w-24 sm:h-24 sm:w-24 h-12 w-12 border-4 border-white border-b-[14px] shadow-md"
                  />
                ))}
              </div> */}
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto mt-2  px-2 relative">
          <div className="flex items-center relative">
            <img
              src={lovehand}
              alt="Image 1"
              // className="lg:h-64 sm:h-48 h-32 lg:w-64 sm:w-64 w-24 object-cover relative z-20 lg:ml-20 sm:ml-32"
            />

            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-end  text-white ">
              <div>
                <p className="lg:text-lg sm:text-base w-44 text-[9px] font-semibold ">
                  All our adventures together, from silly movie nights to
                  exploring new places, feel like the best cuddles with my
                  favorite teddy bear. You know, I feel like I've found my
                  forever cuddle buddy in you.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="max-w-4xl mx-auto  lg:px-2  sm:px-2 relative">
          <div className="flex items-center relative">
            {/* Ballon Image */}

            {/* Wall Image */}
            <div className="">
              <img
                src={female}
                alt="Wall Image"
                // className="lg:h-full sm:h-56 h-32 lg:w-[850px] sm:w-[550px] w-[210px] object-cover relative  "
              />

              {/* Three Smaller Images */}
              {/* <div className="absolute top-10 lg:left-32 sm:left-32 left-8 w-full flex lg:gap-10 sm:gap-10 gap-2 -mt-5 z-20">
                {getImages(3, 6).map((imageUrl, idx) => (
                  <img
                    key={idx}
                    src={imageUrl}
                    alt={`Small Image ${idx + 1}`}
                    className="lg:h-24 lg:w-24 sm:h-24 sm:w-24 h-12 w-12 border-4 border-white border-b-[14px] shadow-md"
                  />
                ))}
              </div> */}
            </div>
          </div>
        </section>
        {/* <section>
          <AnimatedTestimonials testimonials={testimonials} />
        </section> */}
      </div>
    </div>
  );
};

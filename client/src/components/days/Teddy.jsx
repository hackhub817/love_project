import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTeddyDayData } from "../../Pages/api/Api";
import { toast } from "sonner";
import flower from "../../assets/teddy/flower.png";
import bg from "../../assets/teddy/bg.png";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import couple3 from "../../assets/hug/couple3.jpg";
import sit from "../../assets/teddy/sittingTeddy.png";
import love from "../../assets/teddy/3love.png";
import ballon from "../../assets/teddy/teddyballon.png";
import female from "../../assets/teddy/female.png";
import lovehand from "../../assets/teddy/lovehand.png";
import Stack from "../../blocks/Components/Stack/Stack";
export const Teddy = ({
  isPreview,
  previewImages,
  messages,
  ...previewData
}) => {
  const [cardDimensions, setCardDimensions] = useState({
    width: 120,
    height: 120,
  });

  useEffect(() => {
    // Set card size based on screen width
    const updateCardDimensions = () => {
      if (window.innerWidth >= 1024) {
        setCardDimensions({ width: 230, height: 230 }); // Large screen
      } else if (window.innerWidth >= 768) {
        setCardDimensions({ width: 150, height: 150 }); // Medium screen
      } else {
        setCardDimensions({ width: 120, height: 120 }); // Small screen
      }
    };

    // Update card size on load and resize
    updateCardDimensions();
    window.addEventListener("resize", updateCardDimensions);

    // Clean up on component unmount
    return () => {
      window.removeEventListener("resize", updateCardDimensions);
    };
  }, []);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teddyData, setTeddyData] = useState(null);
  const navigate = useNavigate();
  const { username } = useParams();
  const images = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
    },
  ];
  useEffect(() => {
    const fetchTeddyData = async () => {
      try {
        setLoading(true);
        const response = await getTeddyDayData(username);
        console.log("response", response);
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
  }, []);

  // Helper function to get images
  const getImages = (start, end) => {
    const images = isPreview ? previewImages : teddyData?.images;
    return images?.slice(start, end) || Array(end - start).fill(couple3);
  };

  const image1 = getImages(1, 3).map((image, index) => ({
    id: index + 1, // Adding an id based on the index
    img: image, // Assuming the image is a URL string
  }));

  console.log(image1);

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
              <div className="lg:text-lg sm:text-lg text-[11px] text-white p-4 lg:w-auto sm-auto w-[200px] italic">
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
              className="lg:w-full lg:h-auto sm:h-64 h-32 w-32 object-cover relative z-20 lg:-ml-24 sm:-ml-24 -ml-2 "
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
              <div className="flex items-center flex-end absolute lg:top-[140px] lg:right-96 top-[85px] right-16 ">
                <Stack
                  randomRotation={true}
                  sensitivity={180}
                  sendToBackOnClick={false}
                  cardDimensions={cardDimensions}
                  cardsData={images}
                />
              </div>
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
            <div className="absolute inset-0 flex items-center justify-end lg:pr-20 sm:pr-20 text-white ">
              <div>
                <p className="lg:text-lg sm:text-base lg:w-[400px] sm:w-96 w-44 text-[9px] font-semibold ">
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
            <div className="">
              <img src={female} alt="Wall Image" />
            </div>
            <div className="flex items-center flex-end absolute lg:top-[140px] lg:right-96 top-[50px] right-32 ">
              <Stack
                randomRotation={true}
                sensitivity={180}
                sendToBackOnClick={false}
                cardDimensions={cardDimensions}
                cardsData={image1}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

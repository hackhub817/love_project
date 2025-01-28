import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { getKissDayData } from "../../Pages/api/Api";
import bg from "../../assets/kiss/bg.png";
import kiss from "../../assets/kiss/pandakiss.png";
import message from "../../assets/kiss/message.png";
import couple2 from "../../assets/hug/couple2.jpg";
import dil from "../../assets/kiss/dil.png";
import kisslove from "../../assets/kiss/kisslove.png";
import love from "../../assets/kiss/lovelove.png";
import Ballpit from "../../blocks/Backgrounds/Ballpit/Ballpit";
import heart from "../../assets/heart.jpeg";
import img from "../../assets/kiss/img-2.png";
import kissfooter from "../../assets/kiss/kissfooter.png";

export const Kiss = ({
  isPreview,
  previewImages,
  messages,
  ...previewData
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [kissData, setKissData] = useState(null);
  const { username } = useParams();
  const [ballCount, setBallCount] = useState(150);
  useEffect(() => {
    const updateBallCount = () => {
      if (window.innerWidth < 640) {
        // Small screens (e.g., mobile)
        setBallCount(250);
      } else if (window.innerWidth < 1024) {
        // Medium screens (e.g., tablets)
        setBallCount(100);
      } else {
        // Large screens (e.g., desktops)
        setBallCount(150);
      }
    };

    // Initialize on mount
    updateBallCount();

    // Update on window resize
    window.addEventListener("resize", updateBallCount);

    // Cleanup event listener
    return () => window.removeEventListener("resize", updateBallCount);
  }, []);

  useEffect(() => {
    const fetchKissData = async () => {
      console.log("fetch");
      try {
        setLoading(true);
        const response = await getKissDayData(username);
        console.log("response", response);
        if (response.success) {
          setKissData(response.dayData);
        }
      } catch (err) {
        console.error("Error fetching kiss day data:", err);
        setError(err.message || "Failed to fetch kiss day data");
        toast.error("Failed to load kiss day data");
      } finally {
        setLoading(false);
      }
    };

    if (!isPreview && username) {
      fetchKissData();
    } else if (isPreview) {
      setKissData({
        images: previewImages || [],
        messages: messages || [],
        ...previewData,
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  // Helper function to get images

  if (loading) {
    return (
      <div>
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-32 w-32">
            <img
              src={heart}
              alt=""
              className="w-full h-full animate-heartbeat"
            />
            <p className="text-red-500 font-medium">
              Please Wait your data is loading...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Data
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const getImages = (start, end) => {
    const images = isPreview ? previewImages : kissData?.images;
    return images?.slice(start, end) || Array(end - start).fill(couple2);
  };

  return (
    <div className="bg-pink-200 sm:p-2 relative">
      {/* Background Image with Opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-white opacity-[.55]"></div>
      <section className="max-w-4xl mx-auto relative z-10">
        {" "}
        {/* Add z-10 to place above the overlay */}
        <div>
          <div className=" flex items-center justify-center">
            <img src={kiss} alt="Panda Kiss" className="" />
          </div>
          <div className="relative flex items-center justify-center  -mt-8 px-2">
            <img src={message} alt="Panda Kiss" className="" />
            <div className="lg:text-[45px]  lg:w-96 text-center absolute text-3xl  font-bold text-shadow-pinkGlow">
              Happy Kiss Day
            </div>
          </div>
        </div>
        <section>
          <div className="relative ">
            <img src={kisslove} alt="" className="px-2 " />
            <div className="absolute top-20 text-xs md:top-52 md:left-40 w-40 left-12 font-semibold md:w-64 md:text-2xl">
              A kiss from you is like magic—soft, sweet, and the best part of my
              day. 💋❤️
            </div>
            <div className="absolute top-[1vw] md:top-[70px] right-3 md:right-6 pt-9 w-full flex items-center justify-end">
              {getImages(0, 1).map((imageUrl, idx) => (
                <img
                  src={imageUrl}
                  alt=""
                  className="h-[39vw] w-[39vw] lg:h-[25.5vw] lg:w-[25.5vw] md:rounded-[35px] rounded-3xl"
                />
              ))}
            </div>
          </div>
        </section>
        <div className="flex items-center lg:px-0 sm:px-0 px-4">
          <div className="bg-pink lg:p-12 sm:p-8 p-4 rounded-tl-xl font-medium lg:text-xl sm:text-xl text-xs rounded-bl-xl bg-pink-500 md:w-[700px] sm:h-[250px] lg:h-[300px] h-[180px]">
            {" "}
            Every time I kiss you, it’s like the world pauses for a moment. It’s
            not just our lips meeting—it’s my heart whispering how much I love
            you, how much you mean to me, and how lucky I am to call you mine
          </div>
          <div className="relative my-10">
            {getImages(0, 1).map((imageUrl, idx) => (
              <img
                key={idx}
                src={imageUrl}
                alt={`Image ${idx + 1}`}
                className="border-[10px] rounded-tr-xl rounded-br-xl border-pink-500 lg:w-[1000px]  sm:w-[600px] w-[1000px] sm:h-[250px] lg:h-[300px] h-[180px]"
              />
            ))}
            <div className="flex items-center justify-center lg:block sm:block hidden">
              <div className="absolute top-0 -mt-5 md:left-24 ">
                <img src={dil} alt="" className="" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-pink-500 ">
          <div className="flex items-center justify-end ">
            <div>
              <img
                src={love}
                alt=""
                className="lg:h-20 lg:w-20 sm:h-20 sm:w-20 h-12 w-20  "
              />
              <img
                src={img}
                alt=""
                className="lg:h-28 lg:w-28 sm:h-28 sm:w-28 h-16 w-20  "
              />
            </div>
            {getImages(1, 4).map((imageUrl, idx) => (
              <img
                key={idx}
                src={imageUrl}
                alt={`Image ${idx + 2}`}
                className="lg:w-[250px] sm:w-[250px] sm:h-[280px]  lg:h-[280px] w-[135px] h-[120px] py-4 px-1"
              />
            ))}
          </div>
        </div>
        <div className="relative py-10">
          <img src={kissfooter} alt="" className="w-full" />
          {getImages(4, 5).map((imageUrl, idx) => (
            <img
              key={idx}
              src={imageUrl}
              alt={`Image ${idx + 5}`}
              className="absolute lg:top-24 lg:left-[28px] lg:w-[276px] lg:h-[335px] sm:top-[85px] sm:left-[28px] sm:w-[236px] sm:h-[290px] top-14 left-[15px] w-[110px] h-[140px]"
            />
          ))}
        </div>
      </section>
      <div className="relative overflow-hidden h-40 lg:h-62 sm:h-80 ">
        <Ballpit
          count={ballCount}
          gravity={1}
          friction={0.9}
          wallBounce={0.95}
          followCursor={true}
        />
      </div>
    </div>
  );
};

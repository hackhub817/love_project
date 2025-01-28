import frame from "../../assets/Chocolate/freame.png";
import cartoon from "../../assets/Chocolate/chocoCartoon.png";
import circle from "../../assets/Chocolate/chocoCircle.png";
import love from "../../assets/Chocolate/love_chocolate.png";
import frame2 from "../../assets/Chocolate/chocolateFrame.png";
import chocoBack from "../../assets/Chocolate/chocoBack.png";
import bottomShape from "../../assets/Chocolate/bottom_shape.png";
import flash from "../../assets/flash.jpeg";
import crose from "../../assets/Chocolate/chorose.png";
import cir from "../../assets/Chocolate/cir.png";
import couple3 from "../../assets/hug/couple3.jpg";
import RollingGallery from "../../blocks/Components/RollingGallery/RollingGallery";
import Marquee from "../../components/ui/marquee";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getChocolateDayData } from "../../Pages/api/Api";
import { toast } from "sonner";
import chocoFrame from "../../assets/Chocolate/chocoFrame.png";
import bg from "../../assets/Chocolate/cocobg.jpg";
import heart from "../../assets/heart.jpeg";
import rose from "../../assets/chocolaterose.jpeg";

export const ChocolateDay = ({
  isPreview,
  previewImages,
  messages,
  ...previewData
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chocolateData, setChocolateData] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const fetchChocolateData = async () => {
      try {
        setLoading(true);
        const response = await getChocolateDayData(username);
        if (response.success) {
          setChocolateData(response.dayData);
        }
      } catch (err) {
        console.error("Error fetching chocolate day data:", err);
        setError(err.message || "Failed to fetch chocolate day data");
        toast.error("Failed to load chocolate day data");
      } finally {
        setLoading(false);
      }
    };

    if (!isPreview && username) {
      fetchChocolateData();
    } else if (isPreview) {
      setChocolateData({
        images: previewImages || [],
        messages: messages || [],
        ...previewData,
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div>
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-32 w-32 ">
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

  // Helper function to get images
  const getImages = (start, end) => {
    const images = isPreview ? previewImages : chocolateData?.images;
    return images?.slice(start, end) || Array(end - start).fill(couple3);
  };

  return (
    <>
      <div className="bg-[#652a16] py-2 relative">
        {/* Background Image with Opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${bg})`,
          }}
        >
          <div className="absolute inset-0 bg-[#652a16] opacity-[0.7]"></div>
        </div>
        <div className="relative z-10">
          <section className="">
            <div className="max-w-4xl mx-auto">
              <div className="flex mt-10 items-center">
                <div className="md:text-7xl lg:w-80   text-center text-white  text-[45px] pt-24 w-44 font-bold text-shadow-brownGlow">
                  Happy
                </div>
                <div>
                  <img
                    src={cartoon}
                    alt=""
                    className="lg:h-64 lg:w-64 sm:h-64 sm:w-64 h-44 w-44"
                  />
                </div>
              </div>
              <div className="md:text-7xl  text-white md:py-4  text-[45px] w-full font-bold text-shadow-brownGlow">
                Chocolate Day
              </div>
            </div>
          </section>
          <section className=" max-w-4xl mx-auto lg:mt-20">
            <div className=" flex justify-center items-center h-64">
              {/* First Image */}
              <img
                src={love}
                alt="Image 1"
                className="lg:w-80  lg:h-80 sm:w-72  sm:h-72 w-44 h-36 lg:-mr-[30px] sm:-mr-[30px] -mr-[20px] animate-heartbeat "
              />
              {/* Second Image */}
              {getImages(0, 1).map((imageUrl, idx) => (
                <img
                  src={imageUrl}
                  alt="Image 2"
                  className="lg:w-[400px]  lg:h-80 sm:w-1/2  sm:h-72 w-36 h-32 lg:border-[10px] sm:border-[10px] border-[6px] border-[#652a16] rounded-3xl "
                />
              ))}
            </div>
          </section>

          <section className="max-w-6xl mx-auto lg:mt-20 sm:mt-20 ">
            <Marquee pauseOnHover className="[--duration:20s]">
              {getImages(0, 3).map((imageUrl, idx) => (
                <img
                  src={imageUrl}
                  alt=""
                  className=" md:h-[250px] md:w-[250px] h-[160px] w-[160px]"
                />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
              {" "}
              {getImages(3, 6).map((imageUrl, idx) => (
                <img
                  src={imageUrl}
                  alt=""
                  className=" md:h-[250px] md:w-[250px] h-[160px] w-[160px]"
                />
              ))}
            </Marquee>
          </section>
          <section className="p-2 max-w-4xl mx-auto">
            <div className="flex  items-center justify-center">
              <img
                src={crose}
                alt=""
                className="h-44 w-44 md:w-48 md:h-52 -mr-4 animate-pulse"
              />
              <div className="md:w-96 bg-[#57220f] lg:mt-20 mt-4 p-6 rounded-2xl md:text-xl md:p-10 text-base italic  text-white">
                You’re like my favorite chocolate 🍫—irresistible, comforting,
                and always making me crave more of your sweetness. 🍩🍪🍫
              </div>
            </div>
          </section>
          <section className="lg:mt-20">
            <div className=" relative flex items-center justify-center p-2 ">
              <img src={chocoFrame} alt="" className="w-[400px] h-[300px]" />
              {getImages(5, 6).map((imageUrl, idx) => (
                <img
                  src={imageUrl}
                  alt=""
                  className="absolute md:h-[250px] md:w-[250px] h-[180px] w-[180px] rounded-xl"
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

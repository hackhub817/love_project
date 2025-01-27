import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { getProposeDayData } from "../../Pages/api/Api";
import kissBg from "../../assets/kisss/kissBg.png";
import frame from "../../assets/kisss/frame.png";
import kiss from "../../assets/kisss/kiss.png";
import butterfly from "../../assets/kisss/butterfly.png";
import couple from "../../assets/hug/couple1.jpg";
import couple2 from "../../assets/hug/couple2.jpg";
import ribbon from "../../assets/kisss/ribbon.png";
import React from "react";
import heart from "../../assets/heart.jpeg";

import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "../ui/text-reveal-card";

export const ProposeDay = ({
  isPreview,
  previewImages,
  messages,
  ...previewData
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [promiseData, setPromiseData] = useState(null);
  const { username } = useParams();
  if (!isPreview) {
    useEffect(() => {
      const fetchPromiseData = async () => {
        try {
          setLoading(true);
          const response = await getProposeDayData(username);
          if (response.success) {
            setPromiseData(response.dayData);
          }
          console.log(response);
        } catch (err) {
          console.error("Error fetching promise day data:", err);
          setError(err.message || "Failed to fetch promise day data");
          toast.error("Failed to load promise day data");
        } finally {
          setLoading(false);
        }
      };

      if (!isPreview && username) {
        fetchPromiseData();
      } else if (isPreview) {
        setPromiseData({
          images: previewImages || [],
          messages: messages || [],
          ...previewData,
        });
        setLoading(false);
      }
    }, []);

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
  }
  // Helper function to get images
  const getImages = (start, end) => {
    const images = isPreview ? previewImages : promiseData?.images;
    return images?.slice(start, end) || Array(end - start).fill(couple2);
  };

  return (
    <div
      className="w-full bg-cover"
      style={{ backgroundImage: `url(${kissBg})` }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex pt-8 items-center justify-center py-2">
          <div className="lg:text-5xl  lg:w-80 text-center text-4xl  font-bold text-shadow-pinkGlow">
            Happy Propose Day
          </div>
        </div>
        <section>
          <div className="flex items-center -mt-12 justify-between">
            <div>
              <img src={butterfly} alt="" className="mb-24 h-[72px]" />
            </div>
            <div>
              <img src={kiss} alt="" className="h-64" />
            </div>
            <div>
              <img src={butterfly} alt="" className="" />
            </div>
          </div>
        </section>
        <section className="p-6">
          <div className="flex items-center justify-center bg-[#CDBEE9] border-white border-4 h-64 lg:h-full  rounded-2xl w-full">
            <TextRevealCard
              text="Secret Message By Your Love"
              revealText={promiseData?.secretMessage}
              className="bg-transparent"
            >
              <TextRevealCardTitle className="text-gray-500 font-semibold text-xl">
                Swipe right to know secret message
              </TextRevealCardTitle>
            </TextRevealCard>
          </div>
        </section>
        <section className="mt-10">
          <div className="grid grid-cols-3 relative overflow-hidden">
            {getImages(0, 3).map((imageUrl, idx) => {
              let leftPosition;

              // Adjust 'left' dynamically based on screen size
              if (window.innerWidth >= 1024) {
                // Large screens (lg)
                leftPosition = 80 + idx * 257;
              } else if (window.innerWidth >= 768) {
                // Tablet screens (sm)
                leftPosition = 50 + idx * 180;
              } else {
                // Mobile screens (default)
                leftPosition = 25 + idx * 120;
              }

              return (
                <div key={idx}>
                  <img
                    src={frame}
                    alt=""
                    className="lg:w-auto sm:w-auto w-32"
                  />
                  <img
                    src={imageUrl}
                    alt={`Image `}
                    className="absolute lg:left-[80px] sm:left-[50px] left-[20px] top-[1px] lg:h-[230px] lg:w-[174px] h-[110px] w-[90px] sm:h-[160px] sm:w-[120px]"
                    style={{ left: `${leftPosition}px` }}
                  />
                </div>
              );
            })}
          </div>
        </section>
        <section className="mt-10 relative px-4">
          <div className="bg-[#CDBEE9] rounded-2xl lg:h-28 sm:h-28 h-20">
            <div className="absolute -top-5 -left-4">
              <img src={ribbon} alt="" />
            </div>
            <div className="p-4 text-center text-[10px] lg:text-xl font-light italic text-gray-800">
              You light up my world 🌟, fill my heart with endless love ❤, bring
              joy to my soul 😊, and make me dream of a lifetime of togetherness
              💕. Will you be mine forever? 💍✨
            </div>
          </div>
        </section>
        <section className="mt-10 overflow-hidden">
          <div className="grid lg:grid-cols-2 sm:grid-cols-2 grid-cols-1 lg:px-0 sm:px-4 px-8">
            {getImages(2, 6).map((imageUrl, idx) => (
              <div key={idx} className="py-4">
                <div className="relative">
                  <img
                    src={imageUrl}
                    alt={`Bottom image ${idx + 1}`}
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
            ))}
          </div>
        </section>
      </div>
      <div className="bg-[#CDBEE9] h-14 ">
        <div className=" flex max-w-xl mx-auto items-center justify-evenly py-2">
          <div>
            <img src={butterfly} alt="" className="h-10 w-10" />
          </div>
          <div className="italic font-light">Made With Love</div>
          <div>
            <img src={butterfly} alt="" className="h-10 w-10" />
          </div>
        </div>
      </div>
      {/* <div
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "500px",
          maxHeight: "500px",
          width: "100%",
        }}
      >
        <Ballpit
          count={200}
          gravity={0.7}
          friction={0.8}
          wallBounce={0.95}
          followCursor={true}
        />
      </div> */}
    </div>
  );
};

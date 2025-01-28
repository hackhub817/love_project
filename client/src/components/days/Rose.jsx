import bg from "../../assets/Rose/rosedaybg.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { getRoseDayData } from "../../Pages/api/Api";
import dog1 from "../../assets/Rose/dog.png";
import frame from "../../assets/Rose/circular-frame.png";
import dog2 from "../../assets/Rose/dog2.png";
import dog3 from "../../assets/Rose/dog3.png";
import heart from "../../assets/heart.jpeg";
import side from "../../assets/Rose/side.png";
import sideview from "../../assets/Rose/sideview.png";
import tree from "../../assets/Rose/tree.png";
import propose from "../../assets/Rose/propose.png";
import surprise from "../../assets/Rose/surprise.png";
import couple3 from "../../assets/hug/couple3.jpg";

export const Rose = ({
  isPreview,
  previewImages,
  messages,
  ...previewData
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roseData, setRoseData] = useState(null);
  const { username } = useParams();
  useEffect(() => {
    const fetchKissData = async () => {
      console.log("fetch");
      try {
        setLoading(true);
        const response = await getRoseDayData(username);
        console.log("response", response);
        if (response.success) {
          setRoseData(response.dayData);
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
      setRoseData({
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
          <div className="h-32 w-44">
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
    const images = isPreview ? previewImages : roseData?.images;
    return images?.slice(start, end) || Array(end - start).fill(couple3);
  };

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
            <div className="mt-6 mb-2 lg:text-3xl lg:pb-5 text-lg font-semibold text-pink-800 text-center">
              You're my favorite rose, beautiful and rare.
            </div>
            <div className="relative space-y-3">
              <div className="flex item-center  justify-center gap-4">
                {getImages(0, 2).map((imageUrl, idx) => (
                  <img
                    src={imageUrl}
                    className="h-32 w-32 md:h-72 md:w-72 border-[8px] border-[#E57586] border-b-[25px] rounded-sm"
                  />
                ))}
              </div>
              <div className="flex item-center  justify-center gap-4">
                {getImages(2, 4).map((imageUrl, idx) => (
                  <img
                    src={imageUrl}
                    className="h-32 w-32 md:h-72 md:w-72 border-[8px] border-[#E57586] border-b-[25px] rounded-sm"
                    alt="h-20 w-20"
                  />
                ))}
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
          <div className="flex justify-center gap-2 items-center">
            {getImages(3, 6).map((imageUrl, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {/* Conditionally render dog images based on idx */}
                {idx === 0 && (
                  <img src={dog1} alt="Dog 1" className="h-16 md:h-28 pl-4" />
                )}
                {idx === 1 && (
                  <img src={dog2} alt="Dog 2" className="h-16 md:h-28 pl-4" />
                )}
                {idx === 2 && (
                  <img src={dog3} alt="Dog 3" className="h-16 md:h-28 pl-4" />
                )}

                {/* Render the same couple image for all indexes */}
                <img
                  src={imageUrl}
                  alt={`Couple ${idx}`}
                  className="h-24 w-24 md:h-64 md:w-64 rounded-full -mt-2 border-collapse border-[6px] border-[#E57586] md:border-[12px] md:-mt-6"
                />
              </div>
            ))}
          </div>

          <div className="bg-[#E57586] flex mt-2 py-1 item-center justify-center italic text-black font-light lg:text-2xl lg:py-4">
            Made with love
          </div>
        </div>
      </div>
    </>
  );
};

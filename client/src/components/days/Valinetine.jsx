import bg from "../../assets/valentine/BgValine.png";
import flow1 from "../../assets/valentine/flowerValine.png";
import frame from "../../assets/valentine/frameValintine.png";
import flow2 from "../../assets/valentine/flowValine.png";
import couple4 from "../../assets/hug/couple4.jpg";
import sideflow from "../../assets/valentine/sideflow.png";
import { getValentineDayData } from "../../Pages/api/Api";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { CoolMode } from "../ui/cool-mode";
import love_icon from "../../assets/love_icon.png";

import IconCloud from "../../components/ui/icon-cloud";

export const Valintine = ({
  isPreview,
  previewImages,
  messages,
  ...previewData
}) => {
  const [showEmoji, setShowEmoji] = useState(false);

  const handleYesClick = () => {
    setShowEmoji(true);
    setTimeout(() => setShowEmoji(false), 2000); // Hide emoji after 2 seconds
  };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teddyData, setTeddyData] = useState(null);
  const images = [
    love_icon,
    love_icon,
    love_icon,
    love_icon,
    love_icon,
    love_icon,
    love_icon,
    love_icon,
    love_icon,
    love_icon,
    love_icon,
    love_icon,
    love_icon,
    love_icon,
    love_icon,
    love_icon,
    love_icon,
    love_icon,
    love_icon,
    love_icon,
  ];
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchValentineData = async () => {
      try {
        setLoading(true);
        const response = await getValentineDayData(username);
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
      fetchValentineData();
    } else if (isPreview) {
      setTeddyData({
        images: previewImages || [],
        messages: messages || [],
        ...previewData,
      });
      setLoading(false);
    }
  }, []);

  const getImages = (start, end) => {
    const images = isPreview ? previewImages : teddyData?.images;
    return images?.slice(start, end) || Array(end - start).fill(couple4);
  };

  return (
    <div className=" space-y-4">
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="max-w-4xl  mx-auto">
          <div>
            <img src={flow1} alt="" className="relative" />
            <div className="w-full flex items-center justify-center lg:-mt-20 sm:-mt-40 -mt-12">
              {getImages(0, 1).map((imageUrl, idx) => (
                <img
                  key={idx}
                  src={imageUrl}
                  alt=""
                  className="border-[20px] border-pink-400 lg:w-[500px]  h-96 w-[700px]"
                />
              ))}
            </div>
            <div className=" bg-pink-400 pb-5 text-center font-extrabold text-2xl">
              Happy Valentine Day
            </div>
          </div>
          <div className="relative flex -mt-16 items-center justify-center overflow-hidden ">
            <IconCloud images={images} />
          </div>
          <div className=" px-2">
            <div className="lg:-mt-20 sm:-mt-20 -mt-16 flex items-center lg:gap-4 sm:gap-4 gap-1">
              {getImages(1, 4).map((imageUrl, idx) => (
                <div key={idx}>
                  <img
                    src={imageUrl}
                    alt=""
                    className=" lg:h-[350px] lg:w-[350px] sm:h-[350px] sm:w-[350px] h-[160px] w-[300px] lg:border-[10px] sm:border-[10px] border-[9px] border-pink-400 lg:border-t-[70px] sm:border-t-[70px] border-t-[10px] rounded-tl-full rounded-tr-full"
                  />
                </div>
              ))}
            </div>
            <img src={flow2} alt="" className="" />
          </div>
          <div className="bg-pink-300 py-3">
            <div className="font-semibold text-2xl text-center">
              Will You Be My Valentine?
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <CoolMode>
                <button className="py-2 px-4 bg-green-500 text-white rounded-lg text-xl font-semibold transform animate-bounce">
                  Yes
                </button>
              </CoolMode>
              <button className="py-2 px-4 bg-red-500 text-white rounded-lg text-xl font-semibold transform animate-bounce">
                No
              </button>
            </div>
            {/* Show emoji with blinking animation when 'Yes' is clicked */}
            {showEmoji && (
              <div className="flex justify-center mt-6">
                <div className="text-4xl animate-blink">😊</div>
              </div>
            )}
          </div>

          <div className="p-4">
            <div className="bg-pink-500 p-4 rounded-3xl">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={frame} alt="" className="" />
                  {getImages(4, 5).map((imageUrl, idx) => (
                    <img
                      key={idx}
                      src={couple4}
                      alt=""
                      className="absolute -z-10 h-[150px] w-[50px] top-10"
                    />
                  ))}
                </div>
                <div className="lg:text-xl sm:text-xl text-xs text-white lg:font-semibold">
                  All our adventures together, from silly movie nights to
                  exploring new places, feel like the best cuddles with my
                  favorite teddy bear. 🐻❤️ You know, I feel like I've found my
                  forever cuddle buddy in you. 🐻 ❤️ You're always there for me,
                  a constant source of comfort and joy. Happy Teddy Day, my
                  love.
                </div>
              </div>
            </div>
          </div>
          <div className="p-2">
            <div className="border-4 border-pink-400 border-dashed">
              <div className="flex items-center justify-center lg:gap-5 sm:gap-5 gap-3 lg:p-4 sm:p-4 p-1 relative">
                <img
                  src={sideflow}
                  alt=""
                  className="lg:h-[200px] sm:h-[200px] h-[100px] absolute lg:bottom-0 sm:bottom-0 bottom-2 -rotate-45 -left-16"
                />
                {getImages(3, 6).map((imageUrl, idx) => (
                  <img
                    key={idx}
                    src={imageUrl}
                    alt=""
                    className="lg:h-[250px] lg:w-[260px] sm:h-[250px] sm:w-[220px] h-24 w-[93px]"
                  />
                ))}
                <img
                  src={sideflow}
                  alt=""
                  className="lg:h-[200px] sm:h-[200px] h-[70px] absolute lg:-top-8 sm:-top-8 -top-6 rotate-90 lg:-right-2 sm:-right-2 right-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

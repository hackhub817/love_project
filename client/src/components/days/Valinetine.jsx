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

export const Valintine = ({
  isPreview,
  previewImages,
  messages,
  ...previewData
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teddyData, setTeddyData] = useState(null);

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
    <div className="max-w-4xl w-auto mx-auto space-y-4">
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div>
          <div>
            <img src={flow1} alt="" className="relative" />
            <div className="w-full flex items-center justify-center lg:-mt-40 sm:-mt-40 -mt-24">
              {getImages(0, 1).map((imageUrl, idx) => (
                <img
                  key={idx}
                  src={imageUrl}
                  alt=""
                  className="border-[20px] border-pink-400 border-b-[70px] h-96 w-[700px]"
                />
              ))}
            </div>
          </div>
          <div className="py-10 px-2">
            <img src={flow2} alt="" className="relative" />
            <div className="lg:-mt-20 sm:-mt-20 -mt-16 flex items-center lg:gap-4 sm:gap-4 gap-1">
              {getImages(1, 4).map((imageUrl, idx) => (
                <div key={idx}>
                  <img
                    src={imageUrl}
                    alt=""
                    className="lg:h-[350px] lg:w-[350px] sm:h-[350px] sm:w-[350px] h-[200px] w-[300px] lg:border-[10px] sm:border-[10px] border-[5px] border-pink-400 lg:border-t-[70px] sm:border-t-[70px] border-t-[50px] rounded-tl-full rounded-tr-full"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-pink-300 py-3">
            <div className="font-semibold text-2xl text-center">
              Thinking of you today and always.
            </div>
            <div className="font-semibold text-2xl text-center">
              Happy Valentine's Day!
            </div>
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

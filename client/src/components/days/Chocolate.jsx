import frame from "../../assets/Chocolate/freame.png";
import cartoon from "../../assets/Chocolate/chocoCartoon.png";
import circle from "../../assets/Chocolate/chocoCircle.png";
import love from "../../assets/Chocolate/love_chocolate.png";
import frame2 from "../../assets/Chocolate/chocolateFrame.png";
import chocoBack from "../../assets/Chocolate/chocoBack.png";
import bottomShape from "../../assets/Chocolate/bottom_shape.png";
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
    }
  }, []);

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
          <div className="absolute inset-0 bg-[#652a16] opacity-[0.6]"></div>
        </div>
        <div className="relative z-10">
          <section className="">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-end">
                <div>
                  <img
                    src={cartoon}
                    alt=""
                    className="lg:h-64 lg:w-64 sm:h-64 sm:w-64 h-44 w-44"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className=" max-w-4xl mx-auto mt-20">
            <div className=" flex justify-center items-center h-64">
              {/* First Image */}
              <img
                src={love}
                alt="Image 1"
                className="lg:w-80  lg:h-80 sm:w-72  sm:h-72 w-40 h-32 lg:-mr-[30px] sm:-mr-[30px] -mr-[20px] "
              />
              {/* Second Image */}
              {getImages(0, 1).map((imageUrl, idx) => (
                <img
                  src={imageUrl}
                  alt="Image 2"
                  className="lg:w-1/2  lg:h-80 sm:w-1/2  sm:h-72 w-32 h-28 lg:border-[10px] sm:border-[10px] border-[6px] border-[#652a16] rounded-3xl "
                />
              ))}
            </div>
          </section>

          <section className="max-w-6xl mx-auto lg:mt-20 sm:mt-20 ">
            <Marquee pauseOnHover className="[--duration:20s]">
              {getImages(0, 3).map((imageUrl, idx) => (
                <img src={imageUrl} alt="" className=" h-[180px] w-[250px]" />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
              {" "}
              {getImages(3, 6).map((imageUrl, idx) => (
                <img src={imageUrl} alt="" className=" h-[180px] w-[250px]" />
              ))}
            </Marquee>
          </section>
          <section className="max-w-4xl mx-auto mt-20"></section>
          <section className="mt-20">
            <div className="flex items-center justify-center p-2 ">
              <img src={chocoFrame} alt="" className="w-[400px] h-[300px]" />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

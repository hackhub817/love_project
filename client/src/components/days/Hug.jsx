import bgShape from "../../assets/hug/background.png";
import hug from "../../assets/hug/HeroHugImage.png";
import notes from "../../assets/hug/Note.png";
import love from "../../assets/hug/love.png";
import handshake from "../../assets/hug/handshake.png";
import img1 from "../../assets/hug/img-1.png";
import couple4 from "../../assets/hug/couple4.jpg";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getHugDayData } from "../../Pages/api/Api";
import { toast } from "sonner";
import RollingGallery from "../../blocks/Components/RollingGallery/RollingGallery";
import { FaChessKing } from "react-icons/fa6";
import heart from "../../assets/heart.jpeg";

export const HugDay = ({
  isPreview,
  previewImages,
  messages,
  ...previewData
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hugData, setHugData] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const fetchHugData = async () => {
      try {
        setLoading(true);
        const response = await getHugDayData(username);
        if (response.success) {
          setHugData(response.dayData);
        }
      } catch (err) {
        console.error("Error fetching hug day data:", err);
        setError(err.message || "Failed to fetch hug day data");
        toast.error("Failed to load hug day data");
      } finally {
        setLoading(false);
      }
    };

    if (!isPreview && username) {
      fetchHugData();
    } else if (isPreview) {
      setHugData({
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

  // Helper function to get images
  const getImages = (start, end) => {
    const images = isPreview ? previewImages : hugData?.images;
    return images?.slice(start, end) || Array(end - start).fill(couple4);
  };
  const images = getImages(0, 6);

  return (
    <div
      className=" bg-cover bg-center overflow-hidden "
      style={{ backgroundImage: `url(${bgShape})` }}
    >
      <section className="relative   lg:block sm:block pt-4 ">
        <div className="max-w-4xl mx-auto flex items-center  relative w-full">
          {/* Hug Image */}
          <div className="relative z-10 ">
            <img src={hug} alt="Hug Image" className="lg:h-64 sm:h-64 h-40" />
          </div>

          {/* Note Image */}
          <div className="absolute z-0 lg:left-96 sm:left-96 left-44 transform -translate-x-1/2 ">
            <img
              src={notes}
              alt="Notes Image"
              className="lg:h-32 sm:h-24 h-16 w-[300px] "
            />
          </div>
        </div>

        {/* Text */}
        <div className="absolute left-44   lg:top-28 sm:top-28 top-[80px] flex items-center gap-2 transform -translate-x-1/2 z-20 text-center text-black sm:text-2xl lg:text-4xl text-sm">
          <div className="font-bold text-orange-500 lg:text-4xl sm:text-4xl text-base ">
            Happy Hug Day
          </div>
        </div>
      </section>
      <section className="max-w-4xl mx-auto lg:mt-20 sm:mt-20 my-2 ">
        <RollingGallery autoplay={true} pauseOnHover={true} images={images} />
      </section>

      <section>
        <div className="max-w-4xl  mx-auto sm:p-10 p-4">
          <div className="w-full bg-[#F5B98D] flex items-center ">
            {/* Container for the vertical color blocks */}

            <div className="lg:w-44 lg:h-64 sm:h-64 w-20 h-48 bg-[#EE714B]"></div>
            <div className="lg:w-44 lg:h-64 sm:h-64  w-20 h-48 bg-[#FDA76F] "></div>

            {/* Text and image container */}
            <div className="flex items-center ml-4">
              {/* Text Section */}
              <div className="lg:text-lg sm:text-lg text-[11px] font-semibold text-black">
                Happy Hug Day, my love! ❤ I can ' t wait to feel your warm
                embrace. 😘 You make me feel safe and loved.
              </div>
              {/* Image Section */}
              <img
                src={handshake}
                alt="hand"
                className="lg:h-60 sm:h-60 h-24 w-auto ml-4"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
            {/* Testimonial 1 */}
            {getImages(2, 6).map((imageUrl, idx) => (
              <>
                <div className="relative px-4 flex justify-center">
                  <img
                    src={img1}
                    className="h-[150px] w-[150px] absolute  -top-4  lg:left-0 lg:right-0 mx-auto "
                  />

                  <div className=" text-red-500 font-semibold text-center uppercase h-[300px] rounded-[2rem] border-4 border-[#EE714B] w-[350px] pt-10 mt-[50px] flex flex-col items-center gap-2">
                    {idx == 2
                      ? "Hugs make everything 💖"
                      : idx == 3
                      ? "Sending you cozy hugs 🤗"
                      : idx == 4
                      ? "Wrapped in warm hugs 💕"
                      : "Hugs are pure magic 🫂"}
                    <img
                      src={imageUrl}
                      alt=""
                      className=" h-[200px] w-[220px] rounded-xl"
                    />
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

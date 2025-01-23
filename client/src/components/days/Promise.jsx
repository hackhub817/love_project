import bgPromise from "../../assets/Promise/bgPromise.png";
import cloud from "../../assets/Promise/cloud.png";
import dance from "../../assets/Promise/dancePanda.png";
import HeroCloud from "../../assets/Promise/HeroCloud.png";
import kissPanda from "../../assets/Promise/kissPanda.png";
import couple2 from "../../assets/hug/couple2.jpg";
import ScratchToReveal from "../../components/ui/scratch-to-reveal";

import panda1 from "../../assets/Promise/panda1.png";
import panda3 from "../../assets/Promise/panda3.png";
import panda4 from "../../assets/Promise/panda4.png";
import panda5 from "../../assets/Promise/panda5.png";
import panda6 from "../../assets/Promise/panda6.png";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPromiseDayData } from "../../Pages/api/Api";
import { toast } from "sonner";

const Promise = ({ isPreview, previewImages, messages, ...previewData }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [promiseData, setPromiseData] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const fetchPromiseData = async () => {
      try {
        setLoading(true);
        const response = await getPromiseDayData(username);
        if (response.success) {
          setPromiseData(response.dayData);
        }
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
  }, [isPreview, username, previewImages, messages, previewData]);

  // Helper function to get images
  const getImages = (start, end) => {
    const images = isPreview ? previewImages : promiseData?.images;
    return images?.slice(start, end) || Array(end - start).fill(couple2);
  };

  return (
    <>
      <div
        className="bg-cover   w-full py-10"
        style={{
          backgroundImage: `url(${bgPromise})`,
        }}
      >
        <div className="max-w-4xl mx-auto ">
          <div className=" flex items-center px-2 justify-center lg:gap-10 sm:gap-10 gap-2  ">
            <div>
              {getImages(0, 1).map((imageUrl, idx) => (
                <img
                  key={idx}
                  src={imageUrl}
                  alt={`Image ${idx + 1}`}
                  className="h-44 border-[5px] border-b-[20px] border-white"
                />
              ))}
            </div>
            <div>
              <img src={HeroCloud} alt="" className="h-28" />
            </div>
          </div>
          <div className="pt-20 flex ">
            <img src={cloud} alt="" className="w-96" />
            <img src={cloud} alt="" className="w-96" />
            <img src={cloud} alt="" className="w-96" />
          </div>
          <div>
            <div className="flex gap-10 lg:-mt-10 sm:-mt-10 -mt-5 px-2">
              <div>
                <div className="lg:h-44 sm:h-44 h-32 w-1 lg:ml-28 sm:ml-28 ml-10 bg-[#51A9FE]"></div>
                <div className="lg:w-64 lg:h-64 sm:w-64 sm:h-64  w-20 h-28">
                  <img
                    src={couple2}
                    alt=""
                    className=" lg:border-[10px]  lg:border-b-[50px] sm:border-[10px]  sm:border-b-[50px] border-[5px] border-b-[20px] border-[#51A9FE]"
                  />
                </div>
              </div>
              <div>
                <div className="lg:h-32 sm:h-32 h-20 w-1 lg:ml-20 sm:ml-20 ml-8 bg-[#51A9FE]"></div>
                <div className="lg:w-48 lg:h-48 sm:w-48 sm:h-48 h-16 w-18">
                  <img
                    src={couple2}
                    alt=""
                    className=" lg:border-[10px] lg:border-b-[40px] sm:border-[10px] sm:border-b-[40px] border-[4px] border-b-[10px] border-[#51A9FE]"
                  />
                </div>
              </div>
              <div>
                <div className="lg:h-44 sm:h-44 h-32 w-1 lg:ml-28 sm:ml-28 ml-10 bg-[#51A9FE]"></div>
                <div className="lg:w-64 lg:h-64 sm:w-64 sm:h-64  w-20 h-28">
                  <img
                    src={couple2}
                    alt=""
                    className=" lg:border-[10px]  lg:border-b-[50px] sm:border-[10px]  sm:border-b-[50px] border-[5px] border-b-[20px] border-[#51A9FE]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-20 p-4 flex justify-center">
            <ScratchToReveal
              width={700}
              height={250}
              minScratchPercentage={70}
              className="flex items-center justify-center overflow-hidden rounded-2xl border-2 bg-gray-100"
              gradientColors={["#51A9FE", "#F38CB8", "#51A9FE"]}
            >
              <p className="lg:text-6xl sm:text-6xl text-4xl font-bold">
                Love You Baby
              </p>
            </ScratchToReveal>
          </div>
          <div className="px-10  lg:py-20 sm:py-20 py-10 flex items-center lg:gap-12 sm:gap-12 gap-2">
            <div className="relative lg:border-[20px] sm:lg:border-[20px] border-[8px] border-[#A3CFF9] rounded-2xl">
              {" "}
              <img
                src={couple2}
                alt=""
                className="lg:h-64 lg:w-80 sm:h-64 sm:w-80 rounded-2xl h-32 w-44"
              />
              <img
                src={dance}
                alt=""
                className="absolute lg:-top-20 sm:-top-20 -top-12 lg:left-28 sm:left-28 left-6 lg:h-32 sm:h-32 h-16 rounded-2xl"
              />
            </div>
            <div className="relative lg:border-[20px] sm:border-[20px] border-[8px] border-[#A3CFF9] rounded-xl">
              {" "}
              <img
                src={couple2}
                alt=""
                className="lg:h-64 lg:w-80 sm:h-64 h-32 w-44 sm:w-80 rounded-2xl"
              />
              <img
                src={dance}
                alt=""
                className="absolute lg:-top-20 sm:-top-20 -top-12 lg:left-28 sm:left-28 left-6 lg:h-32 sm:h-32 h-16 rounded-2xl"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <div>
                <img
                  src={panda1}
                  alt=""
                  className="lg:h-auto sm:h-auto lg:w-auto sm:w-auto h-16 w-28"
                />
              </div>
              <div className="bg-[#A3CFF9] rounded-3xl w-full"></div>
              <div>
                <img
                  src={panda1}
                  alt=""
                  className="lg:h-auto sm:h-auto lg:w-auto sm:w-auto h-16 w-28"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <img
                  src={panda5}
                  alt=""
                  className="lg:h-auto sm:h-auto lg:w-auto sm:w-auto h-20 w-28"
                />
              </div>
              <div className="bg-[#A3CFF9] rounded-3xl w-full"></div>
              <div>
                <img
                  src={panda5}
                  alt=""
                  className="lg:h-auto sm:h-auto lg:w-auto sm:w-auto h-20 w-28"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <img
                  src={panda3}
                  alt=""
                  className="lg:h-auto sm:h-auto lg:w-auto sm:w-auto h-20 w-28"
                />
              </div>
              <div className="bg-[#A3CFF9] rounded-3xl w-full"></div>
              <div>
                <img
                  src={panda3}
                  alt=""
                  className="lg:h-auto sm:h-auto lg:w-auto sm:w-auto h-20 w-28"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Promise;

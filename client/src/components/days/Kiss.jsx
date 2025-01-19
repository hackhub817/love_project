import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { getKissDayData } from "../../Pages/api/Api";
import bg from "../../assets/kiss/bg.png";
import kiss from "../../assets/kiss/pandakiss.png";
import message from "../../assets/kiss/message.png";
import couple2 from "../../assets/hug/couple2.jpg";
import dil from "../../assets/kiss/dil.png";
import love from "../../assets/kiss/lovelove.png";

import img from "../../assets/kiss/img-2.png";
import kissfooter from "../../assets/kiss/kissfooter.png";

export const Kiss = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [kissData, setKissData] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const fetchKissData = async () => {
      try {
        setLoading(true);
        const response = await getKissDayData(username);
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

    if (username) {
      fetchKissData();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-900"></div>
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

  return (
    <div className="bg-pink-200  relative">
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
          <div className="relative flex items-center justify-center -mt-12 ">
            <img src={message} alt="Panda Kiss" className="" />
            <div className="lg:top-5 sm:top-5 top-2 lg:px-0 sm:px-0 px-4 absolute font-bold text-white lg:text-5xl sm:text-5xl text-2xl">
              Happy Kiss day
            </div>
          </div>
        </div>
        <div className="flex items-center lg:px-0 sm:px-0 px-4">
          <div className="bg-pink lg:p-8 sm:p-8 p-2 rounded-tl-xl lg:text-xl sm:text-xl text-sm rounded-bl-xl bg-pink-500 sm:h-[250px] lg:h-[250px] h-[180px]">
            {" "}
            Happy Hug Day, my love! ❤ I can ' t wait to feel your warm embrace.
            😘 You make me feel safe and loved. 🥰 Let's hug tight and cherish
            this moment. 💕
          </div>
          <div className="relative my-10">
            <img
              src={kissData?.images[0]}
              alt=""
              className="border-[10px] rounded-tr-xl rounded-br-xl border-pink-500 lg:w-[600px] sm:w-[600px] w-[1000px] sm:h-[250px] lg:h-[250px] h-[180px]"
            />
            <div className="flex items-center justify-center lg:block sm:block hidden">
              <div className="absolute top-0 -mt-5 ">
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
                className="lg:h-20 lg:w-20 sm:h-20 sm:w-20 h-10 w-10  "
              />
              <img
                src={img}
                alt=""
                className="lg:h-28 lg:w-28 sm:h-28 sm:w-28 h-8 w-8  "
              />
            </div>
            {kissData?.images.slice(1, 4).map((imageUrl, idx) => (
              <img
                src={imageUrl}
                alt=""
                className="lg:w-[250px] sm:w-[250px] sm:h-[280px]  lg:h-[280px] w-[135px] h-[120px] py-4 px-1"
              />
            ))}
          </div>
        </div>
        <div className="relative py-10">
          <img src={kissfooter} alt="" className="w-full" />
          <img
            src={kissData?.images[4]}
            alt=""
            className="absolute lg:top-24 lg:left-[28px] lg:w-[276px] lg:h-[335px] sm:top-[85px] sm:left-[28px] sm:w-[236px] sm:h-[290px] top-14 left-[12px] w-[95px] h-[125px]"
          />
        </div>
      </section>
    </div>
  );
};

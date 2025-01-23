import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTeddyDayData } from "../../Pages/api/Api";
import { toast } from "sonner";
import flower from "../../assets/teddy/flower.png";
import bg from "../../assets/teddy/bg.png";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import couple1 from "../../assets/hug/couple1.jpg";
import sit from "../../assets/teddy/sittingTeddy.png";
import love from "../../assets/teddy/love.png";
import loveteddy from "../../assets/teddy/loveteddy.png";
import loveteddy2 from "../../assets/teddy/teddylove2.png";
import ballon from "../../assets/teddy/ballon.png";
import wall from "../../assets/teddy/wall.png";
import hand from "../../assets/teddy/hand.png";
import bg2 from "../../assets/teddy/bg2.png";
// import AnimatedTestimonials from "../../components/ui/animated-testimonials";

export const Teddy = ({ isPreview }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teddyData, setTeddyData] = useState(null);
  const navigate = useNavigate();
  const { username } = useParams(); // Get username from URL

  // const testimonials = [
  //   {
  //     quote:
  //       "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
  //     name: "Sarah Chen",
  //     designation: "Product Manager at TechFlow",
  //     src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     quote:
  //       "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
  //     name: "Michael Rodriguez",
  //     designation: "CTO at InnovateSphere",
  //     src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     quote:
  //       "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
  //     name: "Emily Watson",
  //     designation: "Operations Director at CloudScale",
  //     src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     quote:
  //       "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
  //     name: "James Kim",
  //     designation: "Engineering Lead at DataPro",
  //     src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     quote:
  //       "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
  //     name: "Lisa Thompson",
  //     designation: "VP of Technology at FutureNet",
  //     src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  // ];
  if (!isPreview) {
    useEffect(() => {
      const fetchTeddyData = async () => {
        try {
          setLoading(true);
          const response = await getTeddyDayData(username);
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

      if (username) {
        fetchTeddyData();
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
  }

  const words = [
    {
      text: "Happy",
    },
    {
      text: "Teddy",
    },
    {
      text: "Day",
    },
    {
      text: "My ",
    },
    {
      text: "Love.",
      className: "text-red-500 ",
    },
  ];

  return (
    <div className="bg-pink-200  relative">
      {/* Background Image with Opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <div className="absolute inset-0 bg-white opacity-[.75]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <section className="max-w-4xl mx-auto lg:p-4 sm:p-4">
          <div className="flex items-center  justify-center">
            <img src={flower} alt="" className="lg:h-80 sm:h-72 h-28" />
            <div>
              <TypewriterEffectSmooth
                className="lg:text-4xl sm:text-4xl text-2xl"
                words={words}
              />
            </div>
          </div>
        </section>
        <section className="max-w-4xl mx-auto mt-5 sm:px-4">
          <div className="bg-[#483F2C] lg:h-96 sm:h-96 h-52 grid grid-cols-3 gap-10">
            {teddyData ? (
              teddyData?.images
                .slice(0, 3)
                .map((imageUrl, idx) => (
                  <img
                    key={idx}
                    src={imageUrl}
                    alt={`Image ${idx + 1}`}
                    className="w-full lg:h-96 sm:h-96 h-48 object-cover py-10"
                  />
                ))
            ) : (
              <>
                <img
                  src={couple1}
                  alt={`Image 1`}
                  className="w-full lg:h-96 sm:h-96 h-48 object-cover py-10"
                />
                <img
                  src={couple1}
                  alt={`Image 2`}
                  className="w-full lg:h-96 sm:h-96 h-48 object-cover py-10"
                />
                <img
                  src={couple1}
                  alt={`Image 3`}
                  className="w-full lg:h-96 sm:h-96 h-48 object-cover py-10"
                />
              </>
            )}
          </div>
        </section>
        <section className="max-w-4xl mx-auto mt-5 relative sm:px-6">
          <div className="flex items-center p-2">
            {/* Background Box */}
            <div className="bg-[#483F2C]  lg:h-72 sm:h-64 h-52  rounded-[40px] relative z-10 lg:p-12 sm:p-12 p-4 pl-3 -mr-10">
              <div className="lg:text-2xl sm:text-2xl text-lg text-center text-white ">
                Happy Teddy Day!
              </div>
              <div className="lg:text-lg sm:text-lg text-xs text-white px-4">
                All our adventures together, from silly movie nights to
                exploring new places, feel like the best cuddles with my
                favorite teddy bear. 🐻❤️ You know, I feel like I've found my
                forever cuddle buddy in you. 🐻 ❤️ You're always there for me, a
                constant source of comfort and joy. Happy Teddy Day, my love.
              </div>
            </div>

            {/* Image */}
            <img
              src={sit}
              alt="Image 1"
              className="lg:w-full lg:h-auto sm:h-64 h-32 object-cover relative z-20 -ml-24"
            />
          </div>
        </section>
        <section className="max-w-4xl mx-auto mt-5 sm:px-5  ">
          <div className="flex items-center">
            <img
              src={loveteddy}
              alt="Image 1"
              className="lg:w-44 lg:h-44 sm:w-32 sm:h-32 h-16   object-cover relative z-20 lg:-ml-10 sm:-ml-10 -ml-2"
            />
            <img
              src={love}
              alt="Image 1"
              className="lg:w-44 lg:h-44 sm:w-32 sm:h-32 h-16   object-cover relative z-20 lg:-ml-6 sm:-ml-10 -ml-2"
            />
            <img
              src={love}
              alt="Image 1"
              className="lg:w-44 lg:h-44 sm:w-32 sm:h-32 h-16   object-cover relative z-20 lg:-ml-6 sm:-ml-10 -ml-2"
            />
            <img
              src={love}
              alt="Image 1"
              className="lg:w-44 lg:h-44 sm:w-32 sm:h-32 h-16   object-cover relative z-20 lg:-ml-6 sm:-ml-10 -ml-2"
            />
            <img
              src={loveteddy2}
              alt="Image 1"
              className="lg:w-44 lg:h-44 sm:w-32 sm:h-32 h-16   object-cover relative z-20 lg:-ml-10 sm:-ml-10 -ml-2"
            />
          </div>
        </section>
        <section className="max-w-4xl mx-auto mt-5 lg:px-2 sm:px-2 relative">
          <div className="flex items-center relative">
            {/* Ballon Image */}
            <img
              src={ballon}
              alt="Image 1"
              className="lg:h-96 sm:h-72 h-40 lg:w-96 sm:w-72 w-28 lg:mb-10 sm:mb-10 mb-8 object-cover relative z-10 lg:-mr-40 sm:-mr-40 -mr-10"
            />

            {/* Wall Image */}
            <div className="relative  ">
              <img
                src={wall}
                alt="Wall Image"
                className="lg:h-full sm:h-56 h-32 lg:w-[850px] sm:w-[550px] w-[210px] object-cover relative  "
              />

              {/* Three Smaller Images */}
              <div className="absolute top-10 lg:left-32 sm:left-32 left-8 w-full flex lg:gap-10 sm:gap-10 gap-2 -mt-5 z-20">
                {teddyData ? (
                  teddyData?.images
                    .slice(3, 6)
                    .map((imageUrl, idx) => (
                      <img
                        src={imageUrl}
                        alt={`Small Image ${idx + 1}`}
                        className="lg:h-24 lg:w-24 sm:h-24 sm:w-24 h-12 w-12 border-4 border-white border-b-[14px] shadow-md"
                      />
                    ))
                ) : (
                  <>
                    {" "}
                    <img
                      src={couple1}
                      alt="Small Image 1"
                      className="lg:h-24 lg:w-24 sm:h-24 sm:w-24 h-12 w-12  border-4 border-white border-b-[14px] shadow-md"
                    />{" "}
                    <img
                      src={couple1}
                      alt="Small Image 1"
                      className="lg:h-24 lg:w-24 sm:h-24 sm:w-24 h-12 w-12  border-4 border-white border-b-[14px] shadow-md"
                    />{" "}
                    <img
                      src={couple1}
                      alt="Small Image 1"
                      className="lg:h-24 lg:w-24 sm:h-24 sm:w-24 h-12 w-12  border-4 border-white border-b-[14px] shadow-md"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="max-w-4xl mx-auto  px-2 relative">
          <div className="flex items-center relative">
            <img
              src={hand}
              alt="Image 1"
              className="lg:h-64 sm:h-48 h-32 lg:w-64 sm:w-64 w-24 object-cover relative z-20 lg:ml-20 sm:ml-32"
            />

            {/* BG2 Image */}
            <div className="relative lg:w-[550px] sm:w-[450px] w-[300px] px-2 lg:h-60 sm:h-60 h-64 ">
              <img
                src={bg2}
                alt="Background Image"
                className="w-full h-full object-cover"
              />

              {/* Text Overlay */}
              <div className="absolute inset-0 flex items-center justify-center text-center text-white p-4">
                <div>
                  <p className="lg:text-lg sm:text-base text-xs font-semibold mt-2">
                    All our adventures together, from silly movie nights to
                    exploring new places, feel like the best cuddles with my
                    favorite teddy bear. 🐻❤️ You know, I feel like I've found
                    my forever cuddle buddy in you. 🐻 ❤️ You're always there
                    for me, a constant source of comfort and joy. Happy Teddy
                    Day, my love.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section>
          <AnimatedTestimonials testimonials={testimonials} />
        </section> */}
      </div>
    </div>
  );
};

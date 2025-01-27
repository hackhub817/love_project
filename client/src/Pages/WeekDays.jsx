import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import boy from "../assets/weekday/boy.png";
import finish from "../assets/weekday/finish.png";
import girl from "../assets/weekday/girl.png";
import road2 from "../assets/weekday/fial.png";
import rose from "../assets/weekday/rose.jpeg";
import road from "../assets/weekday/road.svg";
import { Button } from "../components/ui/moving-border";
import start from "../assets/weekday/start.png";
import { Link } from "react-router-dom";
import choclateIcon from "../assets/icon/icon/choclate-icon.png";
import hugIcon from "../assets/icon/icon/hug-icon.png";
import kissIcon from "../assets/icon/icon/kiss-icon.png";
import promiseIcon from "../assets/icon/icon/promise.png";
import proposeIcon from "../assets/icon/icon/propose-icon.png";
import roseIcon from "../assets/icon/icon/rose-icon.png";
import teddyIcon from "../assets/icon/icon/teddy-icon.png";
import valentineIcon from "../assets/icon/icon/valentine-icon.png";
import one from "../assets/weekdays/1.png";
import two from "../assets/weekdays/2.png";
import three from "../assets/weekdays/3.png";
import four from "../assets/weekdays/4.png";
import five from "../assets/weekdays/5.png";
import six from "../assets/weekdays/6.png";
import seven from "../assets/weekdays/7.png";
import eight from "../assets/weekdays/8.png";
import roadmap from "../assets/roadmap.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

const TimelineEvent = ({ position, date, day, imageSize = 100 }) => {
  const navigate = useNavigate();
  const [dimensions, setDimensions] = useState({ width: 150, height: 150 });

  const { username } = useParams();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setDimensions({ width: 300, height: 300 }); // For large screens (xl)
      } else if (window.innerWidth >= 1024) {
        setDimensions({ width: 300, height: 300 }); // For medium screens (lg)
      } else {
        setDimensions({ width: 150, height: 150 }); // Default size
      }
    };

    // Set initial dimensions on component mount
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="relative flex items-center">
      {/* Container for alternating layout */}
      <div
        className={`flex w-full ${
          position === "right" ? "justify-end" : "justify-start"
        }`}
      >
        {/* Image circle with border */}
        <div className="relative">
          <div
            className=" overflow-hidden p-2 -mt-16"
            style={{
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
            }}
          >
            <Link to={`/${username}/${day}`}>
              <img
                // onClick={() => navigate(`/${username}/day`)}
                src={date}
                alt={date}
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export const WeekDays = () => {
  const { username } = useParams();
  console.log("params", username);
  const words = [
    {
      text: "Hy ",
      className: "text-white",
    },
    {
      text: "Love",
      className: "text-white",
    },
    {
      text: "Surprise ",
      className: "text-white",
    },
    {
      text: "For  ",
      className: "text-white",
    },
    {
      text: "You",
      className: "text-white",
    },
  ];
  const events = [
    { date: one, position: "left", day: "rose" },
    { date: two, position: "right", day: "propose" },
    { date: four, position: "left", day: "chocolate" },
    { date: three, position: "right", day: "teddy" },
    { date: five, position: "left", day: "promise" },
    { date: six, position: "right", day: "hug" },
    { date: seven, position: "left", day: "kiss" },
    { date: eight, position: "right", day: "valentine" },
  ];
  return (
    <>
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: `url(${roadmap})` }}
      >
        <div className="max-w-4xl mx-auto p-1 ">
          <div className="flex items-center justify-center">
            <TypewriterEffectSmooth className="" words={words} />
          </div>
          <div className="bg-pink-400 md:mb-10 py-2 md:py-4 rounded-xl p-2">
            <div className="text-center text-white italic font-light text-base md:text-3xl">
              Let's make this Valentine's Week unforgettable
            </div>
          </div>

          <div className=" pt-16 ">
            <div className="relative">
              {events.map((event, index) => (
                <TimelineEvent
                  key={index}
                  date={event.date}
                  day={event.day}
                  position={event.position}
                />
              ))}
            </div>
          </div>

          {/* <div className=" px-2">
            <img src={boy} alt="" className="w-20 " />
            <div
              className="-mt-32  w-[320px] h-[600px] bg-center bg-cover "
              style={{ backgroundImage: `url(${road2})` }}
            >
              <div className="flex  pt-16">
                <Link to={`/${username}/rose`}>
                  <div className="px-[80px] ">
                    <div className="font-semibold text-sm text-gray-500">
                      Rose Day
                    </div>
                    <div className="bg-pink-300 rounded-full h-14 w-14">
                      <div className="flex items-center justify-center h-14 w-14 ">
                        <img
                          src={roseIcon}
                          alt=""
                          className="h-14 w-14 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to={`/${username}/propose`}>
                  <div className="">
                    <div className="font-semibold text-sm text-gray-500">
                      Propose Day
                    </div>
                    <div className="bg-pink-300 rounded-full h-14 w-14">
                      <div className="flex items-center justify-center h-14 w-14 ">
                        <img
                          src={proposeIcon}
                          alt=""
                          className="h-14 w-14 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="flex items-center gap-24 pt-6">
                <Link to={`/${username}/chocolate`}>
                  <div className="px-[4px] ">
                    <div className="flex ">
                      <div className="font-semibold text-sm w-14 text-gray-500">
                        Chocolate Day
                      </div>
                      <div className="bg-pink-300 rounded-full flex items-center justify-center h-14 w-14 ">
                        <img
                          src={choclateIcon}
                          alt=""
                          className="h-14 w-14 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </Link>{" "}
                <Link to={`/${username}/teddy`}>
                  <div className="-mt-5">
                    <div className="font-semibold text-sm text-gray-500">
                      Teddy Day
                    </div>
                    <div className="bg-pink-300 rounded-full h-14 w-14">
                      <div className="flex items-center justify-center h-14 w-14 ">
                        <img
                          src={teddyIcon}
                          alt=""
                          className="h-14 w-14 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="flex items-center gap-10 ">
                <div className=" flex  gap-2 pt-2">
                  <Link to={`/${username}/promise`}>
                    <div className="bg-pink-300 rounded-full h-14 w-14">
                      <div className="flex items-center justify-center h-14 w-14 ">
                        <img
                          src={promiseIcon}
                          alt=""
                          className="h-14 w-14 rounded-full"
                        />
                      </div>
                    </div>
                  </Link>
                  <div className="font-semibold text-sm text-gray-500 mt-2">
                    Promise Day
                  </div>
                </div>
                <div className=" flex items-center gap-2 pt-4">
                  <Link to={`/${username}/hug`}>
                    <div className="bg-pink-300 rounded-full h-14 w-14">
                      <div className="flex items-center justify-center h-14 w-14 ">
                        <img
                          src={hugIcon}
                          alt=""
                          className="h-14 w-14 rounded-full"
                        />
                      </div>
                    </div>
                  </Link>
                  <div className="font-semibold text-sm text-gray-500">
                    Hug Day
                  </div>
                </div>
              </div>
              <div className="px-[10px] pt-6 ">
                <div className="flex items-center gap-2 ">
                  <div className="font-semibold text-sm text-gray-500">
                    Kiss Day
                  </div>
                  <Link to={`/${username}/kiss`}>
                    <div className="bg-pink-300 rounded-full flex items-center justify-center h-14 w-14 ">
                      <img
                        src={kissIcon}
                        alt=""
                        className="h-14 w-14 rounded-full"
                      />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="pl-28 pt-4 ">
                  <div className="flex items-center gap-2 ">
                    <Link to={`/${username}/valintine`}>
                      <div className="bg-pink-300 rounded-full flex items-center justify-center h-14 w-14 ">
                        <img
                          src={valentineIcon}
                          alt=""
                          className="h-14 w-14 rounded-full"
                        />
                      </div>
                    </Link>
                    <div className="font-semibold text-sm text-gray-500">
                      Valentine Day
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

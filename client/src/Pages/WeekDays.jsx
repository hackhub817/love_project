import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { verifyUser } from "../Pages/api/Api";
import { isDateLocked, VALENTINE_DATES } from "../utils/dateUtils";
import boy from "../assets/weekday/boy.png";
import finish from "../assets/weekday/finish.png";
import girl from "../assets/weekday/girl.png";
import road2 from "../assets/weekday/fial.png";
import rose from "../assets/weekday/rose.jpeg";
import road from "../assets/weekday/road.svg";
import { Button } from "../components/ui/moving-border";
import start from "../assets/weekday/start.png";
import choclateIcon from "../assets/icon/icon/choclate-icon.png";
import hugIcon from "../assets/icon/icon/hug-icon.png";
import kissIcon from "../assets/icon/icon/kiss-icon.png";
import promiseIcon from "../assets/icon/icon/promise.png";
import proposeIcon from "../assets/icon/icon/propose-icon.png";
import roseIcon from "../assets/icon/icon/rose-icon.png";
import teddyIcon from "../assets/icon/icon/teddy-icon.png";
import valentineIcon from "../assets/icon/icon/valentine-icon.png";
import roadmap from "../assets/roadmap.png";
import lock from "../assets/lock.jpeg";
import one from "../assets/weekdays/1.png";
import two from "../assets/weekdays/2.png";
import three from "../assets/weekdays/3.png";
import four from "../assets/weekdays/4.png";
import five from "../assets/weekdays/5.png";
import six from "../assets/weekdays/6.png";
import seven from "../assets/weekdays/7.png";
import eight from "../assets/weekdays/8.png";

const TimelineEvent = ({ position, date, day, imageSize = 100, isLocked }) => {
  const navigate = useNavigate();
  const [dimensions, setDimensions] = useState({ width: 150, height: 150 });
  const { username } = useParams();

  // Handle resize effect
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setDimensions({ width: 300, height: 300 });
      } else if (window.innerWidth >= 1024) {
        setDimensions({ width: 300, height: 300 });
      } else {
        setDimensions({ width: 150, height: 150 });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (e) => {
    if (isLocked && isDateLocked(day)) {
      e.preventDefault();
      toast.error(
        `This page will be available on ${new Date(
          VALENTINE_DATES[day]
        ).toLocaleDateString()}`
      );
    }
  };

  return (
    <div className="relative flex items-center">
      <div
        className={`flex w-full ${
          position === "right" ? "justify-end" : "justify-start"
        }`}
      >
        <div className="relative">
          <div
            className="overflow-hidden p-2 -mt-16"
            style={{
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
            }}
          >
            <Link
              to={`/${username}/${day}`}
              onClick={handleClick}
              className="block relative"
            >
              <img
                src={date}
                alt={date}
                className={`w-full h-full object-cover ${
                  isLocked && isDateLocked(day) ? "opacity-50" : ""
                }`}
              />
              {isLocked && isDateLocked(day) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src={lock} alt="Locked" className="w-12 h-12" />
                  <div className="absolute bottom-0 left-0 right-0 text-center text-white bg-black bg-opacity-50 py-1 text-sm">
                    {new Date(VALENTINE_DATES[day]).toLocaleDateString()}
                  </div>
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WeekDays = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await verifyUser(username);
        setUserData(response.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [username]);

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
                  isLocked={userData?.isLocked}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

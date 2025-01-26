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
import { useParams } from "react-router-dom";

export const WeekDays = () => {
  const { username } = useParams();
  console.log("params", username);
  const words = [
    {
      text: "Hy ",
    },
    {
      text: "Love",
      className: "text-red-500",
    },
    {
      text: "Surprise ",
    },
    {
      text: "For  ",
    },
    {
      text: "You",
    },
  ];
  return (
    <>
      <div
        className="bg-pink-200
      "
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center">
            <TypewriterEffectSmooth className="" words={words} />
          </div>

          <div className=" px-2">
            <img src={boy} alt="" className="w-20 " />
            <div
              className="-mt-32  w-[320px] h-[600px] bg-center bg-cover "
              style={{ backgroundImage: `url(${road2})` }}
            >
              <div className="flex  pt-16">
                <Link to={`/rose-day/piyush`}>
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
                      <div className="font-semibold text-sm text-gray-500">
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
          </div>
        </div>
      </div>
    </>
  );
};

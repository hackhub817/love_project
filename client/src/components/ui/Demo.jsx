import couple1 from "../../assets/hug/couple1.jpg";
import couple2 from "../../assets/hug/couple2.jpg";
import couple3 from "../../assets/hug/couple3.jpg";
import couple4 from "../../assets/hug/couple4.jpg";
import banner from "../../assets/hug/banner.png";
import love_ballon from "../../assets/hug/love_ballon.png";

export const Demo = () => {
  return (
    <div className="max-w-4xl mx-auto relative">
      <div className="flex items-center justify-between px-40 ">
        <div>
          <img
            src={couple1}
            alt=""
            className="absolute -z-10 top-10  h-[200px] w-[250px] border-[6px] rounded-xl border-t-[30px] border-[#EE714B]"
          />
        </div>
        <div>
          <img
            src={couple2}
            alt=""
            className="absolute top-10 right-10 h-[200px] w-[250px] border-[6px] rounded-xl border-t-[30px] border-[#EE714B]"
          />
        </div>
      </div>
      <div className="flex items-center justify-between ">
        <div>
          <img
            src={couple3}
            alt=""
            className="h-[200px] w-[200px] absolute top-48 border-[6px] rounded-xl border-t-[30px] border-[#EE714B]"
          />
        </div>
        <div>
          <img
            src={love_ballon}
            alt=""
            className="h-[300px]  absolute top-40 left-[360px] "
          />
        </div>
        <div>
          <img
            src={couple4}
            alt=""
            className=" absolute top-48 left-[800px] h-[200px] w-[200px] z-10 border-[6px] rounded-xl border-t-[30px] border-[#EE714B]"
          />
        </div>
      </div>
      <div className="flex items-center justify-between px-40">
        <div>
          <img
            src={couple2}
            alt=""
            className="absolute top-[350px] -z-10 h-[200px] w-[250px] border-[6px] rounded-xl border-t-[30px] border-[#EE714B]"
          />
        </div>
        <div>
          <img
            src={couple1}
            alt=""
            className="h-[200px] right-10 w-[250px] absolute top-[350px] border-[6px] rounded-xl border-t-[30px] border-[#EE714B] -z-10 "
          />
        </div>
      </div>
    </div>
  );
};

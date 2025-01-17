import bg from "../../assets/kiss/bg.png";
import kiss from "../../assets/kiss/pandakiss.png";
import message from "../../assets/kiss/message.png";
import couple2 from "../../assets/hug/couple2.jpg";
import dil from "../../assets/kiss/dil.png";

export const Kiss = () => {
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
            <div className="top-5 absolute font-bold text-white text-5xl">
              Happy Kiss day
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-pink p-8 rounded-tl-xl rounded-bl-xl bg-pink-500 h-[250px]">
            {" "}
            Happy Hug Day, my love! ❤ I can ' t wait to feel your warm embrace.
            😘 You make me feel safe and loved. 🥰 Let's hug tight and cherish
            this moment. 💕
          </div>
          <div className="relative my-10">
            <img
              src={couple2}
              alt=""
              className="border-[10px] rounded-tr-xl rounded-br-xl border-pink-500 w-[600px] h-[250px]"
            />
            <div className="flex items-center justify-center">
              <div className="absolute top-0 -mt-5 ">
                <img src={dil} alt="" className="" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-pink-500">
          <div className="flex items-center justify-end ">
            <img src={couple2} alt="" className="w-[200px] p-4 h-[150px]" />
            <img src={couple2} alt="" className="w-[200px] p-4 h-[150px]" />
            <img src={couple2} alt="" className="w-[200px] p-4 h-[150px]" />
          </div>
        </div>
      </section>
    </div>
  );
};

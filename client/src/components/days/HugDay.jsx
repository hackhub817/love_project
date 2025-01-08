import bgShape from "../../assets/hug/background.png";
import hug from "../../assets/hug/HeroHugImage.png";
import notes from "../../assets/hug/Note.png";
import love from "../../assets/hug/love.png";
import handshake from "../../assets/hug/handshake.png";
import img1 from "../../assets/hug/img-1.png";
import img2 from "../../assets/hug/img-2.png";
import img3 from "../../assets/hug/img-3.png";
import img4 from "../../assets/hug/img-4.png";
import couple1 from "../../assets/hug/couple1.jpg";
import couple2 from "../../assets/hug/couple2.jpg";
import couple3 from "../../assets/hug/couple3.jpg";
import couple4 from "../../assets/hug/couple4.jpg";
export const HugDay = () => {
  return (
    <div
      className="w-full  bg-cover bg-center"
      style={{ backgroundImage: `url(${bgShape})` }}
    >
      <section className="relative">
        <div className="max-w-4xl mx-auto flex items-center  relative">
          {/* Hug Image */}
          <div className="relative z-10">
            <img src={hug} alt="Hug Image" className="lg:h-64 sm:h-64 h-32" />
          </div>

          {/* Note Image */}
          <div className="absolute z-0 lg:left-96 sm:left-96 left-1/2 transform -translate-x-1/2">
            <img src={notes} alt="Notes Image" className="lg:h-32 sm:h-24 " />
          </div>
        </div>

        {/* Text */}
        <div className="absolute left-2/4   lg:top-28 sm:top-28 top-14 flex items-center gap-2 transform -translate-x-1/2 z-20 text-center text-black sm:text-2xl lg:text-4xl text-sm">
          <img src={love} className="lg:h-10 lg:w-12 sm:h-10 sm:w-12 h-5 w-7" />
          <div>Happy Hug Day</div>
        </div>
      </section>
      <section>
        <div className="max-w-4xl mx-auto sm:p-10 p-4">
          <div className="w-full bg-[#F5B98D] flex items-center ">
            {/* Container for the vertical color blocks */}

            <div className="lg:w-44 lg:h-64 sm:h-64 w-20 h-48 bg-[#EE714B]"></div>
            <div className="lg:w-44 lg:h-64 sm:h-64  w-20 h-48 bg-[#FDA76F] "></div>

            {/* Text and image container */}
            <div className="flex items-center ml-4">
              {/* Text Section */}
              <div className="lg:text-lg sm:text-lg text-xs text-black">
                Happy Hug Day, my love! ❤ I can ' t wait to feel your warm
                embrace. 😘 You make me feel safe and loved. 🥰 Let's hug tight
                and cherish this moment. 💕
              </div>
              {/* Image Section */}
              <img
                src={handshake}
                alt="hand"
                className="lg:h-60 sm:h-60 h-32 w-auto ml-4"
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
            {/* Testimonial 1 */}
            <div className="relative p-2 flex justify-center">
              <img
                src={img1}
                className="h-[150px] w-[150px] absolute  -top-4  lg:left-0 lg:right-0 mx-auto "
              />
              <div className=" text-center uppercase h-[280px] rounded-[2rem] border-4 border-[#EE714B] w-[380px] pt-10 mt-[50px] flex flex-col items-center gap-2">
                Hello My love this is for you
                <img src={couple1} alt="" className=" h-[180px] w-[250px]" />
              </div>
            </div>
            <div className="relative p-2 flex justify-center">
              <img
                src={img2}
                className="h-[110px] w-[150px] absolute  -top-4   lg:left-0 lg:right-0 mx-auto "
              />
              <div className=" text-center uppercase h-[280px] rounded-[2rem] border-4 border-[#EE714B] w-[380px] pt-10 mt-[50px] flex flex-col items-center gap-2">
                Hello My love this is for you
                <img src={couple2} alt="" className=" h-[180px] w-[250px]" />
              </div>
            </div>
            <div className="relative p-2 flex justify-center">
              <img
                src={img3}
                className="h-[110px] w-[150px] absolute  -top-4  lg:left-0 lg:right-0 mx-auto "
              />
              <div className=" text-center uppercase h-[280px] rounded-[2rem] border-4 border-[#EE714B] w-[380px] pt-10 mt-[50px] flex flex-col items-center gap-2">
                Hello My love this is for you
                <img src={couple3} alt="" className=" h-[180px] w-[250px]" />
              </div>
            </div>
            <div className="relative p-2 flex justify-center">
              <img
                src={img4}
                className="h-[110px] w-[150px] absolute  -top-4  lg:left-0 lg:right-0 mx-auto "
              />
              <div className=" text-center uppercase h-[280px] rounded-[2rem] border-4 border-[#EE714B] w-[380px] pt-10 mt-[50px] flex flex-col items-center gap-2">
                Hello My love this is for you
                <img src={couple4} alt="" className=" h-[180px] w-[250px]" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Your content goes here */}
    </div>
  );
};

import bg from "../../assets/Rose/rosebg.png";
import dog1 from "../../assets/Rose/dog.png";
import dog2 from "../../assets/Rose/dog2.png";
import dog3 from "../../assets/Rose/dog3.png";
import side from "../../assets/Rose/side.png";
import sideview from "../../assets/Rose/sideview.png";
import tree from "../../assets/Rose/tree.png";
import propose from "../../assets/Rose/propose.png";
import surprise from "../../assets/Rose/surprise.png";

export const Rose = () => {
  return (
    <>
      <div className="bg-pink-200 h-screen py-2 relative">
        {/* Background Image with Opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${bg})`,
          }}
        >
          <div className="absolute inset-0 bg-white opacity-[0.5]"></div>
        </div>
      </div>
    </>
  );
};

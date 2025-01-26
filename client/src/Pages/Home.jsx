import { TimelineDemo } from "../components/Home/Demo";
import FeaturesSection from "../components/Home/Feature";
import HeroSection from "../components/Home/Hero";
import Navbar from "../components/Home/Navbar";
// import FallingText from "../components/FallingText";
import GiftSection from "../components/Home/Explore";

export const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <GiftSection />
    </>
  );
};

import { TimelineDemo } from "../components/Home/Demo";
import FeaturesSection from "../components/Home/Feature";
import HeroSection from "../components/Home/Hero";
import Navbar from "../components/Home/Navbar";

export const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TimelineDemo />
    </>
  );
};

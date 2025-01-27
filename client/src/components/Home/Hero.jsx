import React, { useEffect, useState } from "react";
import img1 from "../../assets/home/1.jpg";
import img2 from "../../assets/home/2.jpg";
import img3 from "../../assets/home/3.jpg";
import img4 from "../../assets/home/4.jpg";

const HeroSection = () => {
  // Array of images
  const images = [img1, img2, img3, img4];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="h-[90vh] text-white flex items-center relative overflow-hidden"></section>
  );
};

export default HeroSection;

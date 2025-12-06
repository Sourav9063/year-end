"use client";

import { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "react-hot-toast";

import { getRandomNumber } from "@/utils/random";
import { handleShare } from "@/utils/share";
import CarouselIndicator from "./components/CarouselIndicator";
import FirstCard from "./components/FirstCard";
import SecondCard from "./components/SecondCard";
import ThirdCard from "./components/ThirdCard";

export const cardIds = ["first-card", "second-card", "third-card"];

export default function Home() {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [_statsData, setStatsData] = useState({
    food: 200,
    parcel: 100,
    bike: 115,
    courier: 100,
    car: 4100,
    cng: 100,
    points: 698000,
    saved: "৳5,000",
  });

  const _handleRandomize = () => {
    setStatsData({
      food: getRandomNumber(0, 99999),
      parcel: getRandomNumber(0, 99999),
      bike: getRandomNumber(0, 99999),
      courier: getRandomNumber(0, 99999),
      car: getRandomNumber(0, 99999),
      cng: getRandomNumber(0, 99999),
      points: getRandomNumber(0, 999999),
      saved: `৳${getRandomNumber(0, 999999).toLocaleString()}`,
    });
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_current, next) => setCurrentSlide(next),
  };

  return (
    <div className="relative min-h-screen h-screen max-w-md mx-auto overflow-hidden">
      <Toaster />

      {/* Randomize button - kept for demonstration, adjust positioning as needed */}
      <button
        type="button"
        id="randomize-btn"
        onClick={_handleRandomize}
        className="px-6 py-3 rounded-full bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition-colors fixed top-4 right-4 z-50"
      >
        Randomize
      </button>

      <Slider ref={sliderRef} {...sliderSettings}>
        <FirstCard statsData={_statsData} id={cardIds[0]} />
        <SecondCard id={cardIds[1]} />
        <ThirdCard id={cardIds[2]} />
      </Slider>

      <div className="fixed bottom-0 left-0 max-w-114 m-auto right-0 p-4 bg-transparent z-30">
        <CarouselIndicator
          totalSlides={cardIds.length}
          currentSlide={currentSlide}
          onClick={(index) => sliderRef.current.slickGoTo(index)}
        />
        <button
          type="button"
          id="share-btn"
          onClick={() => handleShare(cardIds[currentSlide])}
          className="px-6 py-2 min-w-full max-w-150 w-full rounded-full bg-red-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors"
        >
          Let's share!
        </button>
      </div>
    </div>
  );
}

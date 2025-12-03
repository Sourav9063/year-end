"use client";

import Image from "next/image";
import { useState } from "react";
import yearEnd10x from "../assets/year-end-10xn.png";
import gradientBottom from "../assets/gradient-bottom.svg";
import { getRandomNumber } from "../utils/random";
import { handleShare } from "../utils/share";

export const cardOverlayConfig = {
  food: {
    // Large "200"
    position: { top: "37%", left: "17%" },
    className:
      "text-[#E83330] text-[clamp(1rem,6vw,2.5rem)] font-black tracking-tighter",
  },
  parcel: {
    // "100" inside Parcel box
    position: { top: "30%", left: "54%" },
    className:
      "text-[#E83330] text-[clamp(1rem,5vw,2rem)] font-black tracking-tighter",
  },
  bike: {
    // "115" inside Bike box
    position: { top: "64%", left: "17%" },
    className:
      "text-[#E83330] text-[clamp(1rem,6vw,2.5rem)] font-black tracking-tighter",
  },
  courier: {
    // "100" inside Courier box
    position: { top: "48%", left: "54%" },
    className:
      "text-[#E83330] text-[clamp(1rem,5vw,2rem)] font-black tracking-tighter",
  },
  car: {
    // "41" inside Car box
    position: { top: "65.5%", left: "54%" },
    className:
      "text-[#E83330] text-[clamp(1rem,5vw,2rem)] font-black tracking-tighter",
  },
  points: {
    // "6980" inside the Platinum card (rotated)
    position: { top: "83%", left: "28%" },
    className:
      "text-gray-900 text-[clamp(1rem,5vw,2rem)]  transform -translate-x-1/2 -translate-y-1/2 font-bold -rotate-9 origin-center",
  },
  saved: {
    // "৳5,000" inside the Promo card (rotated)
    position: { top: "88.5%", left: "73%" },
    className:
      "text-gray-900 text-[clamp(1rem,5vw,2rem)] transform -translate-x-1/2 -translate-y-1/2 font-bold rotate-3 origin-center",
  },
  user: {
    position: { top: "91.5%", left: "33%" },
    className:
      "text-gray-900 px-4 py-2 text-[clamp(0.32rem,1.8vw,0.8rem)] bg-white transform -translate-x-1/2 -translate-y-1/2 font-bold -rotate-6 origin-center",
  },
};

export default function Home() {
  const [statsData, setStatsData] = useState({
    food: 200,
    parcel: 100,
    bike: 115,
    courier: 100,
    car: 4100,
    points: 698000,
    saved: "৳5,000",
    user: "You're a platinum user!",
  });
  const [status, setStatus] = useState<string>("");

  const handleRandomize = () => {
    setStatsData({
      food: getRandomNumber(0, 99999),
      parcel: getRandomNumber(0, 99999),
      bike: getRandomNumber(0, 99999),
      courier: getRandomNumber(0, 99999),
      car: getRandomNumber(0, 99999),
      points: getRandomNumber(0, 999999),
      saved: `৳${getRandomNumber(0, 999999).toLocaleString()}`,
      user:
        getRandomNumber(1, 3) === 1
          ? "You're a platinum user!"
          : "You're a gold user",
    });
  };

  return (
    // ... your JSX remains the same
    <div className="flex flex-col items-center min-h-screen h-screen">
      <div className="mx-auto w-fit max-w-150 min-w-70 min-h-screen relative">
        <div
          id="output"
          className="mx-auto w-fit max-w-150 min-w-70 min-h-screen overflow-hidden relative overflow-x-hidden"
        >
          <Image src={yearEnd10x} alt="background" priority />
          {/* {Object.entries(cardOverlayConfig).map(([key, config]) => (
            <div
              key={key}
              className={`absolute ${config.className}`}
              style={{
                top: config.position.top,
                left: config.position.left,
              }}
            >
              {statsData[key as keyof typeof statsData]}
            </div>
          ))} */}
          <Image
            src={gradientBottom}
            alt="background"
            priority
            className="absolute top-[80%] -left-40 rotate-45"
          />
        </div>
      </div>
      <div className="flex gap-4 h-16 w-screen max-w-150 min-w-70 fixed bottom-0 justify-center items-center bg-transparent">
        <div className="bg-transparent w-full px-4">
          {/* <button
                type="button"
                id="randomize-btn"
                onClick={handleRandomize}
                className="px-6 py-3 rounded-full bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition-colors"
              >
                Randomize
              </button> */}
          <button
            type="button"
            id="share-btn"
            onClick={() => handleShare("output", setStatus)}
            className="px-6 py-2 min-w-full w-full rounded-full bg-red-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors"
          >
            Share
          </button>
          {status && (
            <div
              id="status"
              className={`text-sm ${
                status.includes("Error") ? "text-red-500" : "text-gray-600"
              }`}
            >
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

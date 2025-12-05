"use client";

import Image from "next/image";
import { useState } from "react";
import gradientBottom from "@/assets/year-end-fb.png";
import yearEnd10x from "@/assets/year-end-fs.png";
import { getRandomNumber } from "../utils/random";
import { handleShare } from "../utils/share";

export const cardOverlayConfig = {
  food: {
    position: { top: "39.25%", left: "17%" },
    className:
      "text-[#E83330] text-[clamp(0.7rem,5vw,2rem)] font-black tracking-tighter leading-none",
  },
  bike: {
    position: { top: "39.25%", left: "56%" },
    className:
      "text-[#E83330] text-[clamp(0.7rem,5vw,2rem)] font-black tracking-tighter leading-none",
  },
  car: {
    position: { top: "52.75%", left: "17%" },
    className:
      "text-[#E83330] text-[clamp(0.7rem,5vw,2rem)] font-black tracking-tighter leading-none",
  },
  parcel: {
    position: { top: "52.75%", left: "56%" },
    className:
      "text-[#E83330] text-[clamp(0.7rem,5vw,2rem)] font-black tracking-tighter leading-none",
  },
  courier: {
    position: { top: "66.15%", left: "17%" },
    className:
      "text-[#E83330] text-[clamp(0.7rem,5vw,2rem)] font-black tracking-tighter leading-none",
  },
  cng: {
    position: { top: "66.15%", left: "56%" },
    className:
      "text-[#E83330] text-[clamp(0.7rem,5vw,2rem)] font-black tracking-tighter leading-none",
  },
  points: {
    // Bottom Left Card - Kept Centered but adjusted size
    position: { top: "85.75%", left: "31%" },
    className:
      "text-gray-900 text-[clamp(0.8rem,4vw,1.8rem)] transform -translate-x-1/2 -translate-y-1/2 font-bold -rotate-[9deg] origin-center whitespace-nowrap",
  },
  saved: {
    // Bottom Right Card - Kept Centered but adjusted size
    position: { top: "88.5%", left: "69.5%" },
    className:
      "text-gray-900 text-[clamp(0.8rem,4vw,1.8rem)] transform -translate-x-1/2 -translate-y-1/2 font-bold rotate-[5deg] origin-center whitespace-nowrap",
  },
  // user: {
  //   // Centered pill at bottom
  //   position: { top: "93%", left: "50%" },
  //   className:
  //     "text-gray-900 px-3 py-1 text-[clamp(0.5rem,2vw,1rem)] bg-white/90 rounded-full backdrop-blur-sm shadow-sm transform -translate-x-1/2 -translate-y-1/2 font-semibold origin-center whitespace-nowrap",
  // },
};

export default function Home() {
  const [_statsData, setStatsData] = useState({
    food: 200,
    parcel: 100,
    bike: 115,
    courier: 100,
    car: 4100,
    cng: 100,
    points: 698000,
    saved: "৳5,000",
    // user: "You're a platinum user!",
  });
  const [status, setStatus] = useState < string > "";

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
      // user:
      //   getRandomNumber(1, 3) === 1
      //     ? "You're a platinum user!"
      //     : "You're a gold user",
    });
  };

  return (
    // ... your JSX remains the same
    <div className="min-h-screen h-screen">
      <div className="mx-auto w-fit max-w-150 min-w-70 relative">
        <div
          id="output"
          className="mx-auto w-fit max-w-150 min-w-70  overflow-hidden relative"
        >
          <Image src={yearEnd10x} alt="background" priority />
          {Object.entries(cardOverlayConfig).map(([key, config]) => (
            <div
              key={key}
              className={`absolute ${config.className}`}
              style={{
                top: config.position.top,
                left: config.position.left,
              }}
            >
              {_statsData[key]}
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto w-fit max-w-150 min-w-70 relative h-20 overflow-hidden">
        <Image src={gradientBottom} alt="background" priority />
      </div>
      <div className="mx-auto flex gap-4 h-16 w-screen max-w-150 min-w-70 fixed bottom-0 left-0 right-0 justify-center items-center bg-transparent">
        <div className="bg-transparent w-full px-4">
          <button
            type="button"
            id="randomize-btn"
            onClick={_handleRandomize}
            className="px-6 fixed top-2 right-2 opacity-15 py-3 rounded-full bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition-colors"
          >
            Randomize
          </button>
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

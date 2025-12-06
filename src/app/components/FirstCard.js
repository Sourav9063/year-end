"use client";

import Image from "next/image";
import bgImage from "@/assets/Card1BG.png";
import cardContent from "@/assets/Card1Content.png";

export const cardOverlayConfig = {
  food: {
    position: { top: "33%", left: "11%" },
    className:
      "text-[#E83330] text-[clamp(0.9rem,6vw,2rem)] font-black tracking-tighter leading-none",
  },
  bike: {
    position: { top: "33%", left: "56.75%" },
    className:
      "text-[#E83330] text-[clamp(0.9rem,6vw,2rem)] font-black tracking-tighter leading-none",
  },
  car: {
    position: { top: "49%", left: "11%" },
    className:
      "text-[#E83330] text-[clamp(0.9rem,6vw,2rem)] font-black tracking-tighter leading-none",
  },
  parcel: {
    position: { top: "49%", left: "56.75%" },
    className:
      "text-[#E83330] text-[clamp(0.9rem,6vw,2rem)] font-black tracking-tighter leading-none",
  },
  courier: {
    position: { top: "64.5%", left: "11%" },
    className:
      "text-[#E83330] text-[clamp(0.9rem,6vw,2rem)] font-black tracking-tighter leading-none",
  },
  cng: {
    position: { top: "64.5%", left: "56.75%" },
    className:
      "text-[#E83330] text-[clamp(0.9rem,6vw,2rem)] font-black tracking-tighter leading-none",
  },
  points: {
    position: { top: "91%", left: "33.5%" },
    className:
      "text-gray-900 text-[clamp(1rem,5vw,1.8rem)] transform -translate-x-1/2 -translate-y-1/2 font-bold -rotate-7 origin-center whitespace-nowrap",
  },
  saved: {
    position: { top: "91%", left: "67.5%" },
    className:
      "text-gray-900 text-[clamp(1rem,5vw,1.8rem)] transform -translate-x-1/2 -translate-y-1/2 font-bold rotate-5 origin-center whitespace-nowrap",
  },
};

export default function FirstCard({ statsData, id }) {
  return (
    <div className="w-full min-h-184">
      <div className="mx-auto w-fit max-w-150 min-w-70 relative">
        <div
          id={id}
          className="mx-auto w-fit max-w-150 min-w-70 overflow-hidden relative"
        >
          <Image src={bgImage} alt="background" priority />
          <div className="absolute top-7 left-8 right-8">
            <Image src={cardContent} alt="content" priority />
            {Object.entries(cardOverlayConfig).map(([key, config]) => (
              <div
                key={key}
                className={`absolute ${config.className}`}
                style={{
                  top: config.position.top,
                  left: config.position.left,
                }}
              >
                {statsData[key]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import cardContent from "@/assets/Card1.png";
import bgImage from "@/assets/Card1BG.png";

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
          <div className="absolute inset-0 px-7 pt-8">
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

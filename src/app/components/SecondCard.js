"use client";

import Image from "next/image";
import cardContent from "@/assets/Card2.png";
import bgImage from "@/assets/Card2BGF3x.png";

// As no specific overlay config was provided for the second card,
// this will be an empty object for now.
export const cardOverlayConfig = {};

export default function SecondCard({ id }) {
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
                {/* statsData[key] will not be available here, as cardOverlayConfig is empty */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

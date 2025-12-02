"use client";

import Image from "next/image";
import yearEndMImage from "../assets/year-end-m.png";
import yearEndMImage5x from "../assets/year-end-m5x.png";
import { toBlob } from "html-to-image";
import { useCallback, useRef, useState } from "react";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<string>("");

  const fallbackDownload = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pathao_card.png";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = useCallback(async () => {
    if (!ref.current) return;

    setStatus("Generating image...");

    try {
      // 1. Ensure fonts and images are ready before capturing
      await document.fonts.ready; 

      // 2. Use specific configuration options to fix the "empty" issue
      const blob = await toBlob(ref.current, {
        cacheBust: true,
        // CRITICAL: Forces standard resolution. 
        // Without this, mobile phones create massive canvases that crash/render blank.
        pixelRatio: 2, 
        // CRITICAL: Ensures the background isn't transparent
        backgroundColor: "#fffff", // Match your bg-orange-500 hex code
        // Helps with some Next.js layout shifts during capture
        style: {
           margin: '0',
        },
      });

      if (!blob) throw new Error("Blob generation failed");

      const file = new File([blob], "pathao_card.png", { type: "image/png" });

      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        try {
          await navigator.share({
            title: "Pathao Card",
            text: "Check out my year end summary!",
            files: [file],
          });
          setStatus("Shared successfully!");
        } catch (error) {
          if ((error as Error).name !== "AbortError") {
            console.error(error);
            setStatus("Share failed. Downloading.");
            fallbackDownload(blob);
          } else {
            setStatus("Share cancelled.");
          }
        }
      } else {
        setStatus("Web Share API not supported. Downloading.");
        fallbackDownload(blob);
      }
    } catch (err) {
      console.error(err);
      setStatus("Error: " + (err as Error).message);
    }
  }, []);

  return (
    // ... your JSX remains the same
    <div className="flex flex-col items-center gap-4 p-4 px-2 min-h-screen">
      <div id="output" ref={ref} className="mx-auto w-fit max-w-150">
        <Image
          src={yearEndMImage5x}
          alt="background"
          priority
        />
      </div>
      
      <button
        id="share-btn"
        onClick={handleShare}
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors"
      >
        Share
      </button>
      {/* ... status ... */}
    </div>
  );
}

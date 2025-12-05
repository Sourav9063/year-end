"use client";
import html2canvas from "html2canvas-pro";
import { useCallback, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
// import logo from "../assets/champ.png";
import logo from "../assets/image.png";

export default function Home() {
  const ref = useRef(null);
  const version = "1.16";
  const [blob, setBlob] = useState(null);
  const [isReady, setIsReady] = useState(false);

  // need to wait for images to load for working in ios 11 + Higher.
  useEffect(() => {
    const generateImage = async () => {
      if (!ref.current) return;

      try {
        // Wait for images to load
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const canvas = await html2canvas(ref.current, {
          useCORS: true,
          scale: 2,
        });
        canvas.toBlob((generatedBlob) => {
          if (generatedBlob) {
            setBlob(generatedBlob);
            setIsReady(true);
            toast.success("Ready to share!");
          } else {
            toast.error("Failed to generate image");
          }
        }, "image/png");
      } catch (err) {
        console.error(err);
        toast.error("Error generating image");
      }
    };

    generateImage();
  }, []);

  const handleShare = useCallback(async () => {
    if (!blob) {
      toast.error("Image not ready yet");
      return;
    }

    try {
      const file = new File([blob], "year-end-wrap.png", { type: "image/png" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Year End Wrap",
          text: "Check out my Year End Wrap!",
        });
        toast.success("Shared successfully!");
      } else {
        console.log("Sharing not supported.", navigator);
        // Fallback
        const link = document.createElement("a");
        link.download = "my-year-in-review.png";
        link.href = URL.createObjectURL(blob);
        link.click();
        toast.success("Downloaded image");
      }
    } catch (err) {
      console.log(err);
      toast.error(`Error: ${err.message}`);
    }
  }, [blob]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#FFECED]">
      <Toaster />
      <h1 className="mb-8 text-2xl font-bold">Year End Wrap</h1>
      <div className="share_as_img bg-red-100" ref={ref}>
        <Image
          src={logo.src}
          alt="Logo"
          width={300}
          height={268}
          crossOrigin="anonymous"
        />
        <p className="my-4">You order mostly in daylight hours</p>
        <div className="flex flex-col items-center justify-center">
          <p className="mb-1">You are the ultimate</p>
          <div className="relative py-4 px-8 mb-4">
            <div className="absolute inset-0 bg-red-100 rotate-[15deg] rounded-xl z-0 shadow-sm"></div>
            <div className="absolute inset-0 bg-red-200 -rotate-[15deg] rounded-xl z-0 opacity-70 shadow-sm"></div>
            <p className="text-3xl relative z-10 font-bold text-red-600">
              Morning Champion {version}
            </p>
          </div>
          <p className="text-gray-400">
            <span className="text-[#5A6770]">Daylight dining?</span> You&apos;re
            absolutely
          </p>
          <p className="text-gray-400">
            <span className="text-[#5A6770]">winning</span> at life!
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={handleShare}
        disabled={!isReady}
        className={`bg-red-500 text-white px-4 py-2 rounded-full w-full max-w-[80%] mt-8 touch-manipulation cursor-pointer active:scale-95 transition-transform ${
          !isReady ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isReady ? "Share" : "Preparing..."}
      </button>
    </div>
  );
}

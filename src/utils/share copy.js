import { toBlob } from "html-to-image";

const fallbackDownload = (blob) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pathao_card.png";
  a.click();
  URL.revokeObjectURL(url);
};

export const handleShare = async (id, setStatus) => {
  const element = document.getElementById(id);
  if (!element) return;

  element.style.borderRadius = "24px";
  element.style.overflow = "hidden";
  element.style.border = "1px solid #EBEEF0;";
  // element.style.height = "min(calc(100vw * 1.815), calc(1.815 * 600px))";

  setStatus("Generating image...");

  try {
    // 1. Ensure fonts and images are ready before capturing
    await document.fonts.ready;

    // 2. Use specific configuration options to fix the "empty" issue
    const blob = await toBlob(element, {
      cacheBust: true,
      // CRITICAL: Forces standard resolution.
      // Without this, mobile phones create massive canvases that crash/render blank.
      pixelRatio: 2,
      // CRITICAL: Ensures the background isn't transparent
      backgroundColor: "#fffff", // Match your bg-orange-500 hex code
      // Helps with some Next.js layout shifts during capture
      style: {
        margin: "0",
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
        if (error.name !== "AbortError") {
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
    setStatus(`Error: ${err.message}`);
  } finally {
    element.style.borderRadius = "0px";
    element.style.border = "1px solid var(--BW-Separator, #EBEEF0);";
    // element.style.minHeight = "100vh";
    // element.style.height = "auto";
  }
};

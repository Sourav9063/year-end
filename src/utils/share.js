import html2canvas from "html2canvas-pro";
import toast from "react-hot-toast";

export const handleShare = async (id) => {
  const element = document.getElementById(id);
  if (!element) {
    toast.error("Element not found");
    return;
  }

  const loadingToast = toast.loading("Preparing image...");

  try {
    // Wait for images to load
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: 2,
    });

    canvas.toBlob(async (blob) => {
      if (!blob) {
        toast.error("Failed to generate image", { id: loadingToast });
        return;
      }

      const file = new File([blob], "year-end-wrap.png", { type: "image/png" });

      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: "Year End Wrap",
            text: "Check out my Year End Wrap!",
          });
          toast.success("Shared successfully!", { id: loadingToast });
        } catch (err) {
          console.log(err);
          toast.dismiss(loadingToast);
        }
      } else {
        // Fallback
        const link = document.createElement("a");
        link.download = "my-year-in-review.png";
        link.href = URL.createObjectURL(blob);
        link.click();
        toast.success("Downloaded image", { id: loadingToast });
      }
    }, "image/png");
  } catch (err) {
    console.error(err);
    toast.error("Error generating image", { id: loadingToast });
  }
};

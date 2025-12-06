import html2canvas from "html2canvas-pro";
import toast from "react-hot-toast";

export const handleShare = async (id) => {
  const mainElement = document.getElementById(id);
  if (!mainElement) {
    toast.error("Element not found");
    return;
  }
  //copy of the mainElement
  const element = mainElement.cloneNode(true);
  element.style.borderRadius = "32px";
  element.style.border = "1px solid #EBEEF0;";
  const currentWidth = mainElement.offsetWidth;
  console.log(currentWidth);
  element.style.width = `${currentWidth}px`;
  element.style.height = `${currentWidth * 1.7295597484}px`;

  element.style.overflow = "hidden";

  // Append to body to ensure it is part of the DOM for html2canvas to capture
  element.style.position = "absolute";
  element.style.left = "-9999px";
  document.body.appendChild(element);

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
  } finally {
    //delete the element
    element.remove();
  }
};

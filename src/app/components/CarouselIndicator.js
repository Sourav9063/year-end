"use client";

export default function CarouselIndicator({
  totalSlides,
  currentSlide,
  onClick,
}) {
  return (
    <div className="flex justify-center gap-2 mb-4">
      {[...Array(totalSlides).keys()].map((i, index) => (
        <button
          key={`indicator-${i + index}`}
          type="button"
          onClick={() => onClick(index)}
          className={`w-2 h-2 rounded-full transition-colors duration-300 cursor-pointer ${
            index === currentSlide ? "bg-gray-700/70" : "bg-gray-300/70"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}

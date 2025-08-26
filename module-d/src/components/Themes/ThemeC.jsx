import { useEffect, useState, useRef } from "react";
import { extractFileName } from "../../helper";
import usePhotoSlideContext from "../../hook/usePhotoSlideContext";

export default function ThemeC() {
  const { state, photoSlideRef } = usePhotoSlideContext();
  const { photos, currentPhotoindex } = state;
  const [direction, setDirection] = useState("next");
  const prevIndexRef = useRef(currentPhotoindex);

  const caption = extractFileName(photos[currentPhotoindex].name);
  const words = caption.split(" ");

  useEffect(() => {
    const prevIndex = prevIndexRef.current;
    const currentIndex = currentPhotoindex;

    // Determine direction based on index change
    if (prevIndex === photos.length - 1 && currentIndex === 0) {
      // Wrapping from last to first - should slide down (next)
      setDirection("next");
    } else if (prevIndex === 0 && currentIndex === photos.length - 1) {
      // Wrapping from first to last - should slide up (prev)
      setDirection("prev");
    } else if (currentIndex > prevIndex) {
      // Normal forward direction
      setDirection("next");
    } else if (currentIndex < prevIndex) {
      // Normal backward direction
      setDirection("prev");
    }

    prevIndexRef.current = currentIndex;
  }, [currentPhotoindex, photos.length]);

  return (
    <div className="w-full h-full">
      <div
        ref={photoSlideRef}
        className="relative w-full h-full overflow-hidden"
      >
        <ul
          style={{
            transform: `translateY(-${currentPhotoindex * 100}%)`,
            transition: `all 500ms`,
          }}
          className="flex flex-col items-center w-full h-full"
        >
          {photos.map((photo) => (
            <li key={photo.url} className="w-full h-full grow shrink-0">
              <img
                className={`w-full h-full object-cover ${direction === "next" ? "theme-c-animation" : "-theme-c-animation"}`}
                src={photo.url}
                alt={caption}
              />
            </li>
          ))}
        </ul>

        <ul className="theme-b-animation absolute flex gap-1 left-0 bottom-0 z-40 bg-white px-4 py-2 border-2 border-solid border-[#333] overflow-hidden">
          {words.map((word, index) => (
            <li
              key={word + index}
              style={{ animationDelay: `${100 * index}ms` }}
              className="theme-c-animation"
            >
              {word}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

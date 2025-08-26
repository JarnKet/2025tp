import { useEffect, useState, useRef } from "react";
import { extractFileName } from "../../helper";
import usePhotoSlideContext from "../../hook/usePhotoSlideContext";

export default function ThemeB() {
  const { state, photoSlideRef } = usePhotoSlideContext();
  const { photos, currentPhotoindex } = state;
  const [direction, setDirection] = useState("next");
  const prevIndexRef = useRef(currentPhotoindex);

  const caption = extractFileName(photos[currentPhotoindex].name);

  useEffect(() => {
    const prevIndex = prevIndexRef.current;
    const currentIndex = currentPhotoindex;

    // Determine direction based on index change
    if (prevIndex === photos.length - 1 && currentIndex === 0) {
      // Wrapping from last to first - should go right (next)
      setDirection("next");
    } else if (prevIndex === 0 && currentIndex === photos.length - 1) {
      // Wrapping from first to last - should go left (prev)
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
            transform: `translateX(-${currentPhotoindex * 100}%)`,
            transition: `all 500ms`,
          }}
          className="flex items-center w-full h-full"
        >
          {photos.map((photo) => (
            <li key={photo.url} className="w-full h-full grow shrink-0">
              <img
                className={`w-full h-full object-cover ${direction === "next" ? "theme-b-animation" : "-theme-b-animation"}`}
                src={photo.url}
                alt={caption}
              />
            </li>
          ))}
        </ul>

        <p
          key={photos[currentPhotoindex].name}
          className="theme-b-animation absolute left-0 bottom-0 z-40 bg-white px-4 py-2 border-2 border-solid border-[#333]"
        >
          {caption}
        </p>
      </div>
    </div>
  );
}

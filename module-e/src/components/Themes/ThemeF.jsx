import { useContext, useEffect } from "react";

import { PhotoSliderContext } from "../../features/photo-slider/Provider";
import { extractFileName } from "../../helper";
import { setCurrentPhotoIndex } from "../../features/photo-slider/action";

export default function ThemeF() {
  const { state, dispatch, photoSliderRef } = useContext(PhotoSliderContext);
  const { photos, currentPhotoIndex, currentMode, currentTheme } = state;

  const caption = extractFileName(photos[currentPhotoIndex]?.name);

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);

    return () => document.removeEventListener("keydown", handleKeydown);
  }, [photos, currentPhotoIndex, currentMode, currentTheme]);

  useEffect(() => {
    let intervalId;
    if (currentMode === "auto") {
      intervalId = setInterval(() => {
        handleSlide(1);
      }, 3000);
    } else if (currentMode === "random") {
      intervalId = setInterval(() => {
        handleRandom();
      }, 3000);
    }

    return () => clearInterval(intervalId);
  }, [photos, currentPhotoIndex, currentMode, currentTheme]);

  function handleKeydown(e) {
    if (currentMode !== "manual" || photos.length === 0) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handleSlide(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleSlide(1);
    }
  }
  function handleSlide(dir) {
    if (dir === 1) {
      dispatch(setCurrentPhotoIndex((currentPhotoIndex + 1) % photos.length));
    } else if (dir === -1) {
      dispatch(
        setCurrentPhotoIndex(
          (currentPhotoIndex - 1 + photos.length) % photos.length
        )
      );
    }
  }

  function handleRandom() {
    if (photos.length === 0) return;
    const index = Math.floor(Math.random() * photos.length);
    dispatch(setCurrentPhotoIndex(index));
  }

  return (
    <div
      ref={photoSliderRef}
      className="relative w-full h-full overflow-hidden"
    >
      {photos.length <= 0 ? (
        <p className="w-full h-full flex-center font-semibold text-lg flex items-center justify-center text-center px-2">
          There isn't any image in slide you can click upload sample images to
          load provided images or click Upload image button to upload your image
        </p>
      ) : (
        <div
          key={photos[currentPhotoIndex].url}
          className="w-full h-full grow shrink-0 scale-up-animation"
        >
          <img
            className="w-full h-full object-cover"
            src={photos[currentPhotoIndex].url}
            alt={caption}
          />
        </div>
      )}
      <p
        key={currentPhotoIndex}
        className="absolute bottom-0 left-0 px-4 py-2 bg-white font-bold scale-up-animation"
      >
        {caption}
      </p>
    </div>
  );
}

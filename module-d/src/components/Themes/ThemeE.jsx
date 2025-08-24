import { useState } from "react";
import { extractFileName } from "../../helper";
import usePhotoSlideContext from "../../hook/usePhotoSlideContext";

export default function ThemeE() {
  const { state, photoSlideRef } = usePhotoSlideContext();
  const { photos, currentPhotoindex } = state;

  const caption = extractFileName(photos[currentPhotoindex].name);

  return (
    <div className="w-full h-full">
      <div className="relative w-full h-full border border-solid border-[#333]">
        <img
          className="w-full h-full"
          src={photos[currentPhotoindex].url}
          alt=""
        />
        <div
          key={photos[currentPhotoindex].url + "left"}
          style={{
            backgroundImage: `url(${photos[currentPhotoindex].url})`,
            backgroundPosition: "left center",
            backgroundSize: "200% 100%",
          }}
          className={`front absolute left-0 top-0 w-1/2 h-full origin-left transition-all duration-1000`}
        ></div>
        <div
          key={photos[currentPhotoindex].url + "right"}
          style={{
            backgroundImage: `url(${photos[currentPhotoindex].url})`,
            backgroundPosition: "right center",
            backgroundSize: "200% 100%",
          }}
          className={`-rotate-y-front absolute right-0 top-0 w-1/2 h-full origin-right transition-all duration-1000`}
        ></div>
      </div>
    </div>
  );
}

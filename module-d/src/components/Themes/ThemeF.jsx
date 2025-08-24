import { extractFileName } from "../../helper";
import usePhotoSlideContext from "../../hook/usePhotoSlideContext";

export default function ThemeF() {
  const { state, photoSlideRef } = usePhotoSlideContext();
  const { photos, currentPhotoindex } = state;

  const caption = extractFileName(photos[currentPhotoindex].name);

  return (
    <div className="w-full h-full">
      <div ref={photoSlideRef} className="w-full h-full overflow-hidden">
        <div className="relative w-full h-full">
          <img
            key={photos[currentPhotoindex].url}
            src={photos[currentPhotoindex].url}
            className="w-full h-full theme-f-animation"
            alt=""
          />
          <p
            key={photos[currentPhotoindex].name}
            className="absolute left-0 bottom-0 z-40 bg-white px-4 py-2 theme-f-animation border-2 border-solid border-[#333]"
          >
            {caption}
          </p>
        </div>
      </div>
    </div>
  );
}

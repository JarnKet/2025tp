import { extractFileName } from "../../helper";
import usePhotoSlideContext from "../../hook/usePhotoSlideContext";

export default function ThemeB() {
  const { state, photoSlideRef } = usePhotoSlideContext();
  const { photos, currentPhotoindex } = state;

  const caption = extractFileName(photos[currentPhotoindex].name);

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
                className="w-full h-full object-cover"
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

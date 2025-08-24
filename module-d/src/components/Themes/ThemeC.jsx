import { extractFileName } from "../../helper";
import usePhotoSlideContext from "../../hook/usePhotoSlideContext";

export default function ThemeC() {
  const { state, photoSlideRef } = usePhotoSlideContext();
  const { photos, currentPhotoindex } = state;

  const caption = extractFileName(photos[currentPhotoindex].name);
  const words = caption.split(" ");
  console.log(words);

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
                className="w-full h-full object-cover"
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

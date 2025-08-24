import { useRef } from "react";
import { extractFileName } from "../../helper";
import usePhotoSlideContext from "../../hook/usePhotoSlideContext";

export default function ThemeD() {
  const { state, photoSlideRef } = usePhotoSlideContext();
  const { photos, currentPhotoindex } = state;
  const rotateRef = useRef([]);

  function handleRotateImageCard() {
    return Math.random() * 10 - 5;
  }

  const caption = extractFileName(photos[currentPhotoindex].name);
  const stack = Array.from(
    { length: currentPhotoindex + 1 },
    (_, index) => photos[index]
  );

  return (
    <div className="w-full h-full">
      <div ref={photoSlideRef} className="w-full h-full overflow-hidden">
        <ul className="relative flex items-center justify-center w-full h-full bg-black">
          {stack.map((photo) => {
            if (!rotateRef.current[photo.url]) {
              rotateRef.current[photo.url] = handleRotateImageCard();
            }
            return (
              <li
                key={photo.url}
                style={{
                  transform: `rotate(${rotateRef.current[photo.url]}deg)`,
                }}
                className="theme-b-animation absolute  w-1/2 grow shrink-0 px-2 py-2 bg-white rounded-lg"
              >
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={photo.url}
                  alt={caption}
                />
                <p>{caption}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

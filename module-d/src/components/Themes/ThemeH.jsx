import { extractFileName } from "../../helper";
import usePhotoSlideContext from "../../hook/usePhotoSlideContext";

export default function ThemeH() {
  const { state, photoSlideRef } = usePhotoSlideContext();
  const { photos = [], currentPhotoindex = 0 } = state ?? {};

  // Safety check for photos array
  if (!Array.isArray(photos) || photos.length === 0) {
    return (
      <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white">
        No photos available
      </div>
    );
  }

  // Get current photo safely
  const currentPhoto = photos[currentPhotoindex];
  const caption = currentPhoto?.name ? extractFileName(currentPhoto.name) : "";

  return (
    <div className="w-full h-full bg-black">
      <div ref={photoSlideRef} className="w-full h-full relative">
        
        {/* Simple zoom effect for the image */}
        <div className="w-full h-full flex items-center justify-center">
          <img
            key={currentPhoto.url}
            src={currentPhoto.url}
            alt={caption}
            className="max-w-full max-h-full object-contain theme-h-zoom"
            draggable={false}
          />
        </div>

        {/* Simple caption that fades in */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-white/90 px-6 py-3 rounded-lg theme-h-caption-fade">
            <p className="text-black text-lg font-medium text-center">
              {caption}
            </p>
          </div>
        </div>

        {/* Simple photo counter */}
        <div className="absolute top-8 right-8 bg-white/80 px-3 py-1 rounded">
          <span className="text-black text-sm font-medium">
            {currentPhotoindex + 1} / {photos.length}
          </span>
        </div>

      </div>
    </div>
  );
}

import { useEffect, useState, useRef } from "react";
import { extractFileName } from "../../helper";
import usePhotoSlideContext from "../../hook/usePhotoSlideContext";

export default function ThemeF() {
  const { state, photoSlideRef } = usePhotoSlideContext();
  const { photos = [], currentPhotoindex = 0 } = state ?? {};

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState('next'); // 'next' or 'prev'
  const prevIndexRef = useRef(currentPhotoindex);

  const safeIdx =
    Array.isArray(photos) && photos.length > 0
      ? Math.min(Math.max(currentPhotoindex, 0), photos.length - 1)
      : -1;

  const current = safeIdx >= 0 ? photos[safeIdx] : null;
  const caption = current?.name ? extractFileName(current.name) : "";

  useEffect(() => {
    if (safeIdx >= 0) {
      // Determine transition direction
      const prevIdx = prevIndexRef.current;
      const direction = safeIdx > prevIdx ? 'next' : 'prev';

      // Handle wrapping cases
      if (prevIdx === photos.length - 1 && safeIdx === 0) {
        setTransitionDirection('next');
      } else if (prevIdx === 0 && safeIdx === photos.length - 1) {
        setTransitionDirection('prev');
      } else {
        setTransitionDirection(direction);
      }

      setIsTransitioning(true);

      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 800);

      prevIndexRef.current = safeIdx;

      return () => clearTimeout(timer);
    }
  }, [safeIdx, photos.length]);

  // Calculate visible range (show 3 images on each side + center)
  const getVisiblePhotos = () => {
    if (!Array.isArray(photos) || photos.length === 0) return [];

    const visibleRange = 3; // Number of photos on each side
    const visiblePhotos = [];

    for (let i = -visibleRange; i <= visibleRange; i++) {
      const index = safeIdx + i;
      let actualIndex = index;

      // Handle wrapping for infinite loop effect
      if (index < 0) {
        actualIndex = photos.length + index;
      } else if (index >= photos.length) {
        actualIndex = index - photos.length;
      }

      if (actualIndex >= 0 && actualIndex < photos.length) {
        visiblePhotos.push({
          photo: photos[actualIndex],
          position: i,
          actualIndex
        });
      }
    }

    return visiblePhotos;
  };

  // Calculate transform styles for each photo based on position and transition state
  const getPhotoTransform = (position) => {
    const distance = Math.abs(position);

    // During transition, apply sliding effect
    if (isTransitioning) {
      let slideOffset = 0;
      if (transitionDirection === 'next') {
        slideOffset = position * 300; // Slide left (positive positions go right)
      } else {
        slideOffset = position * 300; // Slide right (negative positions go left)
      }

      // Center photo
      if (position === 0) {
        return {
          transform: `translateX(${slideOffset}px) translateZ(0) rotateY(${position * -25}deg) scale(1)`,
          opacity: 1,
          zIndex: 10,
        };
      }

      // Side photos with coverflow effect
      const offsetX = slideOffset;
      const offsetZ = -Math.abs(position) * 100;
      const rotateY = position > 0 ? -45 : 45;
      const scale = Math.max(0.6, 1 - distance * 0.15);
      const opacity = Math.max(0.3, 1 - distance * 0.2);

      return {
        transform: `translateX(${offsetX}px) translateZ(${offsetZ}px) rotateY(${rotateY}deg) scale(${scale})`,
        opacity: opacity,
        zIndex: 10 - distance,
      };
    }

    // Static state - only show center image in full screen
    if (position === 0) {
      return {
        transform: `translateX(0) translateZ(0) rotateY(0deg) scale(1)`,
        opacity: 1,
        zIndex: 10,
      };
    }

    // Hide side images when not transitioning
    return {
      transform: `translateX(${position * 300}px) translateZ(-200px) rotateY(${position * -45}deg) scale(0.7)`,
      opacity: 0,
      zIndex: 1,
    };
  };

  if (!Array.isArray(photos) || photos.length === 0) {
    return <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white">No photos available</div>;
  }

  const visiblePhotos = getVisiblePhotos();

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <div ref={photoSlideRef} className="w-full h-full">

        {/* Main Container with 3D perspective */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: '1200px' }}
        >
          <div className="relative w-full h-full flex items-center justify-center preserve-3d">
            {/* Render all visible photos */}
            {visiblePhotos.map(({ photo, position, actualIndex }) => {
              const photoTransform = getPhotoTransform(position);

              return (
                <div
                  key={`${actualIndex}-${position}`}
                  className={`absolute transition-all duration-800 ease-out preserve-3d ${
                    isTransitioning ? 'transition-transform' : ''
                  }`}
                  style={photoTransform}
                >
                  {/* Photo Container */}
                  <div className="relative group">
                    {/* Main Photo */}
                    <img
                      src={photo.url}
                      alt={extractFileName(photo.name)}
                      className={`object-cover rounded-lg shadow-2xl ${
                        position === 0 && !isTransitioning
                          ? 'w-full h-full max-w-none max-h-none' // Full screen when centered and not transitioning
                          : 'h-80 w-60 border-2 border-white/20' // Coverflow size during transitions
                      }`}
                      draggable={false}
                    />

                    {/* Reflection effect (only during coverflow) */}
                    {isTransitioning && (
                      <div
                        className="absolute -bottom-20 left-0 w-full h-20 rounded-lg opacity-30"
                        style={{
                          background: `linear-gradient(to bottom,
                            rgba(255,255,255,0.1),
                            transparent),
                            url(${photo.url})`,
                          backgroundSize: '100% 400%',
                          backgroundPosition: 'bottom',
                          transform: 'scaleY(-1)',
                          filter: 'blur(1px)',
                        }}
                      />
                    )}

                    {/* Center photo glow effect during transition */}
                    {position === 0 && isTransitioning && (
                      <div className="absolute inset-0 rounded-lg shadow-lg">
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 animate-pulse"></div>
                      </div>
                    )}

                    {/* Overlay gradient for full screen mode */}
                    {position === 0 && !isTransitioning && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation indicators */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {photos.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === safeIdx
                  ? 'bg-white scale-125 shadow-lg'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Caption */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 z-20">
          <div className={`bg-black/60 backdrop-blur-md text-white px-6 py-3 rounded-xl border border-white/20 shadow-lg transition-all duration-500 ${
            isTransitioning ? 'opacity-100 transform translate-y-0' : 'opacity-90 transform translate-y-2'
          }`}>
            <p className="text-lg font-semibold text-center tracking-wide">
              {caption}
            </p>
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

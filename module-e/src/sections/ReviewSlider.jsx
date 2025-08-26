import { useState } from "react";
import reviewData from "../constants/review.json";

const ReviewSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviews = reviewData.reviews;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  const getCardPosition = (index) => {
    const diff = index - currentIndex;
    if (diff === 0) return 'center';
    if (diff === 1 || diff === -(reviews.length - 1)) return 'right';
    if (diff === -1 || diff === reviews.length - 1) return 'left';
    return 'hidden';
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="cs-container">
        <h2 className="text-3xl font-bold text-center mb-8">Customer Reviews</h2>

        <div className="relative h-80 overflow-hidden">
          <div className="flex items-center justify-center h-full">
            {reviews.map((review, index) => {
              const position = getCardPosition(index);

              return (
                <div
                  key={index}
                  className={`absolute transition-all duration-500 ease-in-out transform ${
                    position === 'center'
                      ? 'scale-110 z-20 opacity-100 translate-x-0'
                      : position === 'left'
                      ? 'scale-90 z-10 opacity-60 -translate-x-64'
                      : position === 'right'
                      ? 'scale-90 z-10 opacity-60 translate-x-64'
                      : 'scale-75 z-0 opacity-0'
                  }`}
                >
                  <div className={`bg-white rounded-lg shadow-lg p-6 mx-4 ${
                    position === 'center' ? 'w-80' : 'w-64'
                  }`}>
                    <div className="text-center">
                      <div className="mb-3">
                        {renderStars(review.rating)}
                      </div>
                      <p className={`text-gray-700 mb-4 ${
                        position === 'center' ? 'text-base' : 'text-sm'
                      }`}>
                        &ldquo;{review.content}&rdquo;
                      </p>
                      <h4 className={`font-semibold text-gray-900 ${
                        position === 'center' ? 'text-lg' : 'text-base'
                      }`}>
                        {review.author}
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={goToPrevious}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={goToNext}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Next
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSlider;

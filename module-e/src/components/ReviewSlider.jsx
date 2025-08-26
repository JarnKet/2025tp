import { useState } from 'react';
import reviewData from '../constants/review.json';

const ReviewSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviews = reviewData.reviews;

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? reviews.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === reviews.length - 1 ? 0 : currentIndex + 1);
  };

  const renderStars = (rating) => {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += i < rating ? '★' : '☆';
    }
    return stars;
  };

  // Get the position of a card relative to the current centered card
  const getCardPosition = (index) => {
    const diff = index - currentIndex;
    if (diff === 0) return 'center';
    if (diff === 1 || (diff === -(reviews.length - 1))) return 'right';
    if (diff === -1 || (diff === (reviews.length - 1))) return 'left';
    return 'hidden';
  };

  // Get styles for each card based on position
  const getCardStyle = (position) => {
    const baseStyle = {
      position: 'absolute',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      textAlign: 'center',
      transition: 'all 0.5s ease-in-out',
      width: '100%',
      maxWidth: '400px'
    };

    switch (position) {
      case 'center':
        return {
          ...baseStyle,
          transform: 'translateX(0%) scale(1)',
          zIndex: 3,
          opacity: 1,
          padding: '30px',
          left: '50%',
          marginLeft: '-200px'
        };
      case 'left':
        return {
          ...baseStyle,
          transform: 'translateX(-120%) scale(0.8)',
          zIndex: 2,
          opacity: 0.6,
          padding: '20px',
          left: '50%',
          marginLeft: '-200px'
        };
      case 'right':
        return {
          ...baseStyle,
          transform: 'translateX(120%) scale(0.8)',
          zIndex: 2,
          opacity: 0.6,
          padding: '20px',
          left: '50%',
          marginLeft: '-200px'
        };
      default:
        return {
          ...baseStyle,
          transform: 'translateX(0%) scale(0.5)',
          zIndex: 1,
          opacity: 0,
          padding: '15px',
          left: '50%',
          marginLeft: '-200px'
        };
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '28px', fontWeight: 'bold' }}>
        Customer Reviews
      </h2>

      <div style={{
        position: 'relative',
        height: '350px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Render all review cards */}
        {reviews.map((review, index) => {
          const position = getCardPosition(index);
          const style = getCardStyle(position);
          const isCentered = position === 'center';

          return (
            <div key={index} style={style}>
              {/* Rating */}
              <div style={{
                fontSize: isCentered ? '24px' : '18px',
                color: '#fbbf24',
                marginBottom: isCentered ? '15px' : '10px'
              }}>
                {renderStars(review.rating)}
              </div>

              {/* Review Content */}
              <p style={{
                fontSize: isCentered ? '18px' : '14px',
                fontStyle: 'italic',
                marginBottom: isCentered ? '20px' : '15px',
                color: '#374151',
                lineHeight: '1.6'
              }}>
                &ldquo;{review.content}&rdquo;
              </p>

              {/* Author */}
              <p style={{
                fontWeight: 'bold',
                fontSize: isCentered ? '16px' : '14px',
                color: '#1f2937',
                marginBottom: '5px'
              }}>
                - {review.author}
              </p>

              <p style={{
                color: '#6b7280',
                fontSize: isCentered ? '14px' : '12px'
              }}>
                Rating: {review.rating}/5
              </p>
            </div>
          );
        })}

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '20px',
            cursor: 'pointer',
            zIndex: 10,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
          aria-label="Previous review"
        >
          ←
        </button>

        <button
          onClick={goToNext}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '20px',
            cursor: 'pointer',
            zIndex: 10,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
          aria-label="Next review"
        >
          →
        </button>
      </div>

      {/* Dots Indicator */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: 'none',
              margin: '0 5px',
              backgroundColor: index === currentIndex ? '#3b82f6' : '#d1d5db',
              cursor: 'pointer'
            }}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div style={{ textAlign: 'center', marginTop: '15px', color: '#6b7280' }}>
        {currentIndex + 1} of {reviews.length}
      </div>
    </div>
  );
};

export default ReviewSlider;

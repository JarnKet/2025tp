import ReviewSlider from '../components/ReviewSlider';

const ReviewSection = () => {
  return (
    <section style={{ padding: '40px 0', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        <ReviewSlider />
      </div>
    </section>
  );
};

export default ReviewSection;

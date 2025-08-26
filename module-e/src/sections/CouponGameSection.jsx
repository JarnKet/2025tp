import CouponGame from '../components/CouponGame';

const CouponGameSection = () => {
  return (
    <section style={{ padding: '40px 0', backgroundColor: '#f3f4f6' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>
            Win Discount Coupons!
          </h2>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>
            Play our mini-game and win amazing discounts for Lyon attractions
          </p>
        </div>
        <CouponGame />
      </div>
    </section>
  );
};

export default CouponGameSection;

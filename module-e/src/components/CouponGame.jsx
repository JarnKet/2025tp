import { useState } from 'react';

const CouponGame = () => {
  const [gameState, setGameState] = useState('idle'); // idle, spinning, result
  const [result, setResult] = useState(null);
  const [slots, setSlots] = useState(['🎰', '🎰', '🎰']);

  const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎', '7️⃣'];

  const spinSlots = () => {
    setGameState('spinning');

    // Simple animation - just show spinning for 2 seconds
    const interval = setInterval(() => {
      setSlots([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ]);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);

      // Final result
      const finalSlots = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ];
      setSlots(finalSlots);

      // Determine prize
      let prize;
      if (finalSlots[0] === finalSlots[1] && finalSlots[1] === finalSlots[2]) {
        prize = { type: '100%', message: '100% Discount!', code: 'LYON100-' + Math.random().toString(36).substr(2, 6).toUpperCase() };
      } else if (finalSlots[0] === finalSlots[1] || finalSlots[1] === finalSlots[2] || finalSlots[0] === finalSlots[2]) {
        prize = { type: '10%', message: '10% Discount!', code: 'LYON10-' + Math.random().toString(36).substr(2, 6).toUpperCase() };
      } else {
        // Random chance for small prizes
        const random = Math.random();
        if (random < 0.15) {
          prize = { type: '10%', message: '10% Discount!', code: 'LYON10-' + Math.random().toString(36).substr(2, 6).toUpperCase() };
        } else {
          prize = { type: 'none', message: 'No Prize', code: null };
        }
      }

      setResult(prize);
      setGameState('result');
    }, 2000);
  };

  const restart = () => {
    setGameState('idle');
    setResult(null);
    setSlots(['🎰', '🎰', '🎰']);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <div style={{
        backgroundColor: '#f3f4f6',
        padding: '30px',
        borderRadius: '15px',
        textAlign: 'center',
        border: '3px solid #e5e7eb'
      }}>
        <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>
          Lyon Coupon Game
        </h2>

        {gameState === 'idle' && (
          <div>
            <p style={{ marginBottom: '20px', color: '#6b7280' }}>
              Spin to win discount coupons for Lyon attractions!
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
              {slots.map((symbol, index) => (
                <div
                  key={index}
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#fbbf24',
                    border: '3px solid #f59e0b',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px'
                  }}
                >
                  {symbol}
                </div>
              ))}
            </div>
            <button
              onClick={spinSlots}
              style={{
                padding: '15px 30px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              🎰 SPIN NOW! 🎰
            </button>
          </div>
        )}

        {gameState === 'spinning' && (
          <div>
            <p style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 'bold' }}>
              Spinning...
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
              {slots.map((symbol, index) => (
                <div
                  key={index}
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#fbbf24',
                    border: '3px solid #f59e0b',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    animation: 'bounce 0.5s infinite'
                  }}
                >
                  {symbol}
                </div>
              ))}
            </div>
          </div>
        )}

        {gameState === 'result' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
              {slots.map((symbol, index) => (
                <div
                  key={index}
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#fbbf24',
                    border: '3px solid #f59e0b',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px'
                  }}
                >
                  {symbol}
                </div>
              ))}
            </div>

            <div style={{
              padding: '20px',
              backgroundColor: result.type === 'none' ? '#f3f4f6' : result.type === '100%' ? '#dcfce7' : '#dbeafe',
              borderRadius: '10px',
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '10px',
                color: result.type === 'none' ? '#6b7280' : result.type === '100%' ? '#16a34a' : '#2563eb'
              }}>
                {result.message}
              </h3>

              {result.code && (
                <div style={{
                  backgroundColor: 'white',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '2px dashed #9ca3af',
                  marginTop: '10px'
                }}>
                  <p style={{ fontWeight: 'bold', fontFamily: 'monospace' }}>
                    Code: {result.code}
                  </p>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '5px' }}>
                    Present this code at Lyon attractions
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={restart}
              style={{
                padding: '15px 30px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              🔄 PLAY AGAIN
            </button>
          </div>
        )}

        {/* Rules */}
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: 'white',
          borderRadius: '10px',
          fontSize: '12px',
          color: '#6b7280'
        }}>
          <p><strong>Rules:</strong></p>
          <p>• 3 matching symbols = 100% discount</p>
          <p>• 2 matching symbols = 10% discount</p>
          <p>• Lucky bonus chances available!</p>
        </div>
      </div>
    </div>
  );
};

export default CouponGame;

import { useState } from "react";

const CouponEvent = () => {
  const [gameState, setGameState] = useState('idle'); // 'idle', 'playing', 'result'
  const [result, setResult] = useState(null);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [spinning, setSpinning] = useState(false);

  const prizes = [
    { text: "No prize", probability: 0.5, color: "bg-gray-500" },
    { text: "10% discount coupon", probability: 0.4, color: "bg-blue-500" },
    { text: "100% discount coupon", probability: 0.1, color: "bg-green-500" }
  ];

  const generateRandomResult = () => {
    const random = Math.random();
    let cumulativeProbability = 0;

    for (const prize of prizes) {
      cumulativeProbability += prize.probability;
      if (random <= cumulativeProbability) {
        return prize;
      }
    }
    return prizes[0]; // fallback
  };

  const startGame = () => {
    setGameState('playing');
    setSelectedNumbers([]);
    setResult(null);
  };

  const selectNumber = (number) => {
    if (selectedNumbers.includes(number) || selectedNumbers.length >= 3) {
      return;
    }

    const newSelected = [...selectedNumbers, number];
    setSelectedNumbers(newSelected);

    if (newSelected.length === 3) {
      // Start spinning animation
      setSpinning(true);

      setTimeout(() => {
        const gameResult = generateRandomResult();
        setResult(gameResult);
        setGameState('result');
        setSpinning(false);
      }, 2000);
    }
  };

  const resetGame = () => {
    setGameState('idle');
    setSelectedNumbers([]);
    setResult(null);
    setSpinning(false);
  };

  const renderNumberGrid = () => {
    const numbers = Array.from({ length: 9 }, (_, i) => i + 1);

    return (
      <div className="grid grid-cols-3 gap-4 mb-6">
        {numbers.map(number => (
          <button
            key={number}
            onClick={() => selectNumber(number)}
            disabled={selectedNumbers.includes(number) || selectedNumbers.length >= 3}
            className={`w-16 h-16 rounded-lg font-bold text-xl transition-all ${
              selectedNumbers.includes(number)
                ? 'bg-blue-500 text-white transform scale-110'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            } ${
              selectedNumbers.length >= 3 && !selectedNumbers.includes(number)
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    );
  };

  const renderSpinWheel = () => {
    return (
      <div className="flex justify-center mb-6">
        <div className={`w-32 h-32 rounded-full border-8 border-blue-500 flex items-center justify-center ${
          spinning ? 'animate-spin' : ''
        }`}>
          <div className="text-center">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-sm font-semibold">
              {spinning ? 'Spinning...' : 'Lucky Wheel'}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-16">
      <div className="cs-container">
        <h2 className="text-3xl font-bold text-center mb-8">Lucky Coupon Game</h2>

        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          {gameState === 'idle' && (
            <div className="text-center">
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-xl font-semibold mb-4">Welcome to the Lucky Game!</h3>
              <p className="text-gray-600 mb-6">
                Select 3 lucky numbers and spin the wheel to win amazing prizes!
              </p>
              <button
                onClick={startGame}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
              >
                Start Game
              </button>
            </div>
          )}

          {gameState === 'playing' && (
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">
                Select 3 Lucky Numbers ({selectedNumbers.length}/3)
              </h3>

              {renderNumberGrid()}

              {selectedNumbers.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Your selected numbers:</p>
                  <div className="flex justify-center gap-2">
                    {selectedNumbers.map(num => (
                      <span key={num} className="px-3 py-1 bg-blue-500 text-white rounded-full">
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedNumbers.length === 3 && (
                <div>
                  {renderSpinWheel()}
                  {spinning && (
                    <p className="text-lg font-semibold text-blue-600 animate-pulse">
                      Determining your prize...
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {gameState === 'result' && result && (
            <div className="text-center">
              <div className="text-6xl mb-4">
                {result.text === "No prize" ? "😔" :
                 result.text === "10% discount coupon" ? "🎉" : "🏆"}
              </div>

              <h3 className="text-xl font-semibold mb-4">Game Result</h3>

              <div className={`${result.color} text-white rounded-lg p-4 mb-6`}>
                <p className="text-lg font-bold">{result.text}</p>
              </div>

              {result.text !== "No prize" && (
                <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-6">
                  <p className="text-sm text-yellow-800">
                    🎁 Congratulations! Your coupon code: <br />
                    <span className="font-mono font-bold text-lg">
                      LYON{Math.random().toString(36).substr(2, 6).toUpperCase()}
                    </span>
                  </p>
                </div>
              )}

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Your lucky numbers were:</p>
                <div className="flex justify-center gap-2">
                  {selectedNumbers.map(num => (
                    <span key={num} className="px-3 py-1 bg-gray-200 rounded-full">
                      {num}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={resetGame}
                className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                Restart Game
              </button>
            </div>
          )}

          {/* Game Rules */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="font-semibold mb-2">Game Rules:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Select 3 numbers from 1-9</li>
              <li>• Spin the wheel to determine your prize</li>
              <li>• Prizes: No prize (50%), 10% discount (40%), 100% discount (10%)</li>
              <li>• You can play as many times as you want!</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CouponEvent;

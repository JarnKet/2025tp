import { useEffect, useRef, useState } from "react";

export function CallToActionButton() {
  const [effectPos, setEffectPos] = useState({ x: 0, y: 0 });
  const [isHover, setIsHover] = useState(false);
  const buttonRef = useRef(null);

  function handleMouseMove(e) {
    if (!buttonRef.current) return;
    setIsHover(true);

    const rect = buttonRef.current.getBoundingClientRect();
    setEffectPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  function handMouseLeave() {
    setIsHover(false);
  }

  return (
    <button
      ref={buttonRef}
      className="relative px-8 py-4 bg-zinc-200 text-black rounded-lg w-[200px] h-[80px] overflow-hidden hover:scale-110 transition-all duration-300"
      onMouseMove={handleMouseMove}
      onMouseLeave={handMouseLeave}
    >
      {/* Gradient */}
      <div
        style={{
          transform: "translate(-50%, -50%)",
          left: `${effectPos.x}px`,
          top: `${effectPos.y}px`,
        }}
        className={`${isHover ? "block" : "hidden"} absolute z-10 call-action-button-gradient w-full h-full rounded-lg`}
      />

      {/* White background */}
      <div className="absolute z-30 bg-zinc-200 w-full h-full top-0 left-0 scale-95 rounded-lg overflow-hidden">
        <div
          style={{
            transform: "translate(-50%, -50%)",
            left: `${effectPos.x}px`,
            top: `${effectPos.y}px`,
          }}
          className="w-[200%] h-[200%] absolute radial-white-gradient z-40"
        ></div>
      </div>

      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-nowrap font-semibold">
        Call to action
      </p>
    </button>
  );
}

export function ReadItLoudButton({ text }) {
  const handleRead = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    speechSynthesis.speak(utterance);
  };
  return (
    <button
      className="bg-sky-800 px-6 py-3 rounded-lg text-white font-bold"
      onClick={handleRead}
    >
      Read it loud
    </button>
  );
}

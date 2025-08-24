import { useState } from "react";

const images = [
  "sample_images/basilique-notre-dame-de-fourviere-lyon.jpg",
  "sample_images/beautiful-view-in-lyon.jpg",
  "sample_images/place-bellecour-lyon.jpg",
  "sample_images/tour-metalique-lyon.jpg",
];

export default function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isOpening, setIsOpening] = useState(0);

  function handleClick({ dir }) {
    setIsOpening((prev) => (prev + 1) % images.length);
    setTimeout(() => {
      if (dir === -1) {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
      } else {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }
    }, 0);
  }

  return (
    <main>
      <section className="w-full min-h-screen flex flex-col justify-center items-center">
        <div className="relative w-11/12 max-w-[1100px] mx-auto h-[500px] border border-solid border-[#333]">
          <img className="w-full h-full" src={images[currentImage]} alt="" />
          <div
            key={isOpening + "left"}
            style={{
              backgroundImage: `url(${images[currentImage]})`,
              backgroundPosition: "left center",
              backgroundSize: "200% 100%",
            }}
            className={`rotate-y-front absolute left-0 top-0 w-1/2 h-full origin-left transition-all duration-1000`}
          ></div>
          <div
            key={isOpening + "right"}
            style={{
              backgroundImage: `url(${images[currentImage]})`,
              backgroundPosition: "right center",
              backgroundSize: "200% 100%",
            }}
            className={`-rotate-y-front absolute right-0 top-0 w-1/2 h-full origin-right transition-all duration-1000`}
          ></div>
        </div>
      </section>

      <button onClick={() => handleClick(-1)}>Prev</button>
      <button onClick={() => handleClick(1)}>Next</button>
    </main>
  );
}

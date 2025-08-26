import { useState } from "react";
import AttractionCard from "../components/AttractionCard";
import Pin from "../components/Pin";

const MAP_ATTRACTION_CONTENTS = [
  {
    title: "Parc de la Tete d'Or",
    highResImg: "images/attraction-a.jpg",
    lowResImg: "images/attraction-a-low-res.jpg",
  },
  {
    title: "Street",
    highResImg: "images/attraction-b.jpg",
    lowResImg: "images/attraction-b-low-res.jpg",
  },
  {
    title: "River",
    highResImg: "images/attraction-c.jpg",
    lowResImg: "images/attraction-c-low-res.jpg",
  },
  {
    title: "All Attractions",
    highResImg: "images/all-attractions-low-res.jpg",
    lowResImg: "images/all-attractions-low-res.jpg",
  },
];

export default function MapAttractions({ isWideScreen }) {
  const [hoverAttractionIndex, setHoverAttractionindex] = useState(null);
  return (
    <section id="map-attractions">
      <div className="cs-container">
        {/* Section title */}
        <h2 className="text-4xl font-bold text-center mb-20">
          Map Attractions
        </h2>

        {/* Map */}
        <div className="relative w-full h-[700px] border-4 border-solid border-gray-300 overflow-hidden">
          {/* Map background */}
          <div className="w-[200%] h-full absolute -translate-x-[14%] top-0 left-0 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={
                isWideScreen
                  ? "images/lyon-map.jpg"
                  : "images/lyon-map-low-res.jpg"
              }
              alt="Lyon map that has three attractions spot on the map"
            />
          </div>

          {/* Attraction cards */}
          <ul className="absolute py-14 px-4 w-1/2 top-0 left-0 grid grid-cols-2 auto-rows-auto gap-6">
            {MAP_ATTRACTION_CONTENTS.map((item, index) => (
              <li key={item.title} className="w-full h-full">
                <AttractionCard
                  title={item.title}
                  hightResImg={item.highResImg}
                  lowResImg={item.lowResImg}
                  isHover={hoverAttractionIndex === index}
                  isWideScreen={isWideScreen}
                />
              </li>
            ))}
          </ul>

          {/* Pins */}
          <div
            className="absolute top-[1%] right-[5%]"
            onMouseEnter={() => setHoverAttractionindex(0)}
            onMouseLeave={() => setHoverAttractionindex(null)}
          >
            <Pin>A</Pin>
          </div>
          <div
            className="absolute top-[42%] right-[22%]"
            onMouseEnter={() => setHoverAttractionindex(1)}
            onMouseLeave={() => setHoverAttractionindex(null)}
          >
            <Pin>B</Pin>
          </div>
          <div
            className="absolute top-[7%] right-[40%]"
            onMouseEnter={() => setHoverAttractionindex(2)}
            onMouseLeave={() => setHoverAttractionindex(null)}
          >
            <Pin>C</Pin>
          </div>
        </div>
      </div>
    </section>
  );
}

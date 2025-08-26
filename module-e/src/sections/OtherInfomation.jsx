import { useState } from "react";
import Tab from "../components/Tab";

const otherInfomations = [
  {
    title: "Tab 1",
    content: "This is the content for Tab 1.",
  },
  {
    title: "Tab 2",
    content: "This is the content for Tab 2.",
  },
  {
    title: "Tab 3",
    content: "This is the content for Tab 3.",
  },
];

export default function OtherInformation() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  function handleKeydown(e) {
    e.preventDefault();

    if (e.key === "ArrowRight") {
      setSelectedTabIndex((prev) => {
        const nextIndex = prev + 1 >= otherInfomations.length ? 0 : prev + 1;
        return nextIndex;
      });
    } else if (e.key === "ArrowLeft") {
      setSelectedTabIndex((prev) => {
        const nextIndex = prev - 1 < 0 ? otherInfomations.length - 1 : prev - 1;
        return nextIndex;
      });
    }
  }

  function handleTabClick(index) {
    setSelectedTabIndex(index);
  }

  return (
    <section id="other-information">
      <div className="cs-container">
        <h2 className="text-4xl font-bold text-center mt-20">
          Other information
        </h2>

        <div className="w-full relative">
          <ul
            tabIndex={0}
            onKeyDown={handleKeydown}
            className="relative z-40 flex items-center gap-4 my-8"
          >
            {otherInfomations.map((info, index) => (
              <li key={index}>
                <Tab
                  title={info.title}
                  isSelected={index === selectedTabIndex} // Assuming the first tab is selected by default
                  onClick={() => handleTabClick(index)}
                />
              </li>
            ))}
          </ul>
          <div className="absolute z-30 bottom-0 left-0 w-full h-1 bg-black"></div>
        </div>
        <p className="py-12 px-6">
          {otherInfomations[selectedTabIndex].content}
        </p>
      </div>
    </section>
  );
}

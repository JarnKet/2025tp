import { useContext, useState } from "react";
import { THEMES, MODES } from "../constants";
import { PhotoSliderContext } from "../features/photo-slider/Provider";
import {
  orderingImages,
  setMode,
  setTheme,
} from "../features/photo-slider/action";

export default function ConfigPanel() {
  const { state, dispatch } = useContext(PhotoSliderContext);
  const { currentMode, currentTheme } = state;

  function handleSetMode(mode) {
    dispatch(setMode(mode));
  }

  function handleSetTheme(theme) {
    dispatch(setTheme(theme));
  }

  return (
    <div className="px-4 py-2 bg-gray-100 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Configuration Panel</h2>

      <div className="flex flex-col gap-4">
        <ul className="flex items-center gap-4">
          {MODES.map((mode) => (
            <li key={mode}>
              <button
                className={`${currentMode === mode ? "bg-sky-800" : ""} px-4 py-2 bg-sky-500 capitalize text-white`}
                onClick={() => handleSetMode(mode)}
              >
                {mode}
              </button>
            </li>
          ))}
        </ul>

        <ul className="flex items-center gap-4">
          {THEMES.map((theme) => (
            <li key={theme}>
              <button
                className={`${currentTheme === theme ? "bg-sky-800" : ""} px-4 py-2 bg-sky-500 capitalize text-white`}
                onClick={() => handleSetTheme(theme)}
              >
                Theme {theme}
              </button>
            </li>
          ))}
        </ul>

        {/* Photo order */}
        <OrderingImages />
      </div>
    </div>
  );
}

function OrderingImages() {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const { state, dispatch } = useContext(PhotoSliderContext);
  const { photos } = state;

  function handleStartDrag(e, item, index) {
    setDraggedItem({ item, index });
    e.dataTransfer.effectAllow = "move";
  }

  function handleDragOver(e, index) {
    e.preventDefault();
    e.dataTransfer.effectAllow = "move";

    setDragOverIndex(index);
  }

  function handleDrop(e, dropIndex) {
    e.preventDefault();

    if (draggedItem && draggedItem.index != dropIndex) {
      const newItems = [...photos];
      const [movedItem] = newItems.splice(draggedItem.index, 1);
      newItems.splice(dropIndex, 0, movedItem);
      console.log(newItems);

      dispatch(orderingImages(newItems));
    }

    setDraggedItem(null);
    setDragOverIndex(null);
  }

  return (
    <div className="w-full overflow-y-scroll">
      <ul className="flex items-start h-[250px] gap-4">
        {photos.map((photos, index) => (
          <li
            key={photos.url + index}
            className={`${draggedItem?.index === index ? "scale-90 opacity-50" : "scale-100 opacity-100"} ${dragOverIndex === index ? "border-sky-500" : "border-black "} w-[33.33%] h-full grow-1 shrink-0 `}
            draggable="true"
            onDragStart={(e) => handleStartDrag(e, photos, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
          >
            <img
              className="w-full h-full object-cover"
              src={photos.url}
              alt={photos.name}
              draggable="false"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

import { useContext, useState } from "react";
import { modes, themes } from "../constant";
import {
  orderPhotos,
  setCurrentMode,
  setCurrentTheme,
} from "../features/photo-slide/action";
import usePhotoSlideContext from "../hook/usePhotoSlideContext";
import { extractFileName } from "../helper";
import { PhotoSlideContext } from "../features/photo-slide/Provider";

export default function ConfigPanel() {
  const { state, dispatch } = usePhotoSlideContext();
  const { currentMode, currentTheme, isConfigOpen } = state;

  function handleSelectMode(mode) {
    dispatch(setCurrentMode(mode));
  }

  function handleSelectTheme(theme) {
    dispatch(setCurrentTheme(theme));
  }

  return (
    <div
      className={`${isConfigOpen ? "flex" : "hidden"} flex flex-col gap-4 px-4 py-4 my-8 bg-gray-50 border border-solid border-black`}
    >
      <ul className="flex items-center gap-4">
        {modes.map((mode) => (
          <li key={mode}>
            <button
              className={`${currentMode === mode ? "bg-sky-700" : "bg-sky-500"} capitalize px-4 py-2 border-2 border-solid border-[#333] font-bold text-white bg-sky-500 hover:bg-transparent duration-300 hover:text-black`}
              onClick={() => handleSelectMode(mode)}
            >
              {mode}
            </button>
          </li>
        ))}
      </ul>

      <ul className="flex items-center gap-4">
        {themes.map((theme) => (
          <li key={theme}>
            <button
              className={`${currentTheme === theme ? "bg-sky-700" : "bg-sky-500"} capitalize px-4 py-2 border-2 border-solid border-[#333] font-bold text-white bg-sky-500 hover:bg-transparent duration-300 hover:text-black`}
              onClick={() => handleSelectTheme(theme)}
            >
              {theme} Theme
            </button>
          </li>
        ))}
      </ul>

      <OrderImage />
      <SetDisplayTime />
    </div>
  );
}

export function OrderImage() {
  const { state, dispatch } = usePhotoSlideContext();
  const { photos } = state;

  const [draggedIndex, setDraggedIndex] = useState(null);

  function handleDragStart(index) {
    setDraggedIndex(index);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(dropIndex) {
    if (draggedIndex && dropIndex !== draggedIndex) {
      const orderedPhotos = photos;
      const [movedPhoto] = orderedPhotos.splice(draggedIndex, 1);
      orderedPhotos.splice(dropIndex, 0, movedPhoto);

      dispatch(orderPhotos(orderedPhotos));
    }
  }

  return (
    <ul className="flex items-center w-full h-[150px] border border-solid border-zinc-500 overflow-scroll">
      {photos?.length &&
        photos.map((photo, index) => (
          <li
            key={photo.url + index}
            className="w-[33.33%] h-full grow shrink-0"
            draggable="true"
            onDrag={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
          >
            <img
              className="w-full h-full object-cover"
              src={photo.url}
              alt={extractFileName(photo.name)}
              draggable="false"
            />
          </li>
        ))}
    </ul>
  );
}

function SetDisplayTime() {
  const { state } = useContext(PhotoSlideContext);
  const { displayTime } = state;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="display-time">Display time (milisecond)</label>
      <input
        type="number"
        id="display-time"
        className="border-2 border-solid border-[#333] px-1 py-2 rounded-md"
        value={displayTime}
      />
    </div>
  );
}

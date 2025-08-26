import usePhotoSlideContext from "./hook/usePhotoSlideContext";
import {
  FullscreenButton,
  ToggleConfigButton,
  ToggleUploadButton,
  UploadSampleImagesButton,
  ExportSlideButton,
  ImportSlideButton,
  ResetSlideButton,
} from "./components/Buttons";
import ConfigPanel from "./components/ConfigPanel";
import Commandbar from "./components/Commandbar";
import UploadArea from "./components/UploadArea";
import ThemeA from "./components/Themes/ThemeA";
import { setCurrentPhotoIndex } from "./features/photo-slide/action";
import { useEffect } from "react";
import ThemeB from "./components/Themes/ThemeB";
import ThemeC from "./components/Themes/ThemeC";
import ThemeD from "./components/Themes/ThemeD";
import ThemeE from "./components/Themes/ThemeE";
import ThemeH from "./components/Themes/ThemeH";

export default function App() {
  const { state, dispatch } = usePhotoSlideContext();
  const {
    photos,
    currentPhotoindex,
    currentMode,
    currentTheme,
    isUploadAreaOpen,
    displayTime,
  } = state;
  console.log(state);

  useEffect(() => {
    window.addEventListener("keydown", handleKeydow);

    return () => {
      window.removeEventListener("keydown", handleKeydow);
    };
  }, [currentPhotoindex]);

  useEffect(() => {
    let intervalId;

    if (currentMode === "auto") {
      console.log("slide");
      intervalId = setInterval(() => {
        handleSlide(1);
      }, displayTime);
    } else if (currentMode === "random") {
      intervalId = setInterval(() => {
        handleRandom();
      }, displayTime);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [currentMode, currentPhotoindex]);

  function handleKeydow(e) {
    const key = e.key;

    if (key === "ArrowLeft") {
      console.log("left");
      handleSlide(-1);
    } else if (key === "ArrowRight") {
      console.log("right");
      handleSlide(1);
    }
  }

  function handleSlide(dir) {
    if (dir === -1) {
      dispatch(
        setCurrentPhotoIndex(
          (currentPhotoindex - 1 + photos.length) % photos.length
        )
      );
    } else if (dir === 1) {
      dispatch(setCurrentPhotoIndex((currentPhotoindex + 1) % photos.length));
    }
  }

  function handleRandom() {
    if (photos.length === 0) return;
    const index = Math.floor(Math.random() * photos.length);
    dispatch(setCurrentPhotoIndex(index));
  }

  const renderTheme = () => {
    {
      switch (currentTheme) {
        case "a": {
          return <ThemeA />;
        }
        case "b": {
          return <ThemeB />;
        }
        case "c": {
          return <ThemeC />;
        }
        case "d": {
          return <ThemeD />;
        }
        case "e": {
          return <ThemeE />;
        }
        case "h": {
          return <ThemeH />;
        }
        default: {
          return <ThemeA />;
        }
      }
    }
  };
  return (
    <main>
      <section className="py-12 cs-container">
        <h1 className="mb-2 text-4xl font-bold">Module D | Photo Slide Show</h1>
        <p className="mb-8 text-xl font-bold text-zinc-500">
          {currentMode} | {currentTheme}
        </p>
        <div className="flex items-start gap-4">
          <div className="flex flex-col gap-2">
            <UploadSampleImagesButton />
            <ToggleUploadButton />
          </div>
          <div className="flex flex-col gap-2">
            <ToggleConfigButton />
            <FullscreenButton />
          </div>
          <div className="flex flex-col gap-2">
            <ExportSlideButton />
            <ImportSlideButton />
            <ResetSlideButton />
          </div>
        </div>

        <ConfigPanel />

        <Commandbar />

        <div className="w-full border-2 border-solid border-[#333] h-[500px] my-8">
          {isUploadAreaOpen ? <UploadArea /> : renderTheme()}
        </div>
      </section>
    </main>
  );
}

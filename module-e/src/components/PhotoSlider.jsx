import { useContext } from "react";
import {
  ConfigButton,
  FullScreenButton,
  UploadAreaButton,
  UploadSamplePhotosButton,
} from "./buttons";
import ConfigPanel from "./ConfigPanel";
import { PhotoSliderContext } from "../features/photo-slider/Provider";
import UploadArea from "./UploadArea";
import ThemeA from "./Themes/ThemeA";
import ThemeB from "./Themes/ThemeB";
import ThemeC from "./Themes/ThemeC";
import ThemeD from "./Themes/ThemeD";
import ThemeF from "./Themes/ThemeF";
import CommandBar from "./CommandBar";

export default function PhotoSlider() {
  const { state } = useContext(PhotoSliderContext);
  const { isConfigOpen, isUploadAreaOpen, currentTheme, currentMode } = state;

  const renderTheme = () => {
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
      case "f": {
        return <ThemeF />;
      }

      default: {
        return <ThemeA />;
      }
    }
  };
  return (
    <div className="w-full mt-12">
      <h1 className="text-5xl font-bold text-[#333] underline">Photo slider</h1>
      <p className="mt-4 text-2xl text-[#666]">
        Theme {currentTheme} | {currentMode} mode
      </p>
      <div className="my-8">
        {/* Buttons */}
        <div className="flex gap-4 flex-wrap mb-4">
          <div className="flex flex-col gap-2">
            <UploadAreaButton />
            <UploadSamplePhotosButton />
          </div>
          <ConfigButton />
          <FullScreenButton />
        </div>

        {/* Configuration panel */}
        {isConfigOpen && <ConfigPanel />}

        <div className="w-full h-[600px] border-4 border-solid border-[#333]">
          {/* Upload Area */}
          {isUploadAreaOpen ? <UploadArea /> : renderTheme()}
        </div>

        {/* commandbar */}
        <CommandBar />
      </div>
    </div>
  );
}

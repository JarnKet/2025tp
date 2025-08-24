import usePhotoSlideContext from "../hook/usePhotoSlideContext";
import { samplePhotos } from "../constant";
import {
  addPhoto,
  toggleConfig,
  toggleUploadArea,
  importSlideData,
  resetSlideData,
} from "../features/photo-slide/action";
import { exportSlideData, importSlideData as importSlideDataUtil } from "../helper/slideUtils";
import { useRef } from "react";

export function UploadSampleImagesButton() {
  const { state, dispatch } = usePhotoSlideContext();

  function handleClick() {
    dispatch(addPhoto(samplePhotos));
  }
  return (
    <button
      aria-label="Add sample images"
      className="px-4 py-2 rouned-lg text-white font-bold bg-yellow-500"
      onClick={handleClick}
    >
      Upload Sample images
    </button>
  );
}

export function ToggleUploadButton() {
  const { state, dispatch } = usePhotoSlideContext();
  const { isUploadAreaOpen } = state;

  function handleClick() {
    dispatch(toggleUploadArea());
  }
  return (
    <button
      aria-label="Add sample images"
      className={`${isUploadAreaOpen ? "bg-red-500" : "bg-green-500"} px-4 py-2 rouned-lg text-white font-bold`}
      onClick={handleClick}
    >
      {isUploadAreaOpen ? "Close Upload" : "Upload your images"}
    </button>
  );
}

export function ToggleConfigButton() {
  const { state, dispatch } = usePhotoSlideContext();
  const { isConfigOpen } = state;

  function handleClick() {
    dispatch(toggleConfig());
  }
  return (
    <button
      aria-label="Add sample images"
      className={`${isConfigOpen ? "bg-red-500" : "bg-blue-500"} px-4 py-2 rouned-lg text-white font-bold`}
      onClick={handleClick}
    >
      {isConfigOpen ? "Close setting" : "Setting"}
    </button>
  );
}

export function FullscreenButton() {
  const { photoSlideRef } = usePhotoSlideContext();

  function handleClick() {
    console.log(photoSlideRef.current);
    photoSlideRef.current && photoSlideRef.current.requestFullscreen();
  }
  return (
    <button
      aria-label="Add sample images"
      className="px-4 py-2 rouned-lg text-white font-bold bg-[#333]"
      onClick={handleClick}
    >
      Full Screen
    </button>
  );
}

export function ExportSlideButton() {
  const { state } = usePhotoSlideContext();

  function handleClick() {
    const result = exportSlideData(state);
    if (result.success) {
      alert(`Slideshow exported successfully as ${result.filename}`);
    } else {
      alert(`Export failed: ${result.error}`);
    }
  }

  return (
    <button
      aria-label="Export slideshow"
      className="px-4 py-2 rouned-lg text-white font-bold bg-purple-500"
      onClick={handleClick}
    >
      Export Slideshow
    </button>
  );
}

export function ImportSlideButton() {
  const { dispatch } = usePhotoSlideContext();
  const fileInputRef = useRef(null);

  function handleClick() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const slideData = await importSlideDataUtil(file);
      dispatch(importSlideData(slideData));
      alert('Slideshow imported successfully!');
    } catch (error) {
      alert(`Import failed: ${error.message}`);
    }

    // Reset file input
    event.target.value = '';
  }

  return (
    <>
      <button
        aria-label="Import slideshow"
        className="px-4 py-2 rouned-lg text-white font-bold bg-indigo-500"
        onClick={handleClick}
      >
        Import Slideshow
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </>
  );
}

export function ResetSlideButton() {
  const { dispatch } = usePhotoSlideContext();

  function handleClick() {
    if (window.confirm('Are you sure you want to reset the slideshow? This will restore default settings and sample images.')) {
      dispatch(resetSlideData());
      alert('Slideshow reset successfully!');
    }
  }

  return (
    <button
      aria-label="Reset slideshow"
      className="px-4 py-2 rouned-lg text-white font-bold bg-red-600"
      onClick={handleClick}
    >
      Reset Slideshow
    </button>
  );
}

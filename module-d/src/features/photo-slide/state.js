import { samplePhotos } from "../../constant";

// Helper function to load state from localStorage
const loadStateFromStorage = () => {
  try {
    const savedState = localStorage.getItem('slideShowState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      return {
        ...parsedState,
        isConfigOpen: false, // Always start with config closed
        isUploadAreaOpen: false, // Always start with upload area closed
      };
    }
  } catch (error) {
    console.warn('Failed to load state from localStorage:', error);
  }
  return null;
};

const defaultState = {
  currentPhotoindex: 0,
  currentMode: "manual",
  currentTheme: "a",
  photos: samplePhotos,
  isConfigOpen: false,
  isUploadAreaOpen: false,
  displayTime: 2000,
};

const state = loadStateFromStorage() || defaultState;

export default state;

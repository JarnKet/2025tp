import {
  ADD_PHOTO,
  ORDER_PHOTOS,
  SET_CURRENT_MODE,
  SET_CURRENT_PHOTO_INDEX,
  SET_CURRENT_THEME,
  TOGGLE_CONFIG,
  TOGGLE_UPLOAD_AREA,
  SET_DISPLAY_TIME,
  IMPORT_SLIDE_DATA,
  RESET_SLIDE_DATA,
  LOAD_FROM_STORAGE,
} from "./actionType";
import { samplePhotos } from "../../constant";

// Helper function to save state to localStorage
const saveStateToStorage = (state) => {
  try {
    const stateToSave = {
      currentPhotoindex: state.currentPhotoindex,
      currentMode: state.currentMode,
      currentTheme: state.currentTheme,
      photos: state.photos,
      displayTime: state.displayTime,
    };
    localStorage.setItem('slideShowState', JSON.stringify(stateToSave));
  } catch (error) {
    console.warn('Failed to save state to localStorage:', error);
  }
};

export default function reducer(state, action) {
  let newState;
  
  switch (action.type) {
    case SET_CURRENT_PHOTO_INDEX: {
      newState = {
        ...state,
        currentPhotoindex: action.payload.index,
      };
      saveStateToStorage(newState);
      return newState;
    }
    case SET_CURRENT_MODE: {
      newState = {
        ...state,
        currentMode: action.payload.newMode,
      };
      saveStateToStorage(newState);
      return newState;
    }
    case SET_CURRENT_THEME: {
      console.log(action.payload.newTheme);
      newState = {
        ...state,
        currentTheme: action.payload.newTheme,
      };
      saveStateToStorage(newState);
      return newState;
    }
    case ADD_PHOTO: {
      newState = {
        ...state,
        photos: [...state.photos, ...action.payload.newPhoto],
      };
      saveStateToStorage(newState);
      return newState;
    }
    case TOGGLE_CONFIG: {
      return {
        ...state,
        isConfigOpen: !state.isConfigOpen,
      };
    }
    case TOGGLE_UPLOAD_AREA: {
      return {
        ...state,
        isUploadAreaOpen: !state.isUploadAreaOpen,
      };
    }
    case ORDER_PHOTOS: {
      newState = {
        ...state,
        photos: action.payload.orderedPhotos,
      };
      saveStateToStorage(newState);
      return newState;
    }
    case SET_DISPLAY_TIME: {
      newState = {
        ...state,
        displayTime: action.payload.time,
      };
      saveStateToStorage(newState);
      return newState;
    }
    case IMPORT_SLIDE_DATA: {
      const { slideData } = action.payload;
      newState = {
        ...state,
        currentPhotoindex: slideData.currentPhotoindex || 0,
        currentMode: slideData.currentMode || "manual",
        currentTheme: slideData.currentTheme || "a",
        photos: slideData.photos || samplePhotos,
        displayTime: slideData.displayTime || 2000,
      };
      saveStateToStorage(newState);
      return newState;
    }
    case RESET_SLIDE_DATA: {
      const defaultState = {
        currentPhotoindex: 0,
        currentMode: "manual",
        currentTheme: "a",
        photos: samplePhotos,
        displayTime: 2000,
        isConfigOpen: false,
        isUploadAreaOpen: false,
      };
      saveStateToStorage(defaultState);
      return defaultState;
    }
    case LOAD_FROM_STORAGE: {
      try {
        const savedState = localStorage.getItem('slideShowState');
        if (savedState) {
          const parsedState = JSON.parse(savedState);
          return {
            ...state,
            ...parsedState,
            isConfigOpen: false,
            isUploadAreaOpen: false,
          };
        }
      } catch (error) {
        console.warn('Failed to load state from localStorage:', error);
      }
      return state;
    }
    default:
      return state;
  }
}

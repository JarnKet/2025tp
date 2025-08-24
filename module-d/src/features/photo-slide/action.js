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

export const setCurrentPhotoIndex = (index) => {
  return {
    type: SET_CURRENT_PHOTO_INDEX,
    payload: { index },
  };
};

export const setCurrentMode = (newMode) => {
  return {
    type: SET_CURRENT_MODE,
    payload: { newMode },
  };
};
export const setCurrentTheme = (newTheme) => {
  return {
    type: SET_CURRENT_THEME,
    payload: { newTheme },
  };
};
export const addPhoto = (newPhoto) => {
  console.log(newPhoto);
  return {
    type: ADD_PHOTO,
    payload: { newPhoto },
  };
};
export const toggleConfig = () => {
  return {
    type: TOGGLE_CONFIG,
  };
};
export const toggleUploadArea = () => {
  return {
    type: TOGGLE_UPLOAD_AREA,
  };
};
export const orderPhotos = (orderedPhotos) => {
  return {
    type: ORDER_PHOTOS,
    payload: { orderedPhotos },
  };
};

export const setDisplayTime = (time) => {
  return {
    type: SET_DISPLAY_TIME,
    payload: { time },
  };
};

export const importSlideData = (slideData) => {
  return {
    type: IMPORT_SLIDE_DATA,
    payload: { slideData },
  };
};

export const resetSlideData = () => {
  return {
    type: RESET_SLIDE_DATA,
  };
};

export const loadFromStorage = () => {
  return {
    type: LOAD_FROM_STORAGE,
  };
};

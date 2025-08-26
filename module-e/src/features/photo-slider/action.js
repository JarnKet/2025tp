import {
  ADD_PHOTO,
  SET_CURRENT_PHOTO,
  SET_THEME,
  TOGGLE_CONFIG,
  ORDER_IMAGES,
  TOGGLE_UPLOAD_AREA,
} from "./actionType";

const setCurrentPhotoIndex = (index) => {
  console.log("setCurrentPhotoIndex action called with index:", index);
  return {
    type: SET_CURRENT_PHOTO,
    payload: { index },
  };
};

const addPhotos = (photos) => {
  return {
    type: ADD_PHOTO,
    payload: { photos },
  };
};

const toggleConfig = () => {
  return {
    type: TOGGLE_CONFIG,
  };
};

const setMode = (mode) => {
  return {
    type: "SET_MODE",
    payload: { mode },
  };
};

const setTheme = (theme) => {
  return {
    type: SET_THEME,
    payload: { theme },
  };
};

const orderingImages = (orderedPhotos) => {
  return {
    type: ORDER_IMAGES,
    payload: { orderedPhotos },
  };
};

const setToggleUploadArea = () => {
  return {
    type: TOGGLE_UPLOAD_AREA,
  };
};

export {
  setCurrentPhotoIndex,
  addPhotos,
  toggleConfig,
  setMode,
  setTheme,
  orderingImages,
  setToggleUploadArea,
};

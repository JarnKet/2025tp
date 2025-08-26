import {
  ADD_PHOTO,
  SET_CURRENT_PHOTO,
  TOGGLE_CONFIG,
  SET_MODE,
  SET_THEME,
  ORDER_IMAGES,
  TOGGLE_UPLOAD_AREA,
} from "./actionType";
import photoSliderState from "./state";

export default function photoSliderReducer(state = photoSliderState, action) {
  switch (action.type) {
    case SET_CURRENT_PHOTO: {
      return {
        ...state,
        currentPhotoIndex: action.payload.index,
      };
    }
    case ADD_PHOTO: {
      return {
        ...state,
        photos: [...state.photos, ...action.payload.photos],
      };
    }
    case TOGGLE_CONFIG: {
      return {
        ...state,
        isConfigOpen: !state.isConfigOpen,
      };
    }
    case SET_MODE: {
      return {
        ...state,
        currentMode: action.payload.mode,
      };
    }
    case SET_THEME: {
      return {
        ...state,
        currentTheme: action.payload.theme,
      };
    }

    case ORDER_IMAGES: {
      return {
        ...state,
        photos: action.payload.orderedPhotos,
      };
    }

    case TOGGLE_UPLOAD_AREA: {
      return {
        ...state,
        isUploadAreaOpen: !state.isUploadAreaOpen,
      };
    }
    default: {
      return state;
    }
  }
}

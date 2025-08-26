import { createContext, useReducer } from "react";
import photoSliderReducer from "./reducer";
import initState from "./state";

export const PhotoSliderContext = createContext();

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(photoSliderReducer, initState);

  const photoSliderRef = { current: null };
  return (
    <PhotoSliderContext.Provider value={{ state, dispatch, photoSliderRef }}>
      {children}
    </PhotoSliderContext.Provider>
  );
}

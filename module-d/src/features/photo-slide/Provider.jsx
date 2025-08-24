import { createContext, useReducer, useRef, useEffect } from "react";
import reducer from "./reducer";
import initState from "./state";
import { loadFromStorage } from "./action";

export const PhotoSlideContext = createContext(null);

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);
  const photoSlideRef = useRef(null);

  // Load saved state when the provider mounts
  useEffect(() => {
    dispatch(loadFromStorage());
  }, []);

  return (
    <PhotoSlideContext.Provider value={{ state, dispatch, photoSlideRef }}>
      {children}
    </PhotoSlideContext.Provider>
  );
}

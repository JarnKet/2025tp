import { useContext } from "react";
import { PhotoSlideContext } from "../features/photo-slide/Provider";

export default function usePhotoSlideContext() {
  const context = useContext(PhotoSlideContext);

  return context;
}

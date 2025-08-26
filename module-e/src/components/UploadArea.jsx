import { useContext } from "react";
import {
  addPhotos,
  setToggleUploadArea,
} from "../features/photo-slider/action";
import { PhotoSliderContext } from "../features/photo-slider/Provider";

export default function UploadArea() {
  const { dispatch } = useContext(PhotoSliderContext);

  function handleUploadFiles(e) {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
      }));
      dispatch(addPhotos(newImages));
      dispatch(setToggleUploadArea());
    }
  }

  return (
    <>
      <div className=" relative border-2 border-dashed border-[#333] w-full h-full flex justify-center items-center">
        <label
          htmlFor="image-file"
          className="text-xl text-zinc-500 italic underline"
        >
          Browse file
        </label>
        <input
          id="image-file"
          type="file"
          className="w-full h-full absolute top-0 left-0 opacity-0"
          onChange={handleUploadFiles}
          multiple
        />
      </div>
    </>
  );
}

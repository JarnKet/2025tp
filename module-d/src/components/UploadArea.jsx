import { addPhoto } from "../features/photo-slide/action";
import usePhotoSlideContext from "../hook/usePhotoSlideContext";

export default function UploadArea() {
  const { dispatch } = usePhotoSlideContext();
  function handleUploadFiles(e) {
    console.log(e);
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
      }));
      console.log(newImages);

      dispatch(addPhoto(newImages));
    }
  }
  return (
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
  );
}

export function extractFileName(filePath) {
  if (!filePath) return;
  const fileNameWidthExt = filePath.split("/").pop();

  const nameWithoutExt = fileNameWidthExt.replace(/\.[^/.]+$/, "");

  const normalName = nameWithoutExt
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return normalName;
}

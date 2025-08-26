export function extractFileName(filePath) {
  if (!filePath) return;
  // Get file name with extension
  const fileNameWidthExt = filePath.split("/").pop();

  // Remove extension
  const nameWithoutExt = fileNameWidthExt.replace(/\.[^/.]+$/, "");

  const normalName = nameWithoutExt
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return normalName;
}

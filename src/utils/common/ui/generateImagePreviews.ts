// generate object URLs for previews
export const generateImagePreviews = (files: (File | string)[]) => {
  return files.map((file) =>
    typeof file === "string" ? file : URL.createObjectURL(file)
  );
};

export const isObjectURL = (url: string) => {
  return url.startsWith("blob:");
};

/**
 * Converts an RGB(A) string to a hex color string.
 * @param rgb - A string like "rgb(255, 0, 0)" or "rgba(255, 0, 0, 1)"
 * @returns Hex color string like "#ff0000"
 */
export const rgbToHex = (rgb: string | undefined): string => {
  if (!rgb) return "#000000";

  const result = rgb.match(/\d+/g);
  if (!result) return "#000000";

  return (
    "#" +
    result
      .slice(0, 3) // only take R, G, B
      .map((x) => ("0" + parseInt(x, 10).toString(16)).slice(-2))
      .join("")
  );
};

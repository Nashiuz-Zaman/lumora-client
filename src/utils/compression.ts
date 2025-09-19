// utils/fflateQuery.ts
import { strToU8, strFromU8, zlibSync, unzlibSync } from "fflate";

/**
 * Compress an object into a URL-safe base64 string
 */
export const compressObjectToBase64Url = (obj: any): string => {
  const json = JSON.stringify(obj);
  const compressed = zlibSync(strToU8(json));
  const base64 = btoa(String.fromCharCode(...compressed));
  // URL-safe Base64
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

/**
 * Decompress a base64 string back into an object
 */
export const decompressBase64UrlToObject = <T = any>(
  base64: string
): T | null => {
  try {
    // Reverse URL-safe Base64
    const padded =
      base64.replace(/-/g, "+").replace(/_/g, "/") +
      "=".repeat((4 - (base64.length % 4)) % 4);
    const str = atob(padded);
    const arr = Uint8Array.from(str.split("").map((c) => c.charCodeAt(0)));
    const decompressed = strFromU8(unzlibSync(arr));
    return JSON.parse(decompressed) as T;
  } catch (err) {
    console.warn("Failed to decompress query param:", err);
    return null;
  }
};

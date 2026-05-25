// utils/video.ts
export type TVideoData = { type: "youtube" | "amazon"; id: string } | null;

export const extractVideoId = (url: string): TVideoData => {
  try {
    const parsedUrl = new URL(url);

    // YouTube
    if (parsedUrl.hostname.includes("youtu.be")) {
      return { type: "youtube", id: parsedUrl.pathname.slice(1) };
    }
    if (parsedUrl.hostname.includes("youtube.com")) {
      const id = parsedUrl.searchParams.get("v");
      if (id) return { type: "youtube", id };
    }

    // Amazon (example: amazon.com/video/VIDEO_ID)
    if (parsedUrl.hostname.includes("amazon.com")) {
      const segments = parsedUrl.pathname.split("/").filter(Boolean);
      const id = segments[segments.length - 1];
      if (id) return { type: "amazon", id };
    }
  } catch (e) {
    console.error("Invalid video URL:", url, e);
  }

  return null;
};

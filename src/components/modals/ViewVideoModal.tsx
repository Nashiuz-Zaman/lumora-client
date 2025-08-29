// ViewVideoModal.tsx
import { BaseModal } from "./BaseModal";
import { extractVideoId } from "@/utils";

interface IViewVideoModalProps {
  videoUrl: string;
  condition: boolean;
  closeFunction?: () => void;
  className?: string;
}

const ViewVideoModal = ({
  videoUrl,
  condition,
  closeFunction,
  className = "",
}: IViewVideoModalProps) => {
  const videoData = extractVideoId(videoUrl);

  let embedUrl: string | null = null;
  if (videoData?.type === "youtube") {
    embedUrl = `https://www.youtube.com/embed/${videoData.id}`;
  } else if (videoData?.type === "amazon") {
    embedUrl = `https://www.amazon.com/video/embed/${videoData.id}`;
  }

  return (
    <BaseModal
      condition={condition}
      closeFunction={closeFunction}
      className={`bg-white rounded-lg overflow-hidden p-3 ${className}`}
    >
      {embedUrl ? (
        <div className="w-[90vw] max-w-4xl aspect-video mt-2">
          <iframe
            src={embedUrl}
            title="Product Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      ) : (
        <p className="p-6 text-center text-red-600">Invalid Video URL</p>
      )}
    </BaseModal>
  );
};

export default ViewVideoModal;

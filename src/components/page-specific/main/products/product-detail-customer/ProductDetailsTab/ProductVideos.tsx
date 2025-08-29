"use client";

import { useState } from "react";
import Image from "next/image";
import { NoData, CustomSwiper } from "@/components/shared";
import ViewVideoModal from "@/components/modals/ViewVideoModal";
import { useModal } from "@/hooks";
import { extractVideoId } from "@/utils";
import { IVideo } from "@/types";

interface IProductVideosProps {
  data: IVideo[];
}

export const ProductVideos = ({ data }: IProductVideosProps) => {
  const { openModal, closeModal, isModalOpen } = useModal();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  if (!data || !data.length) {
    return (
      <section className="grow relative p-4 sm:p-6">
        <NoData text="No Videos" centered />
      </section>
    );
  }

  const handleThumbnailClick = (url: string) => {
    setActiveVideo(url);
    openModal();
  };

  const renderThumbnail = (url: string) => {
    const videoData = extractVideoId(url);
    let thumbnail: string | null = null;

    if (videoData?.type === "youtube") {
      thumbnail = `https://img.youtube.com/vi/${videoData.id}/hqdefault.jpg`;
    } else if (videoData?.type === "amazon") {
      thumbnail = "/placeholder/amazon-placeholder.webp";
    }

    return (
      <div
        key={url}
        className="cursor-pointer group overflow-hidden rounded-lg border border-neutral-200 hover:shadow-lg transition duration-300 aspect-video xl"
        onClick={() => handleThumbnailClick(url)}
      >
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt="Product Video Thumbnail"
            width={600}
            height={600}
            className="object-cover group-hover:scale-105 transition-transform duration-300 w-full h-full block"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-red-500">
            Invalid URL
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="pt-4 sm:pt-6">
      <CustomSwiper
        data={data}
        spaceBetween={15}
        renderItem={(video: IVideo) => renderThumbnail(video.url)}
      />

      {isModalOpen && activeVideo && (
        <ViewVideoModal
          videoUrl={activeVideo}
          condition={isModalOpen}
          closeFunction={closeModal}
        />
      )}
    </section>
  );
};

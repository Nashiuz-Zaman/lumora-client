"use client";

import React, { VideoHTMLAttributes } from "react";

interface IDesignerVideoProps {
  src: string;
  poster?: string;
  className?: string;
  videoProps?: VideoHTMLAttributes<HTMLVideoElement>;
}

export const DesignerVideo = ({
  src,
  poster,
  className = "",
  videoProps,
}: IDesignerVideoProps) => {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <video
        aria-hidden="true"
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        {...videoProps}
        className="w-full h-full object-cover block"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-transparent pointer-events-auto" />
    </div>
  );
};

"use client";

import Image from "next/image";
import React, { useState, ChangeEvent } from "react";
import { IcfyIcon } from "./IcfyIcon";

interface IProfilePhotoChangerProps {
  initialImage?: string;
  buttonText?: string;
  wrapperClasses?: string;
  imageClasses?: string;
  buttonClasses?: string;
  onFileSelect?: (file: File) => void;
}

export const ProfilePhotoChanger = ({
  initialImage = "",
  buttonText = "Change Photo",
  wrapperClasses = "",
  imageClasses = "",
  buttonClasses = "",
  onFileSelect,
}: IProfilePhotoChangerProps) => {
  const [selectedImage, setSelectedImage] = useState<string>(initialImage);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result as string;
      if (imageData) setSelectedImage(imageData);
    };
    reader.readAsDataURL(file);
    // Notify parent component about the selected file
    if (onFileSelect) onFileSelect(file);
  };

  const currentImage = selectedImage || initialImage;

  return (
    <div
      className={`flex flex-col items-center gap-4 p-6 bg-white/50 backdrop-blur-md rounded-2xl ${wrapperClasses}`}
    >
      {/* Profile photo */}
      <div
        className={`w-32 h-32 rounded-full border border-neutral-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md ${imageClasses}`}
      >
        {currentImage ? (
          <Image
            width={400}
            height={400}
            className="w-full h-full object-cover"
            src={currentImage}
            alt="Profile picture"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-100">
            <IcfyIcon
              icon="mingcute:user-3-fill"
              className="text-[3rem] text-neutral-400"
            />
          </div>
        )}
      </div>

      {/* Upload button */}
      <label
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-neutral-700 text-neutral-50 font-semibold text-sm cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 ${buttonClasses}`}
      >
        <IcfyIcon icon="mdi:camera" />
        <span>{buttonText}</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          name="customerProfilePhoto"
        />
      </label>
    </div>
  );
};

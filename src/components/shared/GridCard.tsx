"use client";

import Image from "next/image";

export type GridCardImage = {
  src: string;
  alt: string;
};

export type GridCardProps = {
  images: GridCardImage[];
  className?: string;
};

export const GridCard = ({ images, className = "" }: GridCardProps) => {
  const count = images.length;

  return (
    <div className={`w-full ${className}`}>
      {count === 1 ? (
        // Single Image (1x1 square)
        <div className="relative w-full aspect-square">
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            className="object-cover rounded-md"
          />
        </div>
      ) : count === 2 ? (
        // Two Images (side by side inside 1 square)
        <div className="grid grid-cols-2 w-full aspect-square gap-2">
          {images.map((img, idx) => (
            <div key={idx} className="relative w-full h-full">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      ) : count === 3 ? (
        // Three Images (top spans 2, bottom split)
        <div className="grid grid-cols-2 grid-rows-2 gap-5 w-full aspect-square">
          <div className="relative w-full col-span-2">
            <div className="relative w-full h-full">
              <Image
                src={images[0].src}
                alt={images[0].alt}
                fill
                className="object-cover rounded-md"
              />
            </div>
          </div>
          {images.slice(1).map((img, idx) => (
            <div key={idx} className="relative w-full aspect-square">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      ) : (
        // 4+ Images (2x2 grid)
        <div className="grid grid-cols-2 grid-rows-2 gap-5">
          {images.slice(0, 4).map((img, idx) => (
            <div key={idx} className="relative w-full aspect-square">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

"use client";

import Image from "next/image";

export interface IGridCardImage {
  src: string;
  alt: string;
}

export interface IGridCardProps {
  images: IGridCardImage[];
  className?: string;
}

const GridCardImage = ({ src, alt }: IGridCardImage) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={600}
      height={600}
      className="object-cover w-full h-full"
    />
  );
};

export const GridCard = ({ images, className = "" }: IGridCardProps) => {
  const count = images?.length;

  return (
    <div className={`w-full ${className}`}>
      {count === 1 ? (
        // Single Image (1x1 square)
        <div className="relative w-full aspect-square">
          <GridCardImage src={images[0].src} alt={images[0].alt} />
        </div>
      ) : count === 2 ? (
        // Two Images (side by side inside 1 square)
        <div className="grid grid-cols-2 w-full aspect-square gap-2">
          {images.map((img, idx) => (
            <div key={idx} className="relative w-full h-full">
              <GridCardImage src={img.src} alt={img.alt} />
            </div>
          ))}
        </div>
      ) : count === 3 ? (
        // Three Images (top spans 2, bottom split)
        <div className="grid grid-cols-2 grid-rows-2 gap-5 w-full aspect-square">
          <div className="relative w-full col-span-2">
            <div className="relative w-full h-full">
              <GridCardImage src={images[0].src} alt={images[0].alt} />
            </div>
          </div>
          {images?.slice(1).map((img, idx) => (
            <div key={idx} className="relative w-full aspect-square">
              <GridCardImage src={img.src} alt={img.alt} />
            </div>
          ))}
        </div>
      ) : (
        // 4+ Images (2x2 grid)
        <div className="grid grid-cols-2 grid-rows-2 gap-5">
          {images?.slice(0, 4).map((img, idx) => (
            <div key={idx} className="relative w-full aspect-square">
              <GridCardImage src={img.src} alt={img.alt} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

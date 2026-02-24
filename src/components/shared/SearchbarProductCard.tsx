"use client";

import Link from "next/link";
import Image from "next/image";

interface ISearchbarProductCardProps {
  title: string;
  slug: string;
  src: string;
  onClick?: () => void;
}

export const SearchbarProductCard = ({
  title,
  slug,
  src,

  onClick = () => {},
}: ISearchbarProductCardProps) => {
  return (
    <Link
      onClick={onClick}
      href={`/products/${slug}`}
      className="flex items-center gap-3 px-3 py-2.5 hover:bg-neutral-100 transition-colors cursor-pointer"
    >
      <div className="shrink-0 w-12 h-12 relative">
        <Image
          src={src}
          alt={title}
          width={100}
          height={100}
          className="object-contain w-full h-full rounded"
        />
      </div>
      <p className="text-sm font-normal line-clamp-2 text-neutral-700">{title}</p>
    </Link>
  );
};

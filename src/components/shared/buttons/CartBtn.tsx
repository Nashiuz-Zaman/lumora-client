"use client";

import Link from "next/link";
import React from "react";
import { CartIcon } from "../icons";

export const CartBtn = ({
  href = "/cart",
  className = "",
  itemsQty = 0,
}: {
  href?: string;
  className?: string;
  itemsQty?: number;
}) => {
  return (
    <div
      title="Go To Cart Page"
      className={`relative text-3xl 2xl:text-4xl ${className}`}
    >
      {itemsQty > 0 && (
        <p className="absolute p-1 h-6 min-w-6 grid place-content-center -top-3 text-xs left-full -translate-x-3 bg-red-500 rounded-full text-white">
          {itemsQty}
        </p>
      )}
      <Link
        href={href}
        className="text-inherit aspect-square [font-size:inherit]"
      >
        <CartIcon className="[font-size:inherit]" />
      </Link>
    </div>
  );
};

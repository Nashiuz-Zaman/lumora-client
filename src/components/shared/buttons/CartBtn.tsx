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
      className={`relative text-3xl 2xl:text-5xl ${className}`}
    >
      {itemsQty > 0 && (
        <p className="absolute w-6.5 xl:w-7 grid place-content-center aspect-square -top-3 text-sm -right-3 bg-red-500 rounded-full text-white">
          {itemsQty}
        </p>
      )}
      <Link
        href={href}
        className="[color:inherit] aspect-square [font-size:inherit]"
      >
        <CartIcon className="[font-size:inherit]" />
      </Link>
    </div>
  );
};

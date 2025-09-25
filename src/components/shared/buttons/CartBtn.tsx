"use client";

import Link from "next/link";
import React from "react";
import { CartIcon } from "../icons";

export const CartBtn = ({
  href = "/cart",
  className = "",
  quantity = 0,
}: {
  href?: string;
  className?: string;
  quantity?: number;
}) => {

  
  return (
    <div className={`relative text-3xl 2xl:text-5xl ${className}`}>
      {quantity > 0 && (
        <p className="absolute w-6.5 xl:w-7 grid place-content-center aspect-square -top-3 text-sm -right-3 bg-white rounded-full text-primary">
          {quantity}
        </p>
      )}
      <Link
        href={href}
        className="text-white aspect-square [font-size:inherit]"
      >
        <CartIcon className="[font-size:inherit]" />
      </Link>
    </div>
  );
};

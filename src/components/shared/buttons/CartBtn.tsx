"use client";

import Link from "next/link";
import React from "react";
import { CartIcon } from "../icons/CartIcon";

interface ICartBtnProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  className?: string;
  itemsQty?: number;
}

export const CartBtn = ({
  href = "/cart",
  className = "",
  itemsQty = 0,
  ...props
}: ICartBtnProps) => {
  return (
    <div
      title="Go To Cart Page"
      className={`relative text-3xl 2xl:text-4xl ${className}`}
    >
      {itemsQty > 0 && (
        <span className="absolute p-1 h-6 min-w-6 grid place-content-center -top-3 left-full -translate-x-3 text-xs bg-red-500 rounded-full text-neutral-50">
          {itemsQty}
        </span>
      )}

      <Link
        href={href}
        aria-label="Go to cart"
        className="text-inherit aspect-square inline-flex items-center justify-center [font-size:inherit]"
        {...props}
      >
        <CartIcon className="[font-size:inherit]" />
      </Link>
    </div>
  );
};

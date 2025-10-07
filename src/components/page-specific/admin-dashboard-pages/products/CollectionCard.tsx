"use client";

import { ButtonBtnTrans } from "@/components/shared";
import { TrashcanIcon } from "@/components/shared";
import Link from "next/link";

export const CollectionCard = ({
  title,
  onDelete,
  noDeleteBtn = false,
  href = "/",
  className = "",
  productCount,
}: {
  title: string;
  onDelete?: () => void;
  noDeleteBtn?: boolean;
  href: string;
  className?: string;
  productCount?: number;
}) => {
  return (
    <Link href={href}>
      <div
        className={`p-4 border border-neutral-200 rounded-md bg-white inline-block w-full hover:bg-primary transition-colors hover:text-white hover:border-primary group ${className}`}
      >
        <div className="flex items-start justify-between">
          <p className="font-semibold text-lg">{title}</p>
          {!noDeleteBtn && (
            <ButtonBtnTrans
              type="button"
              className="text-red-600"
              title="Delete Collection"
              onClick={onDelete}
            >
              <TrashcanIcon />
            </ButtonBtnTrans>
          )}
        </div>

        {typeof productCount === "number" && (
          <p className="mt-2 text-sm text-neutral-500 transition-colors group-hover:text-white">
            {productCount} {productCount === 1 ? "product" : "products"}
          </p>
        )}
      </div>
    </Link>
  );
};

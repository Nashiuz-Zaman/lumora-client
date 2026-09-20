"use client";

import { ButtonBtnTrans } from "@buttons/ButtonBtnTrans";
import { TrashcanIcon } from "@icons/TrashcanIcon";
import Link from "next/link";

export const CollectionCard = ({
  title,
  onDelete,
  noDeleteBtn = false,
  href = "/",
  className = "",
  count,
}: {
  title: string;
  onDelete?: () => void;
  noDeleteBtn?: boolean;
  href: string;
  className?: string;
  count?: number;
}) => {
  return (
    <Link href={href}>
      <div
        className={`p-4 border border-zinc-200 rounded-md bg-white inline-block w-full hover:bg-primary transition-colors hover:text-zinc-50 hover:border-primary group ${className}`}
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

        {typeof count === "number" && (
          <p className="mt-2 text-sm text-zinc-500 transition-colors group-hover:text-zinc-50">
            {count} {count === 1 ? "product" : "products"}
          </p>
        )}
      </div>
    </Link>
  );
};

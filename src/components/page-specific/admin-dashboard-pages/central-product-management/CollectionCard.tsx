"use client";

import { ButtonBtnTrans } from "@/components/shared";
import { TrashcanIcon } from "@/components/shared";
import Link from "next/link";

export const CollectionCard = ({
  title,
  onDelete,
  noDeleteBtn = false,
  href = "/",
}: {
  title: string;
  onDelete?: () => void;
  noDeleteBtn?: boolean;
  href: string;
}) => {
  return (
    <Link href={href}>
      <div className="px-3 py-3 border border-neutral-200 rounded-md bg-white inline-block">
        {!noDeleteBtn && (
          <ButtonBtnTrans
            type="button"
            className="ml-auto text-red-600"
            title="Delete Collection"
            onClick={onDelete}
          >
            <TrashcanIcon />
          </ButtonBtnTrans>
        )}
        <p className="font-semibold pr-20 mt-2">{title}</p>
      </div>
    </Link>
  );
};

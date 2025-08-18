"use client";

import { ButtonBtnTrans } from "@/components/shared";
import { TrashcanIcon } from "@/components/shared";

const CollectionCard = ({
  title,
  onDelete,
  noDeleteBtn = false,
}: {
  title: string;
  onDelete: () => void;
  noDeleteBtn?: boolean;
}) => {
  return (
    <div className="px-3 py-3 border border-neutral-200 rounded-md bg-white shadow-sm">
      {!noDeleteBtn && (
        <ButtonBtnTrans
          type="button"
          modifyClasses="ml-auto text-red-600"
          title="Delete Collection"
          onClick={onDelete}
        >
          <TrashcanIcon />
        </ButtonBtnTrans>
      )}
      <p className="font-semibold pr-20 mt-2 underline">{title}</p>
    </div>
  );
};

export default CollectionCard;

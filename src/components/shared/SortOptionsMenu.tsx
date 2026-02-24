"use client";

import { useEffect, useState } from "react";
import { RadioButtonGroup, IRadioOption } from "./RadioBtnGroup";

interface ISortOptionsMenuProps {
  selected: string;
  options?: IRadioOption[];
  onUpdate?: (value: string) => void;
}

const SortOptionsMenu = ({
  selected,
  options = [],
  onUpdate,
}: ISortOptionsMenuProps) => {
  const [sortBy, setSortBy] = useState(
    selected?.includes("-") ? selected.replace("-", "") : selected,
  );
  const [sortOrder, setSortOrder] = useState(
    selected?.includes("-") ? "-" : "",
  );

  useEffect(() => {
    const newSort = `${sortOrder}${sortBy}`;
    if (selected !== newSort) {
      onUpdate?.(newSort);
    }
  }, [sortBy, sortOrder, onUpdate, selected]);

  if (!options.length) return null;

  return (
    <div>
      <h4 className="mb-2 font-semibold">Sort by</h4>
      <RadioButtonGroup
        onChange={(value) => setSortBy(String(value))}
        selectedValue={sortBy}
        name="sortBy"
        className="pb-4 border-b border-neutral-200 mb-4"
        options={options}
      />

      <h4 className="mb-2 font-semibold">Order</h4>
      <RadioButtonGroup
        onChange={(value) => setSortOrder(String(value))}
        selectedValue={sortOrder}
        name="sortOrder"
        options={[
          { label: "Ascending", value: "" },
          { label: "Descending", value: "-" },
        ]}
      />
    </div>
  );
};

export default SortOptionsMenu;

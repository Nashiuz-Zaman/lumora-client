"use client";

import { useState } from "react";
import { ButtonBtn } from "@/components/shared/buttons";
import { OptionsDropdown } from "@/components/shared/OptionsDropdown";
import { DownCaretIcon } from "@/components/shared/icons";
import SortOptionsMenu from "./SortOptionsMenu";
import { IRadioOption } from "./RadioBtnGroup";

export interface ISortDropdownProps {
  buttonLabel: string;
  selected: string;
  options: IRadioOption[];
  onUpdate: (value: string) => void;
  buttonClassName?: string;
  className?: string;
}
 
export const SortDropdown = ({
  buttonLabel,
  selected,
  options,
  onUpdate,
  buttonClassName = "",
  className = "",
}: ISortDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={`relative w-max ${className}`}>
      <ButtonBtn
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`!systemClasses sortDropdown-btn !px-4 !py-2 !gap-1.5 ${buttonClassName}`}
      >
        {buttonLabel} <DownCaretIcon />
      </ButtonBtn>

      <OptionsDropdown
        toggleBtnIdentifier=".sortDropdown-btn"
        className="z-[200]"
        setShow={setIsOpen}
        show={isOpen}
      >
        <SortOptionsMenu
          selected={selected}
          options={options}
          onUpdate={(value) => {
            onUpdate(value);
          }}
        />
      </OptionsDropdown>
    </div>
  );
};

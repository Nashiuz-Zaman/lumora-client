"use client";

import SearchIcon from "./icons/SearchIcon";
import { ButtonBtnTrans } from "./buttons";
import { FormEventHandler } from "react";

const Searchbar = ({
  className = "",
  onSubmit,
  showIcon = true,
}: {
  className?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  showIcon?: boolean;
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`w-full sm:max-w-[16rem] lg:max-w-[20rem] xl:max-w-[24rem] 2xl:max-w-[35rem] 4xl:max-w-[50rem] ${className}`}
    >
      <div className="flex w-full rounded overflow-hidden border border-white/30 bg-white/10 backdrop-blur">
        <input
          type="text"
          placeholder="Search for products"
          className="w-full px-3 py-2 sm:py-2.5 md:py-3 text-white placeholder-white/70 bg-transparent focus:outline-none focus:ring-2 focus:ring-white/50 text-sm md:text-base"
        />

        {/* Conditionally render the icon button */}
        {showIcon && (
          <ButtonBtnTrans>
            <SearchIcon className="px-3 text-white 2md:text-2xl" />
          </ButtonBtnTrans>
        )}
      </div>
    </form>
  );
};

export default Searchbar;

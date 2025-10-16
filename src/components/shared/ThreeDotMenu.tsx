"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { TUserRoleValue } from "@/constants/user";
import { useClickOutside } from "@/hooks";
import { ThreeDotIcon } from "./icons";
import { ButtonBtnTrans } from "./buttons";

type TUserMenuProps = {
  userData?: {
    _id: string;
    name: string;
    role: { name?: TUserRoleValue };
  };
  logoutFunction?: () => void;
  className?: string;
};

export const ThreeDotMenu = ({
  userData,
  logoutFunction,
  className = "",
}: TUserMenuProps) => {
  const [isClient, setIsClient] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => setIsClient(true), []);
  useClickOutside(showMenu, (e) => {
    const target = e.target as HTMLElement | null;
    if (!target?.closest(".three-dot-dropdown")) {
      setShowMenu(false);
    }
  });

  if (!isClient) return null;

  const name = userData?.name;

  const optionClasses =
    "flex font-semibold text-neutral-500 items-center gap-2 hover:text-primary transition-all duration-200";

  return (
    <div className={`relative ${className}`}>
      {/* Three-dot button */}
      <button
        onClick={() => setShowMenu((prev) => !prev)}
        className="p-2 rounded-full hover:bg-neutral-100 cursor-pointer"
      >
        <ThreeDotIcon className="text-2xl three-dot-icon" />
      </button>

      {/* Dropdown menu */}
      {showMenu && (
        <div className="three-dot-dropdown rounded-lg w-[18.125rem] bg-white border border-neutral-100 shadow-md p-4 px-6 absolute z-30 top-full right-0 mt-2 space-y-5 text-left cursor-default">
          {name && <p className="font-bold text-black md:text-lg">{name}</p>}

          <Link
            onClick={() => setShowMenu(false)}
            href="/"
            className={optionClasses}
          >
            <span>Home</span>
          </Link>

          <Link
            onClick={() => setShowMenu(false)}
            href={"/admin"}
            className={optionClasses}
          >
            <span>Dashboard</span>
          </Link>

          <ButtonBtnTrans
            className={optionClasses}
            onClick={() => {
              logoutFunction?.();
              setShowMenu(false);
            }}
          >
            Sign Out
          </ButtonBtnTrans>
        </div>
      )}
    </div>
  );
};

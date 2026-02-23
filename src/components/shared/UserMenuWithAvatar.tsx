"use client";

import { useEffect, useState, MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";

import { useClickOutside } from "@/hooks";
import { IUserPopulated } from "@/types";

type TUserMenuWithAvatarProps = {
  userData: Partial<IUserPopulated>;
  logoutFunction?: () => void;
  className?: string;
};

export const UserMenuWithAvatar = ({
  userData,
  logoutFunction,
  className = "",
}: TUserMenuWithAvatarProps) => {
  const [isClient, setIsClient] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => setIsClient(true), []);
  useClickOutside(showMenu, (e) => {
    const target = e.target as HTMLElement | null;
    if (!target?.closest(".menu")) {
      setShowMenu(false);
    }
  });

  if (!isClient) return null;

  const name = userData?.name;
  const photo = userData?.image;

  const optionsClasses =
    "flex font-semibold text-neutral-500 items-center gap-2 hover:text-primary transition-all duration-200";

  const dashboardLink = "/customer";

  return (
    <div className={`h-8 md:h-10 2xl:h-12 cursor-pointer relative ${className}`}>
      {/* Profile image container */}
      <div
        onClick={() => setShowMenu((prev) => !prev)}
        className="w-full h-full aspect-square bg-white rounded-full overflow-hidden"
      >
        {photo && (
          <Image
            width={400}
            height={400}
            className="w-full h-full object-cover"
            src={photo}
            alt="user image"
          />
        )}
      </div>

      {/* User menu panel */}
      {showMenu && (
        <div className="menu rounded-lg w-[18.125rem] bg-white border border-neutral-100 shadow-md p-4 px-6 absolute z-30 bottom-0 right-2 translate-y-[102%] space-y-5 text-left cursor-default userpanel-focus">
          {name && <p className="font-bold text-black md:text-lg">{name}</p>}

          <Link href="/" className={optionsClasses}>
            <span>Home</span>
          </Link>

          <Link href={dashboardLink} className={optionsClasses}>
            <span>Dashboard</span>
          </Link>

          <button
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();

              if (logoutFunction) logoutFunction();
            }}
            className={optionsClasses}
          >
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

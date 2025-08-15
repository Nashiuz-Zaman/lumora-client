"use client";

import { useEffect, useState, MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";

import { TUserRoleValue, UserRoles } from "@/constants/user";
import { useClickOutside } from "@/hooks";

type UserAvatarMenuProps = {
  userData?: {
    _id: string;
    name: string;
    image?: string;
    role: { name?: TUserRoleValue };
  };
  logoutFunction: () => void;
  className?: string;
};

const UserAvatarMenu = ({
  userData,
  logoutFunction,
  className = "",
}: UserAvatarMenuProps) => {
  const [isClient, setIsClient] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleShowInfoPanel = () => setShowInfoPanel((prev) => !prev);

  useClickOutside(showInfoPanel, () => setShowInfoPanel(false));

  if (!isClient) return null;

  const name = userData?.name;
  const photo = userData?.image;
  const role = userData?.role?.name;

  const optionsClasses =
    "flex font-semibold text-neutral-500 items-center gap-2 hover:text-primary transition-all duration-200";

  const isAdminRole = role === UserRoles.admin || role === UserRoles.superAdmin;

  const dashboardLink = `/${isAdminRole ? "admin" : "customer"}`;

  return (
    <div className={`h-8 md:h-10 xl:h-14 cursor-pointer relative ${className}`}>
      {/* Profile image container */}
      <div
        onClick={handleShowInfoPanel}
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
      {showInfoPanel && (
        <div className="rounded-lg w-[18.125rem] bg-white border border-neutral-100 shadow-md p-4 px-6 absolute z-30 bottom-0 right-2 translate-y-[102%] space-y-5 text-left cursor-default userpanel-focus">
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
              logoutFunction();
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

export default UserAvatarMenu;

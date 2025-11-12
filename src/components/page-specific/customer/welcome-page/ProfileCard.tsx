"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { ICustomerProfile } from "@/types";
import { formatDateTime } from "@/utils";

interface IProfileCardProps {
  user: ICustomerProfile;
}

export const ProfileCard = ({ user }: IProfileCardProps) => {
  return (
    <div className="relative text-center">
      <div className="mx-auto mb-5 w-30 aspect-square overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center ring-2 ring-white">
        {user?.image ? (
          <Image
            src={user.image}
            alt={user.name || "User avatar"}
            width={100}
            height={100}
            className="h-full w-full object-cover"
          />
        ) : (
          <Icon
            icon="mdi:account-circle"
            className="text-6xl text-primary/70"
          />
        )}
      </div>

      <div className="space-y-1">
        <p className="text-sm">Welcome back</p>
        <h2 className="text-2xl font-semibold text-neutral-800">
          {user?.name || "Customer"}
        </h2>
        <p className="text-sm text-neutral-500">
          Joined: {formatDateTime(user.createdAt!, false)}
        </p>
      </div>
    </div>
  );
};

"use client";

// lib
import { Icon, IconifyIcon } from "@iconify/react";

interface IcfyIconProps {
  icon: string | IconifyIcon;
  className?: string;
}

export const IcfyIcon = ({ icon, className = "" }: IcfyIconProps) => {
  return <Icon icon={icon} className={className} />;
};

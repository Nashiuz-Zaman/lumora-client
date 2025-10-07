"use client";

import { useState } from "react";

interface IUseDrawer {
  showDrawer: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const useDrawer = (): IUseDrawer => {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const openDrawer = () => {
    setShowDrawer(true);
  };

  const closeDrawer = () => {
    setShowDrawer(false);
  };

  return { openDrawer, closeDrawer, showDrawer };
};


"use client";

import { RootState } from "@/libs/redux/store";
// Redux
import { useSelector } from "react-redux";

export const Backdrop = () => {
  const backdropOpen = useSelector(
    (state: RootState) => state.backdrop.backdropOpen
  );

  if (!backdropOpen) return null;

  return (
    <div className="fixed w-full h-screen bg-black/40 backdrop-blur-sm z-40"></div>
  );
};

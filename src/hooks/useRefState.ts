"use client";


import { IRefsContext, RefsContext } from "@/providers/RefProvider";
import { useContext } from "react";

export const useRefState = (): IRefsContext => {
  const context = useContext(RefsContext);

  if (!context) {
    throw new Error("useRefs must be used within a <RefsProvider>");
  }

  return context;
};

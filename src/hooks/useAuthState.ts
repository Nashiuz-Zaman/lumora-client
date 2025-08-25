"use client";

import { AuthStateContext, IAuthStateContext } from "@/providers";
import { useContext } from "react";

export const useAuthState = (): IAuthStateContext => {
  const context = useContext(AuthStateContext);

  if (!context) {
    throw new Error("useAuthState must be used within an <AuthStateProvider>");
  }

  return context;
};

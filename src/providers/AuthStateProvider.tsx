"use client";

import { createContext, ReactNode } from "react";
import { UserRoles } from "@/constants";
import { useGetCurrentUserQuery } from "@/libs/redux/apiSlices/auth/authApiSlice";
import { IUserPopulated } from "@/types";

export interface IAuthStateContext {
  user: Partial<IUserPopulated> | null;
  isLoading: boolean;
  role?: string;
  isAdmin: boolean;
  isCustomer: boolean;
  isSuperAdmin: boolean;
}

export const AuthStateContext = createContext<IAuthStateContext | null>(null);

export const AuthStateProvider = ({ children }: { children: ReactNode }) => {
  // Let RTK Query be the single source of truth
  const { data, isLoading, isError } = useGetCurrentUserQuery(undefined, {
    refetchOnReconnect: true,
  });

  const user = !isError && data?.data?.user ? data.data.user : null;

  const role = user?.role?.name;
  const isCustomer = role === UserRoles.customer;
  const isAdmin = role === UserRoles.admin;
  const isSuperAdmin = role === UserRoles.superAdmin;

  const value: IAuthStateContext = {
    user,
    isLoading: isLoading,
    role,
    isAdmin,
    isCustomer,
    isSuperAdmin,
  };

  return <AuthStateContext value={value}>{children}</AuthStateContext>;
};

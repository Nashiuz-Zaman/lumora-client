"use client";

import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { UserRoles } from "@/constants";
import { useGetCurrentUserQuery } from "@/libs/redux/apiSlices/auth/authApiSlice";
import { IUserPopulated } from "@/types";

export interface IAuthStateContext {
  user: Partial<IUserPopulated> | null;
  isLoading: boolean;
  setUser: Dispatch<SetStateAction<Partial<IUserPopulated> | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  role?: string;
  isAdmin: boolean;
  isCustomer: boolean;
  isSuperAdmin: boolean;
  hasFetched: boolean;
}

export const AuthStateContext = createContext<IAuthStateContext | null>(null);

export const AuthStateProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Partial<IUserPopulated> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  const {
    data,
    isLoading: queryLoading,
    isError,
    error,
  } = useGetCurrentUserQuery(undefined, {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  console.log(data);

  useEffect(() => {
    if (!hasFetched) {
      if (data?.data?.user) {
        setUser(data.data.user);
        setIsLoading(false);
        setHasFetched(true);
      } else if (isError) {
        setUser(null);
        setIsLoading(false);
        setHasFetched(true);
      } else if (!queryLoading && !data) {
        setUser(null);
        setIsLoading(false);
        setHasFetched(true);
      }
    }
  }, [data, isError, error, queryLoading, hasFetched]);

  const role = user?.role?.name;
  const isCustomer = role === UserRoles.customer;
  const isAdmin = role === UserRoles.admin;
  const isSuperAdmin = role === UserRoles.superAdmin;

  const value: IAuthStateContext = {
    user,
    isLoading,
    setUser,
    setIsLoading,
    role,
    isAdmin,
    isCustomer,
    isSuperAdmin,
    hasFetched,
  };

  return <AuthStateContext value={value}>{children}</AuthStateContext>;
};

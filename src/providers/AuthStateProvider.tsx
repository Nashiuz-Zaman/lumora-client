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
import { TUserPopulated } from "@/types";
// import useSocket from "@/hooks/useSocket";

export interface IAuthStateContext {
  user: Partial<TUserPopulated> | null;
  isLoading: boolean;
  setUser: Dispatch<SetStateAction<Partial<TUserPopulated> | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  role?: string;
  isAdmin: boolean;
  isCustomer: boolean;
  isSuperAdmin: boolean;
}

export const AuthStateContext = createContext<IAuthStateContext | null>(null);

const AuthStateProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Partial<TUserPopulated> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  // const { socket } = useSocket();

  const {
    data,
    isLoading: queryLoading,
    isError,
    error,
  } = useGetCurrentUserQuery(undefined, {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

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

  // useEffect(() => {
  //   if (socket && socket.connected) {
  //     if (role) {
  //       if (role === UserRoles.admin || role === UserRoles.superAdmin) {
  //         socket.emit("log-in-admin", user?._id);
  //       } else {
  //         socket.emit("log-in-customer", user?._id);
  //       }
  //     }
  //   }
  // }, [role, user?._id, socket]);

  const value: IAuthStateContext = {
    user,
    isLoading,
    setUser,
    setIsLoading,
    role,
    isAdmin,
    isCustomer,
    isSuperAdmin,
  };

  return <AuthStateContext value={value}>{children}</AuthStateContext>;
};

export default AuthStateProvider;

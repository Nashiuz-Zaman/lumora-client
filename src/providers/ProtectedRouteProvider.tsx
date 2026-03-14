"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUrlPath } from "@/hooks/useCurrentUrlPath";
import { IRole } from "@/types";
import { useAuthState } from "@/hooks/useAuthState";
import { UserRoles } from "@/constants/user";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

interface IProtectedRouteProviderProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export const ProtectedRouteProvider = ({
  children,
  allowedRoles = [],
}: IProtectedRouteProviderProps) => {
  const router = useRouter();
  const { fullUrl } = useCurrentUrlPath();

  const { user, isLoading } = useAuthState();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace(`/auth/login?redirect=${encodeURIComponent(fullUrl)}`);
      return;
    }

    const role = (user.role as IRole)?.name;

    if (allowedRoles.length && (!role || !allowedRoles.includes(role))) {
      const { admin, superAdmin, customer } = UserRoles;

      if (role === customer) router.replace("/customer");
      else if (role === admin || role === superAdmin) router.replace("/admin");
      else router.replace("/");
    }
  }, [user, isLoading, allowedRoles, router, fullUrl]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner className="static!" />
      </div>
    );
  }

  return <>{children}</>;
};
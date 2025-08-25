"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUrlPath } from "@/hooks/useCurrentUrlPath";
import { IRole } from "@/types";
import { useAuthState } from "@/hooks";
import { UserRoles } from "@/constants";
import { DataLoadingSpinner } from "@/components/shared";

interface ProtectedRouteProviderProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const ProtectedRouteProvider = ({
  children,
  allowedRoles = [],
}: ProtectedRouteProviderProps) => {
  const { user, isLoading } = useAuthState();
  const router = useRouter();
  const { fullUrl } = useCurrentUrlPath();

  useEffect(() => {
    const { admin, superAdmin, customer } = UserRoles;

    if (
      isLoading === undefined ||
      user === undefined ||
      allowedRoles === undefined
    )
      return;
    if (isLoading) return;

    if (!user) {
      // User not logged in, redirect to login
      const loginUrl = "/auth/login";

      router.replace(`${loginUrl}?redirect=${encodeURIComponent(fullUrl)}`);
      return;
    }

    const role: string | undefined = (user.role as IRole)?.name;

    if (allowedRoles.length && (!role || !allowedRoles.includes(role))) {
      if (role === customer) {
        router.replace("/customer");
      } else if (role === admin || role === superAdmin) {
        router.replace("/admin");
      } else {
        router.replace("/");
      }
    }
  }, [isLoading, user, allowedRoles, router, fullUrl]);

  if (
    isLoading ||
    !user ||
    (allowedRoles.length && !allowedRoles.includes((user.role as IRole)?.name))
  ) {
    return (
      <div className="h-screen flex items-center justify-center">
        <DataLoadingSpinner className="!static" />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRouteProvider;

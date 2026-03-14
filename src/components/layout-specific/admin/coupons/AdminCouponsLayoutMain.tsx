"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { usePortalTarget } from "@/hooks/usePortalTarget";

// Shared components
import { TopPanel } from "@page-specific/admin/shared/TopPanel";
import { CreateCouponModal } from "@modals/CreateCouponModal";

export const AdminCouponsLayoutMain = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { ref, target } = usePortalTarget();
  const path = usePathname();

  const couponPagesRegex = /^\/admin\/coupons(\/.*)?$/;

  return (
    <div className="h-full flex flex-col">
      {/* Reusable top panel */}
      <TopPanel
        actions={<>{couponPagesRegex.test(path) && <div ref={ref}></div>}</>}
      />

      {/* Create Coupon modal portal */}
      {target && <CreateCouponModal target={target} />}

      {/* Main content */}
      <div className="grow flex flex-col overflow-y-auto">{children}</div>
    </div>
  );
};

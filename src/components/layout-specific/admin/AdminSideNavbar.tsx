"use client";

import Link from "next/link";
import { IcfyIcon } from "@/components/shared";
import { useActiveLink } from "@/hooks";

// Types for nav items
interface INavItem {
  name: string;
  icon: string;
  path: string;
  checkSubstr?: boolean;
}

interface INavSection {
  heading: string;
  items: INavItem[];
}

const navSections: INavSection[] = [
  {
    heading: "Analytics",
    items: [
      { name: "Dashboard", icon: "mdi:analytics", path: "/admin/analytics" },
    ],
  },
  {
    heading: "Database",
    items: [
      {
        name: "Products",
        icon: "fluent-mdl2:product-variant",
        path: "/admin/products",
        checkSubstr: true,
      },
    ],
  },
  {
    heading: "Orders",
    items: [
      {
        name: "Confirmed",
        icon: "charm:tick",
        path: "/admin/orders/confirmed",
      },
      {
        name: "Shipped",
        icon: "mdi:truck-delivery-outline",
        path: "/admin/orders/shipped",
      },
      {
        name: "Delivered",
        icon: "solar:delivery-bold",
        path: "/admin/orders/delivered",
      },
      {
        name: "Cancelled",
        icon: "material-symbols:cancel-outline",
        path: "/admin/orders/cancelled",
      },
      {
        name: "Returned",
        icon: "material-symbols:assignment-return",
        path: "/admin/orders/returned",
      },
      {
        name: "Archived",
        icon: "mdi:archive-lock",
        path: "/admin/orders/archived",
      },
    ],
  },
  {
    heading: "Returns",
    items: [
      {
        name: "Pending",
        icon: "ion:hourglass-outline",
        path: "/admin/returns/pending",
      },
      {
        name: "Approved",
        icon: "charm:tick",
        path: "/admin/returns/approved",
      },
      {
        name: "Rejected",
        icon: "material-symbols:cancel-outline",
        path: "/admin/returns/rejected",
      },
    ],
  },
  {
    heading: "Transactions",
    items: [
      {
        name: "Payments",
        icon: "material-symbols:paid",
        path: "/admin/transactions/payments",
      },
      {
        name: "Refunds",
        icon: "material-symbols:cancel-outline",
        path: "/admin/transactions/refunds",
      },
    ],
  },
  {
    heading: "Coupons",
    items: [
      {
        name: "Active",
        icon: "nrk:live-activity-active",
        path: "/admin/coupons/active",
      },
      {
        name: "Expired",
        icon: "bi:exclamation-triangle-fill",
        path: "/admin/coupons/expired",
      },
    ],
  },
];

interface IAdminSideNavbarProps {
  className?: string;
}

export const AdminSideNavbar = ({ className = "" }: IAdminSideNavbarProps) => {
  const { checkIfActive } = useActiveLink();

  const activeClasses =
    "!bg-primary !text-white hover:!bg-primary hover:!text-white";
  const linkClasses =
    "mobile-nav-link flex items-center transition-colors px-4 py-2 hover:text-primary rounded-full gap-2 font-medium";
  const linkSublistClasses = "mb-7 space-y-1";

  return (
    <nav
      className={`block w-full xs:w-[17.5rem] xl:w-full h-full overflow-y-auto bg-white py-10 px-8 ${className}`}
    >
      {navSections.map((section, i) => (
        <div key={i}>
          <h3 className="mb-3 text-sm text-neutral-400">{section.heading}</h3>
          <ul className={linkSublistClasses}>
            {section.items.map((item, j) => (
              <li key={j}>
                <Link
                  href={item.path}
                  className={`${linkClasses} ${
                    checkIfActive(item.path, item.checkSubstr ?? false)
                      ? activeClasses
                      : ""
                  }`}
                >
                  <IcfyIcon className="text-lg shrink-0" icon={item.icon} />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};

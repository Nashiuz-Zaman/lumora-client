"use client";

import Link from "next/link";
import { IcfyIcon } from "@/components/shared";
import { useActiveLink } from "@/hooks";

// Types for nav items
interface INavItem {
  name: string;
  icon: string;
  path: string;
  exact?: boolean;
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
        name: "Users",
        icon: "fa-solid:users",
        path: "/admin/database/users",
        exact: true,
      },
      {
        name: "Products",
        icon: "fluent-mdl2:product-variant",
        path: "/admin/database/products",
        exact: true,
      },
    ],
  },
  {
    heading: "Orders",
    items: [
      {
        name: "Quotation Pending",
        icon: "material-symbols:pending-actions-rounded",
        path: "/admin/orders/quotation-pending",
      },
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
        name: "Cancelled",
        icon: "line-md:cancel",
        path: "/admin/orders/cancelled",
      },
      {
        name: "Abandoned",
        icon: "material-symbols:bedtime-outline-rounded",
        path: "/admin/orders/abandoned",
      },
      {
        name: "Returns",
        icon: "streamline:return-2-remix",
        path: "/admin/orders/returned",
      },
      {
        name: "Manual Requests",
        icon: "fluent-mdl2:product-release",
        path: "/admin/orders/manual-requests",
      },
      {
        name: "Create Order",
        icon: "gridicons:create",
        path: "/admin/orders/create-order",
      },
    ],
  },
  {
    heading: "Return Requests",
    items: [
      {
        name: "All Requests",
        icon: "octicon:package-dependencies-24",
        path: "/admin/return-requests",
      },
    ],
  },
  {
    heading: "Payments",
    items: [
      {
        name: "All Payments",
        icon: "fluent:payment-48-filled",
        path: "/admin/payments",
      },
    ],
  },
  {
    heading: "Reviews",
    items: [
      {
        name: "All Reviews",
        icon: "material-symbols:reviews-rounded",
        path: "/admin/reviews",
      },
    ],
  },
  {
    heading: "Coupons",
    items: [
      {
        name: "All Coupons",
        icon: "tdesign:coupon-filled",
        path: "/admin/coupons",
        exact: true,
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
    "mobile-nav-link flex items-center transition-colors px-4 py-2 hover:text-primary rounded-lg gap-2 font-medium";
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
                    checkIfActive(item.path, item.exact || false)
                      ? activeClasses
                      : ""
                  }`}
                >
                  <IcfyIcon className="text-lg" icon={item.icon} />
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

"use client";

import Link from "next/link";
import { IcfyIcon } from "@/components/shared";
import { useActiveLink } from "@/hooks";

// Types
interface INavItem {
  name: string;
  icon: string;
  path: string;
  checkSubstr?: boolean;
}

interface INavSection {
  items: INavItem[];
}

const navSections: INavSection[] = [
  {
    items: [
      { name: "Welcome", icon: "mdi:human-greeting", path: "/customer" },
      {
        name: "Browse Products",
        icon: "mdi:shopping-search",
        path: "/products/s",
      },
      {
        name: "My Orders",
        icon: "mdi:package-variant-closed",
        path: "/customer/my-orders",
        checkSubstr: true,
      },
      {
        name: "Track Order",
        icon: "mdi:location-outline",
        path: "/track-order",
        checkSubstr: true,
      },
      {
        name: "Settings",
        icon: "mdi:settings",
        path: "/customer/settings",
      },
    ],
  },
];

interface ICustomerSideNavbarProps {
  className?: string;
}

export const CustomerSideNavbar = ({
  className = "",
}: ICustomerSideNavbarProps) => {
  const { checkIfActive } = useActiveLink();

  const activeClasses = "!bg-neutral-50 text-primary-light font-semibold";

  // nav-link class is only for Mobile Side Nav functionality
  const linkClasses =
    "nav-link flex items-center px-4 py-2 rounded-full gap-2 font-medium text-neutral-50 hover:underline hover:underline-offset-4";
  const linkSublistClasses = "mb-7 space-y-1";

  return (
    <nav
      className={`block w-full xs:w-[17.5rem] xl:w-full h-full overflow-y-auto bg-primary-light py-10 px-8 ${className}`}
    >
      {navSections.map((section, i) => (
        <div key={i}>
          <ul className={linkSublistClasses}>
            {section.items.map((item, j) => (
              <li key={j}>
                <Link
                  href={item.path}
                  className={`${linkClasses} ${
                    checkIfActive(item.path, item.checkSubstr)
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

export default CustomerSideNavbar;

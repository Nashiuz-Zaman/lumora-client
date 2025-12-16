"use client";

import Link from "next/link";
import { IcfyIcon } from "@/components/shared";
import { useActiveLink } from "@/hooks";
import { navSections } from "@/static-data/adminNav";

interface IAdminSideNavbarProps {
  className?: string;
}

export const AdminSideNavbar = ({ className = "" }: IAdminSideNavbarProps) => {
  const { checkIfActive } = useActiveLink();

  const activeClasses =
    "!bg-linear-to-r !from-primary-light !to-primary !text-white ml-1";

  // nav-link class is only for Mobile Side Nav functionality
  const linkClasses =
    "nav-link flex items-center transition-all px-4 py-2 hover:text-primary rounded-xl gap-2 font-medium hover:ml-1";
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

"use client";

import { InnerContainer } from "@containers/InnerContainer";
import LogoSocials from "./LogoSocials";
import NavAddress from "./NavAddress";
import Link from "next/link";
import { useGetCategoryTreeQuery } from "@apiSlices/category.api.slice";
import { useProductSearchParamsManagement } from "@/hooks/useProductSearchParamsManagement";
import { socialMediaLinks } from "@/static-data/footerData";
import FooterNewsletter from "@/components/layout-specific/main/Footer/FooterNewsletter";
import { Icon } from "@iconify/react";

type FooterLinkGroupProps = {
  title: string;
  links: TFooterLink[];
  columns?: 1 | 2;
  icon?: string;
};

type TFooterLink = {
  label: string;
  href?: string;
  onClick?: () => void;
};

const FooterLinkGroup = ({
  title,
  links,
  columns = 1,
  icon,
}: FooterLinkGroupProps) => {
  return (
    <div>
      <h4 className="flex items-center gap-2 text-white uppercase font-semibold mb-6 tracking-wide">
        {title}
        {icon && <Icon icon={icon} className="text-white text-lg shrink-0" />}
      </h4>

      <ul
        className={`grid ${columns === 1 ? "grid-cols-1" : "grid-cols-2"} gap-3 text-sm`}
      >
        {links.map((link, i) => (
          <li key={i}>
            {link.href ? (
              <Link
                href={link.href}
                className="text-neutral-400 text-left hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <button
                onClick={link.onClick}
                className="text-neutral-400 text-left hover:text-white transition-colors"
              >
                {link.label}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  const year = new Date().getFullYear();

  const { data: categoryTree } = useGetCategoryTreeQuery();
  const { handleCategoryClick } = useProductSearchParamsManagement();

  const categoryLinks: TFooterLink[] =
    categoryTree?.flatMap((item) =>
      item.subCategories.slice(0, 2).map((sub) => ({
        label: sub.title,
        onClick: () =>
          handleCategoryClick({
            type: "subs",
            subSlugs: [sub.slug],
          }),
      })),
    ) || [];

  const supportLinks: TFooterLink[] = [
    { label: "F.A.Q", href: "/faq" },
    { label: "Help Center", href: "#" },
    { label: "Returns", href: "/returns" },
    { label: "Shipping", href: "#" },
    { label: "Track Order", href: "/track-order" },
  ];

  const companyLinks: TFooterLink[] = [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ];

  return (
    <footer className="bg-primary-dark-4 text-neutral-300 border-t border-white/5 mt-auto">
      <InnerContainer>
        {/* MAIN SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-12 py-20">
          {/* Brand */}
          <div className="space-y-8 lg:col-span-3">
            <LogoSocials socialMediaLinks={socialMediaLinks} />
            <NavAddress />
          </div>

          <div className="lg:col-span-2">
            <FooterLinkGroup
              columns={2}
              title="Shop"
              links={categoryLinks}
              icon="mdi:shopping-outline"
            />
          </div>

          <div className="lg:col-span-2 grid grid-cols-2">
            <FooterLinkGroup title="Support" links={supportLinks} />

            <FooterLinkGroup title="Company" links={companyLinks} />
          </div>
        </div>

        {/* NEWSLETTER */}
        <FooterNewsletter />

        {/* BOTTOM BAR */}
        <div className="border-t border-white/5 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
          <p>© {year} Lumora by Nashiuz Zaman</p>

          <div className="flex gap-6">
            <Link href="/#" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/#" className="hover:text-white">
              Terms
            </Link>
            <Link href="/#" className="hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </InnerContainer>
    </footer>
  );
};

export default Footer;

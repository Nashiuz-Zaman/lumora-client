import Link from "next/link";
import { Icon } from "@iconify/react";

interface ILinkCardProps {
  card: {
    icon: string;
    title: string;
    description: string;
    href: string;
  };
}

export const LinkCard = ({
  card: { icon, title, description, href },
}: ILinkCardProps) => {
  return (
    <Link
      href={href}
      className="group bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all p-8 flex flex-col items-center text-center"
    >
      <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-neutral-100 text-primary mb-4 transition-transform group-hover:scale-110">
        <Icon icon={icon} className="text-3xl" />
      </div>

      <h5 className="font-medium text-lg mb-1">{title}</h5>
      <p className="text-sm text-neutral-500 leading-relaxed">{description}</p>
    </Link>
  );
};

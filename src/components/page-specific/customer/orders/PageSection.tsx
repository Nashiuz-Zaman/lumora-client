import { ReactNode } from "react";

interface IPageSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const PageSection = ({
  title,
  children,
  className = "",
}: IPageSectionProps) => {
  return (
    <section className={`mb-8 ${className}`}>
      <h2 className="text-xl font-semibold text-neutral-800 mb-7 border-b border-neutral-200 pb-4">
        {title}
      </h2>
      {children}
    </section>
  );
};

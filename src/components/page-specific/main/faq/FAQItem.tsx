"use client";

import { useState, useRef, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CaretDownIcon } from "@/components/shared";

gsap.registerPlugin(useGSAP);

export interface IFAQ {
  question: string | ReactNode;
  answer: string | ReactNode;
}

interface IFAQItemProps {
  faq: IFAQ;
}

export const FAQItem = ({ faq }: IFAQItemProps) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!contentRef.current) return;

    gsap.to(contentRef.current, {
      height: open ? "auto" : 0,
      opacity: open ? 1 : 0,
      duration: 0.3,
      ease: "power3.inOut",
    });
  }, [open]);

  return (
    <div className="px-6 py-5 transition-all border-b border-neutral-100 last:border-none">
      <button
        className="flex w-full items-center justify-between cursor-pointer text-left"
        onClick={() => setOpen((prev) => !prev)}
      >
        <h3 className="text-base md:text-lg font-medium">{faq.question}</h3>

        <CaretDownIcon
          className={`text-neutral-500 text-lg transition-transform duration-200 ${
            open ? "-rotate-180" : ""
          }`}
        />
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden h-0 opacity-0"
        aria-hidden={!open}
      >
        <p className="mt-3 text-neutral-600 text-sm md:text-base leading-relaxed">
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

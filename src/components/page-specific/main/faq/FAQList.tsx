"use client";

import { FAQItem, IFAQ } from "./FAQItem";

interface IFAQListProps {
  faqs: IFAQ[];
}

export const FAQList = ({ faqs }: IFAQListProps) => {
  return (
    <div className="mt-8 divide-y divide-neutral-200 rounded-2xl bg-white shadow-sm">
      {faqs.map((item, idx) => (
        <FAQItem key={idx} faq={item} />
      ))}
    </div>
  );
};

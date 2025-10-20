"use client";

import { faqData } from "@/static-data/faq";
import { FAQList } from "./FAQList";
import { SectionHeader } from "./SectionHeader";

export const FAQSection = () => {
  return (
    <section>
      <SectionHeader
        title="Frequently Asked Questions"
        subtitle="Find quick answers about orders, payments, and more."
      />
      <FAQList faqs={faqData} />
    </section>
  );
};

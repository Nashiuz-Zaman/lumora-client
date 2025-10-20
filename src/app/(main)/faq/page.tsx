import { FAQSection } from "@/components/page-specific";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs | Lumora Mart",
  description:
    "Find answers to frequently asked questions about shopping, returns, shipping, and more at Lumora Mart.",
};

const FAQPage = () => {
  return (
    <main className="min-h-[80vh] bg-neutral-50 py-20">
      <div className="container mx-auto px-4 md:px-8">
        <FAQSection />
      </div>
    </main>
  );
};

export default FAQPage;

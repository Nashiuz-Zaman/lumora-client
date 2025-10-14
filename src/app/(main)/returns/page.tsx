import Image from "next/image";
import { Metadata } from "next";
import { InnerContainer } from "@/components/shared";
import {
  ReturnProcessSteps,
  ReturnRequestForm,
} from "@/components/page-specific";

export const metadata: Metadata = {
  title: "Order Returns - Lumora",
};

const ReturnRequestPage = () => {
  return (
    <InnerContainer className="py-20 space-y-16">
      {/* Header + Description */}
      <section className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Need to return a product?</h2>
        <p className="text-neutral-500 text-lg leading-relaxed">
          At Lumora, your satisfaction is our priority. If you need to return a
          product, simply submit a request with your order ID, invoice of the
          order, a brief description of the issue, and any relevant files (like
          photos). Our team will review it promptly and guide you through the
          next steps. Please ensure items are in original condition, as some
          returns may not be eligible.
        </p>
      </section>

      {/* Steps Section */}
      <section>
        <ReturnProcessSteps />
      </section>

      {/* Image + Form Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start max-w-[100rem] mx-auto">
        <div className="w-full aspect-video">
          <Image
            alt="Return process illustration"
            src="https://res.cloudinary.com/diwzuhlc3/image/upload/v1760463182/lumora/returns/returns_ixrjvu.webp"
            width={1000}
            height={700}
            className="w-full h-full rounded-2xl shadow-lg object-cover"
          />
        </div>

        <ReturnRequestForm />
      </section>
    </InnerContainer>
  );
};

export default ReturnRequestPage;

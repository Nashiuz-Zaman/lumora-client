import { Metadata } from "next";
import { InnerContainer } from "@/components/shared";
import { OrderTrackingFormAndPanel } from "@/components/page-specific";
import { Suspense } from "react";

export const metadata: Metadata = {
  title:
    "Track Your Order | Efficient and transparent order monitoring at your fingertips.",
};

const TrackOrderPage = () => {
  return (
    <Suspense>
      <div
        style={{
          backgroundImage: `url(https://res.cloudinary.com/diwzuhlc3/image/upload/v1760734464/lumora/track-order/track-order_vf3i6o.webp)`,
        }}
        className="w-full aspect-16/4 bg-position-[50%_60%]! bg-cover!"
      ></div>
      <InnerContainer className="pt-10 mb-16">
        <h2 className="text-2xl lg:text-4xl font-semibold mb-3">
          Track Your Order
        </h2>

        <p className="mb-10 text-lg text-center md:text-left text-neutral-400">
          Efficient and transparent order monitoring at your fingertips.
        </p>

        <OrderTrackingFormAndPanel />
      </InnerContainer>
    </Suspense>
  );
};

export default TrackOrderPage;

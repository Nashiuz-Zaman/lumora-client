import { Metadata } from "next";
import { InnerContainer } from "@/components/shared";
import { OrderTrackingFormAndPanel } from "@/components/page-specific";

export const metadata: Metadata = {
  title:
    "Track Your Order | Efficient and transparent order monitoring at your fingertips.",
};

const TrackOrderPage = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(https://res.cloudinary.com/diwzuhlc3/image/upload/v1760734464/lumora/track-order/track-order_vf3i6o.webp)`,
        }}
        className="w-full aspect-[16/4] !bg-[50%_60%] !bg-cover"
      ></div>
      <InnerContainer className="min-h-[40rem] my-20">
        <h2 className="text-2xl font-semibold mb-3 text-primary">
          Track Your Order
        </h2>
        <p className="mb-10 text-lg text-center md:text-left text-neutral-500">
          Efficient and transparent order monitoring at your fingertips.
        </p>

        <OrderTrackingFormAndPanel />
      </InnerContainer>
    </>
  );
};

export default TrackOrderPage;

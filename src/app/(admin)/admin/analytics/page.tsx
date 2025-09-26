import { UnderDev } from "@/components/shared";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Analytics | Admin Panel",
};

const AnalyticsPage = () => (
  <Suspense>
    <UnderDev />
  </Suspense>
);

export default AnalyticsPage;

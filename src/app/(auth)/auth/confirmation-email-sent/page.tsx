import { ConfirmationEmailSentMain } from "@/components/page-specific";
import { Suspense } from "react";

export const metadata = {
  title: "Confirmation Email Sent | Lumora",
};

const ConfirmationEmailSentPage = () => {
  return (
    <Suspense>
      <div className="flex items-center justify-center w-full h-full ">
        <ConfirmationEmailSentMain />
      </div>
    </Suspense>
  );
};

export default ConfirmationEmailSentPage;

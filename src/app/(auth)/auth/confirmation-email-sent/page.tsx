import { Metadata } from "next";
import { Suspense } from "react";
import { ConfirmationEmailSentMain } from "@page-specific/main/confirmation-email-sent/ConfirmationEmailSentMain";

export const metadata: Metadata = {
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

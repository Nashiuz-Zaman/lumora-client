"use client";

// components
import { InnerContainer } from "@/components/shared";
import { BasicInfoForm } from "./BasicInfoForm";
import { AddressForm } from "./AddressForm";
import { PasswordForm } from "./PasswordForm";

// types
import { useSelector } from "react-redux";
import { TRootState } from "@/libs/redux/store";

export const SettingsMain = () => {
  const { customerProfileData } = useSelector(
    (state: TRootState) => state.customer
  );

  if (!customerProfileData) return null;

  return (
    <InnerContainer className="py-10">
      <h2 className="text-xl font-semibold mb-7">Settings</h2>

      {/* Basic Information Form */}
      <BasicInfoForm className="mb-10" data={customerProfileData} />

      {/* Address Forms */}
      <div className="flex flex-col 2md:flex-row gap-5 mb-10">
        {/* billing address form */}
        <AddressForm
          id="billing-address"
          type="billing"
          data={customerProfileData?.billingAddress}
          headingText="Billing Address"
        />

        {/* shipping address form */}
        <AddressForm
          id="shipping-address"
          type="shipping"
          data={customerProfileData?.shippingAddress}
          headingText="Shipping Address"
        />
      </div>

      {/* Password Form */}
      <PasswordForm />
    </InnerContainer>
  );
};

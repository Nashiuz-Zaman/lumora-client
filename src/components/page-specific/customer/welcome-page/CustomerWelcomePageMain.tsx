"use client";

import { useSelector } from "react-redux";
import { TRootState } from "@/libs/redux/store";

// Shared Components
import { InnerContainer } from "@/components/shared";

// Local Page Components
import { LinkCard } from "./LinkCard";
import { AddressCard } from "./AddressCard";
import { WelcomeBanner } from "./WelcomeBanner";
import { ProfileCard } from "./ProfileCard";

export const CustomerWelcomePageMain = () => {
  const { customerProfileData } = useSelector(
    (state: TRootState) => state.customer
  );

  const cards = [
    {
      icon: "mdi:shopping-search",
      title: "Browse Products",
      description: "Explore our curated collection just for you.",
      href: "/products/s",
    },
    {
      icon: "mdi:package-variant-closed",
      title: "Your Orders",
      description: "Track, manage, and reorder with ease.",
      href: "/customer/orders",
    },
    {
      icon: "mdi:account-cog",
      title: "Account Settings",
      description: "Manage your details and preferences.",
      href: "/customer/settings",
    },
  ];

  if (!customerProfileData) return null;

  return (
    <InnerContainer className="py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar/Profile */}
        <aside className="md:col-span-1 flex flex-col gap-6">
          <ProfileCard user={customerProfileData} />
        </aside>

        {/* Main Content */}
        <main className="md:col-span-2 flex flex-col gap-6">
          {/* Welcome Banner */}
          <WelcomeBanner
            name={customerProfileData?.name}
            subtitle="Manage your account, orders, and preferences in one place."
          />

          {/* Addresses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <AddressCard
              label="Billing Address"
              address={customerProfileData?.billingAddress}
              btnText="Edit Billing Address"
              href="/customer/settings#billing-address"
            />
            <AddressCard
              label="Shipping Address"
              address={customerProfileData?.shippingAddress}
              btnText="Edit Shipping Address"
              href="/customer/settings#shipping-address"
            />
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, i) => (
              <LinkCard key={i} card={card} />
            ))}
          </div>
        </main>
      </div>
    </InnerContainer>
  );
};

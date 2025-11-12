"use client";

import { InnerContainer } from "@/components/shared";

import { LinkCard } from "./LinkCard";
import { AddressCard } from "./AddressCard";
import { WelcomeBanner } from "./WelcomeBanner";
import { ProfileCard } from "./ProfileCard";

import { useGetCustomerProfileDataQuery } from "@/libs/redux/apiSlices/customer/customerApiSlice";

export const CustomerWelcomePageMain = () => {
  const { data } = useGetCustomerProfileDataQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const user = data?.data?.customerProfileData;

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

  if (!user) return null;

  return (
    <InnerContainer className="py-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar/Profile */}
        <aside className="md:col-span-1 flex flex-col gap-6">
          <ProfileCard user={user} />
        </aside>

        {/* Main Content */}
        <main className="md:col-span-2 flex flex-col gap-6">
          {/* Welcome Banner */}
          <WelcomeBanner
            name={user?.name}
            subtitle="Manage your account, orders, and preferences in one place."
          />

          {/* Addresses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <AddressCard
              label="Billing Address"
              address={user?.billingAddress}
              btnText="Edit Billing Address"
            />
            <AddressCard
              label="Shipping Address"
              address={user?.shippingAddress}
              btnText="Edit Shipping Address"
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

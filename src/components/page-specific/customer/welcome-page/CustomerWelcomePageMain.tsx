"use client";

import { InnerContainer, LinkBtn } from "@/components/shared";
import { useAuthState } from "@/hooks";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

export const CustomerWelcomePageMain = () => {
  const { user } = useAuthState();

  const cards = [
    {
      icon: "mdi:shopping-search",
      title: "Browse Products",
      description: "Explore our curated collection just for you.",
      href: "/products",
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

  const renderAddress = (address?: {
    address?: string;
    country?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  }) => {
    if (!address || !address.address)
      return <p className="text-neutral-500">No address provided.</p>;

    return (
      <address className="not-italic space-y-1 text-sm sm:text-base text-neutral-600">
        <div className="font-medium">{address.address}</div>
        <div className="text-sm text-neutral-500">
          {[address.city, address.state, address.zipCode]
            .filter(Boolean)
            .join(", ")}
        </div>
        <div className="text-sm text-neutral-500">{address.country}</div>
      </address>
    );
  };

  return (
    <InnerContainer className="py-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar/Profile */}
        <aside className="md:col-span-1 flex flex-col gap-6">
          {/* Profile Card */}
          <div className="relative overflow-hidden rounded-2xl border border-neutral-100 shadow-md p-6 backdrop-blur-sm">
            <div className="absolute inset-0" />
            <div className="relative flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden ring-2 ring-white">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User avatar"}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <Icon
                    icon="mdi:account-circle"
                    className="text-5xl text-primary/70"
                  />
                )}
              </div>

              <div>
                <h2 className="text-2xl font-semibold leading-tight">
                  {user?.name || "Customer"}
                </h2>
                <p className="text-sm text-neutral-500 mt-1">Welcome back 👋</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <LinkBtn
                href="/customer/orders"
                className="!rounded-xl !py-2 text-sm"
              >
                Orders
              </LinkBtn>
              <LinkBtn
                href="/customer/settings"
                className="!rounded-xl !py-2 text-sm"
              >
                Account
              </LinkBtn>
              <LinkBtn href="/" className="!rounded-xl !py-2 text-sm">
                Shop
              </LinkBtn>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="md:col-span-2 flex flex-col gap-6">
          {/* Welcome Banner */}
          <div className="relative overflow-hidden rounded-2xl flex items-center justify-between bg-gradient-to-r from-primary to-primary/80 text-white shadow-md hover:shadow-lg transition-all min-h-[160px]">
            {/* Background image */}
            <div className="absolute right-0 top-0 h-full w-[35%]">
              <Image
                src="/auth-images/auth-2.webp"
                alt="Welcome banner"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/25 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full px-6 py-8 sm:px-10 md:px-12">
              <h3 className="text-2xl font-semibold mb-1">
                Hello, {user?.name || "there"}
              </h3>
              <p className="text-sm sm:text-base text-white/90 max-w-md">
                Manage your account, orders, and preferences in one place.
              </p>
            </div>
          </div>

          {/* Addresses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                label: "Billing Address",
                data: user?.customerProfile?.billingAddress,
              },
              {
                label: "Shipping Address",
                data: user?.customerProfile?.shippingAddress,
              },
            ].map((addr, idx) => (
              <article
                key={idx}
                className="relative overflow-hidden rounded-2xl bg-white border border-neutral-100 p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_80%)]" />
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <h4 className="text-lg font-medium mb-2">{addr.label}</h4>
                    {renderAddress(addr.data)}
                  </div>
                  <div className="mt-5">
                    <LinkBtn
                      href="/customer/settings"
                      className="!rounded-full !primaryClasses"
                    >
                      Edit Address
                    </LinkBtn>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, idx) => (
              <Link
                key={idx}
                href={card.href}
                className="group bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all p-8 flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4 transition-transform group-hover:scale-110">
                  <Icon icon={card.icon} className="text-3xl" />
                </div>

                <h5 className="font-medium text-lg mb-1">{card.title}</h5>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {card.description}
                </p>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </InnerContainer>
  );
};

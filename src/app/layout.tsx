// ---------------------------------------------------------
// GLOBAL STYLES
// ---------------------------------------------------------
import "./globals.css";

// ---------------------------------------------------------
// GLOBAL FONTS
// ---------------------------------------------------------
import { poppins } from "./fonts";

// ---------------------------------------------------------
// UI LIBRARIES
// ---------------------------------------------------------
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ---------------------------------------------------------
// PROVIDERS
// ---------------------------------------------------------
import {
  ReduxProvider,
  AuthStateProvider,
  CartStateProvider,
  RefsProvider,
} from "@/providers";

// ---------------------------------------------------------
// COMPONENTS
// ---------------------------------------------------------
import { Backdrop } from "@/components/shared";
import { DemoNoticeModal, ProductQuickViewModal } from "@/components/modals";

// ---------------------------------------------------------
// SERVER / DATABASE
// ---------------------------------------------------------
import { fetchCategoryTree } from "@/server-functions/fetchCategoryTree";

// ---------------------------------------------------------
// TYPES
// ---------------------------------------------------------
import type { Metadata } from "next";

// ---------------------------------------------------------
// METADATA
// ---------------------------------------------------------
export const metadata: Metadata = {
  title: "Lumora | Products from top brands all in one place for you",
  description:
    "A modern full-stack eCommerce platform built with Next.js, Express, MongoDB and TypeScript.",
  openGraph: {
    title: "Lumora | Products from top brands all in one place for you",
    description:
      "A modern full-stack eCommerce platform built with Next.js, Express, MongoDB and TypeScript.",
    url: "https://lumora-client.vercel.app/",
    siteName: "Lumora",
    images: [
      {
        url: "https://lumora-client.vercel.app/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Lumora OG Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumora | Products from top brands all in one place for you",
    description: "A modern full-stack eCommerce platform.",
    images: ["https://lumora-client.vercel.app/og-image.webp"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const result = await fetchCategoryTree();
  let categoryTree;

  if (!result || "isError" in result) {
    throw new Error("Categories loading error");
  } else {
    categoryTree = result.categoryTree;
  }

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${poppins.className} text-neutral-700`}>
        <ReduxProvider initialCategoryTree={categoryTree}>
          <AuthStateProvider>
            <CartStateProvider>
              <RefsProvider>
                <ToastContainer
                  position="top-center"
                  autoClose={2000}
                  transition={Zoom}
                  hideProgressBar
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />

                <Backdrop />
                <DemoNoticeModal />
                <ProductQuickViewModal />

                {children}
              </RefsProvider>
            </CartStateProvider>
          </AuthStateProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

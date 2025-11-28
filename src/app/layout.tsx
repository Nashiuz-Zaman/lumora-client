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
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lumora | Products from top brands all in one place for you",
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

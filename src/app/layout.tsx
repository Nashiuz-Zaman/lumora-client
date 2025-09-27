import "./globals.css";
import { poppins } from "./fonts";

import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ReduxProvider } from "@/providers";
import { Backdrop } from "@/components/shared";
import { ProductQuickViewModal } from "@/components/modals";
import AuthStateProvider from "@/providers/AuthStateProvider";
import CartStateProvider from "@/providers/CartStateProvider";
import { fetchCategoryTree } from "@/server-functions/fetchCategoryTree";
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
      <body className={`${poppins.className} text-neutral-800`}>
        <ReduxProvider initialCategoryTree={categoryTree}>
          <AuthStateProvider>
            <CartStateProvider>
              <ToastContainer
                position="top-center"
                autoClose={2000}
                transition={Slide}
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
              <ProductQuickViewModal />
              {children}
            </CartStateProvider>
          </AuthStateProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

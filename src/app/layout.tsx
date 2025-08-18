import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "./fonts";

// react toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";
import ReduxProvider from "@/providers/ReduxProvider";
import { Backdrop } from "@/components/shared";

export const metadata: Metadata = {
  title: "Next.js TS, React 19, Tailwind v4, Redux-toolkit | Project Skeleton",
  description: "Basic Project Starter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} text-neutral-800`}
        cz-shortcut-listen="false"
      >
        <ReduxProvider>
          {/* react toastify */}
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
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}

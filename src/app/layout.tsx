import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "./fonts";

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
        className={`${poppins.className} bg-black flex items-center justify-center h-screen text-white text-8xl`}
      >
        {children}
      </body>
    </html>
  );
}

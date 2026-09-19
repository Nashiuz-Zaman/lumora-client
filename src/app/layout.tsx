import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

import { AppProviders } from "@/providers/AppProviders";
import { fetchCategoryTree } from "@/server-functions/fetchCategoryTree";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

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

  if (!result || "isError" in result) {
    throw new Error("Categories loading error");
  }

  return (
    <html lang="en">
      <body
        className={`${inter.className} ${inter.variable}`}
        suppressHydrationWarning
      >
        <AppProviders categoryTree={result.categoryTree}>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}

"use client";

import Link from "next/link";
import { IFAQ } from "@/components/page-specific/main/faq/FAQItem";

export const faqData: IFAQ[] = [
  {
    question: "What is Lumora Mart?",
    answer: (
      <>
        Lumora Mart is your trusted destination for modern, high-quality
        products delivered with care. We specialize in lifestyle and tech
        essentials designed for everyday convenience.
      </>
    ),
  },
  {
    question: "How can I track my order?",
    answer: (
      <>
        Once your order ships, you’ll receive a confirmation email with a
        tracking link. You can also{" "}
        <Link
          href="/track-order"
          className="text-primary underline font-medium"
        >
          track your order
        </Link>{" "}
        anytime from the Track Order page.
      </>
    ),
  },
  {
    question: "What payment methods are accepted?",
    answer: (
      <>
        We accept major credit/debit cards, mobile payments, and select digital
        wallets for a seamless checkout experience.
      </>
    ),
  },
  {
    question: "Can I return a product?",
    answer: (
      <>
        Yes. You can request a return within 15 days of delivery if your product
        meets our return policy criteria. Visit the{" "}
        <Link href="/returns" className="text-primary underline font-medium">
          Returns
        </Link>{" "}
        page for more details.
      </>
    ),
  },
  {
    question: "Do you offer international shipping?",
    answer: (
      <>
        Currently, Lumora Mart ships only within select regions. We’re working
        on expanding international shipping soon.
      </>
    ),
  },
  {
    question: "How long does delivery take?",
    answer: (
      <>
        Orders are usually delivered within 3–5 business days for standard
        shipping. Delivery times may vary based on your location and courier
        service.
      </>
    ),
  },
  // {
  //   question: "Can I cancel or change my order after placing it?",
  //   answer: (
  //     <>
  //       Orders can be modified or canceled within 1 hour of placement. Once the
  //       order is processed for shipping, changes may no longer be possible.
  //       Please contact our support team for assistance.
  //     </>
  //   ),
  // },
  {
    question: "Do Lumora Mart products come with a warranty?",
    answer: (
      <>
        Warranty coverage is available only if the product’s manufacturer
        provides it. You can find warranty details, if applicable, on individual
        product pages.
      </>
    ),
  },

  {
    question: "Do I need an account to place an order?",
    answer: <>No, you can place an order as a guest.</>,
  },
  {
    question: "Can I use multiple coupons in one order?",
    answer: <>Only one discount or coupon code can be applied per order.</>,
  },
  {
    question: "Does Lumora Mart offer gift cards?",
    answer: (
      <>
        No, currently we&apos;re not offering gift cards but we&apos;re planning to
        introduce them in the near future.
      </>
    ),
  },
  {
    question: "What should I do if I receive a damaged or wrong item?",
    answer: (
      <>
        If you receive a damaged or incorrect product, please submit a return
        request through the{" "}
        <Link href="/returns" className="text-primary underline font-medium">
          Returns
        </Link>{" "}
        page within 15 days of delivery. Our team will review your request and
        arrange a replacement or refund as quickly as possible.
      </>
    ),
  },
];

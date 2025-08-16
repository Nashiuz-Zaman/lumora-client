"use client";

import { CenterContainer } from "@/components/shared";
import { CategoryCard } from "./CategoryCard";

const cardsData = [
  {
    heading: "Gaming & Entertainment",
    linkText: "Level Up",
    images: [
      {
        src: "/featured-product-collections/entertainment-1.webp",
        alt: "featured collection product",
      },
    ],
  },
  {
    heading: "Fashion & Accessories",
    linkText: "Shop Fashion",
    images: [
      {
        src: "/featured-product-collections/fashion-1.webp",
        alt: "featured collection product",
      },
      {
        src: "/featured-product-collections/fashion-2.webp",
        alt: "featured collection product",
      },
      {
        src: "/featured-product-collections/fashion-3.webp",
        alt: "featured collection product",
      },
      {
        src: "/featured-product-collections/fashion-4.webp",
        alt: "featured collection product",
      },
    ],
  },

  {
    heading: "Food & Snacks",
    linkText: "Taste Now",
    images: [
      {
        src: "/featured-product-collections/food-1.webp",
        alt: "featured collection product",
      },
      {
        src: "/featured-product-collections/food-2.webp",
        alt: "featured collection product",
      },
      {
        src: "/featured-product-collections/food-3.webp",
        alt: "featured collection product",
      },
      {
        src: "/featured-product-collections/food-4.webp",
        alt: "featured collection product",
      },
    ],
  },
  {
    heading: "Kitchen Essentials",
    linkText: "Cook Smarter",
    images: [
      {
        src: "/featured-product-collections/kitchen-1.webp",
        alt: "featured collection product",
      },
      {
        src: "/featured-product-collections/kitchen-2.webp",
        alt: "featured collection product",
      },
      {
        src: "/featured-product-collections/kitchen-3.webp",
        alt: "featured collection product",
      },
      {
        src: "/featured-product-collections/kitchen-4.webp",
        alt: "featured collection product",
      },
    ],
  },
  {
    heading: "Home Appliances & Essentials",
    linkText: "Upgrade Home",
    images: [
      {
        src: "/featured-product-collections/home-1.webp",
        alt: "featured collection product",
      },
    ],
  },
  {
    heading: "Health & Wellness",
    linkText: "Stay Healthy",
    images: [
      {
        src: "/featured-product-collections/health-1.webp",
        alt: "featured collection product",
      },
      {
        src: "/featured-product-collections/health-2.webp",
        alt: "featured collection product",
      },
      {
        src: "/featured-product-collections/health-3.webp",
        alt: "featured collection product",
      },
    ],
  },
];

export const FeaturedProductCategories = () => {
  return (
    <CenterContainer className="bg-neutral-200 py-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cardsData.map((card, idx) => (
          <CategoryCard
            key={idx}
            heading={card.heading}
            linkText={card.linkText}
            images={card.images}
          />
        ))}
      </div>
    </CenterContainer>
  );
};

"use client";

import { CenterContainer } from "@/components/shared";
import { CategoryCard } from "./CategoryCard";
import { cardsData } from "@/static-data/productCategoryCards";

export const FeaturedProductCategories = () => {
  return (
    <CenterContainer className="bg-neutral-200 py-5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {cardsData?.map((card, idx) => (
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

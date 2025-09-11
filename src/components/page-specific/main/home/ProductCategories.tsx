import { CenterContainer } from "@/components/shared";
import { CategoryCard } from "./CategoryCard";
import { cardsData } from "@/static-data/productCategoryCards";

export const ProductCategories = () => {
  return (
    <CenterContainer className="bg-gradient-to-b from-neutral-200 to-neutral-100 py-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cardsData?.map((card, i) => (
          <CategoryCard
            key={`key-${i}i`}
            heading={card.heading}
            linkText={card.linkText}
            images={card.images}
          />
        ))}
      </div>
    </CenterContainer>
  );
};

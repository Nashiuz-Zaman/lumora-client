import { CenterContainer, ProductCategoryCard } from "@/components/shared";
import { ICategoryTreeItem } from "@/types";

export interface IProductCategoriesProps {
  categories: ICategoryTreeItem[];
}

export const ProductCategories = async ({
  categories,
}: IProductCategoriesProps) => {
  if (!categories) return null;

  return (
    <CenterContainer
      id="all-product-categories"
      className="bg-gradient-to-b from-neutral-200 to-neutral-100 py-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories?.map((category, i) => (
          <ProductCategoryCard
            id={"homepage-category-card-" + i}
            key={`key-${i}`}
            heading={category.topCategory.title}
            linkText={"View Products"}
            linkUrl={`#${category.topCategory.slug}`}
            images={
              category.topCategory?.categoryImages?.map((el) => ({
                src: el,
                alt: "Category Image",
              })) ?? []
            }
          />
        ))}
      </div>
    </CenterContainer>
  );
};

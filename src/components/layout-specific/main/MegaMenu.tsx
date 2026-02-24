"use client";

// Types
import { ICategoryTreeItem, TProductWithMinimalReviewStats } from "@/types";

// Components - Shared
import {
  ButtonBtn,
  ButtonBtnTrans,
  InnerContainer,
  GridCard,
} from "@/components/shared";

// Components - Local
import { FeaturedProductCard } from "./FeaturedProductCard";

// Hooks
import { useProductSearchParamsManagement } from "@/hooks";

export type TMegaMenuItem = ICategoryTreeItem & {
  featuredProducts?: TProductWithMinimalReviewStats[];
};

export interface IMegaMenuProps {
  categories: TMegaMenuItem[];
}

export const MegaMenu = ({ categories }: IMegaMenuProps) => {
  const { handleCategoryClick } = useProductSearchParamsManagement();

  return (
    <nav className="hidden xl:block w-full bg-white border-b border-neutral-100">
      <InnerContainer className="relative!">
        <div className="flex items-center justify-center gap-6 relative">
          {categories?.map(
            ({ topCategory, subCategories, featuredProducts = [] }) => {
              return (
                <div key={topCategory._id} className="group">
                  <p className="cursor-pointer transition-colors duration-200 hover:text-primary font-medium text-xs 2xl:text-sm 3xl:text-base py-3 2xl:py-4">
                    {topCategory.title}
                  </p>

                  <div className="absolute mt-px flex left-0 top-full opacity-0 collapse group-hover:transition-all group-hover:duration-350 group-hover:delay-150 group-hover:ease group-hover:opacity-100 group-hover:visible w-full justify-center z-5000 text-xs 3xl:text-base">
                    <div className="w-full grid grid-cols-[1fr_1fr_2fr] gap-6 p-6 rounded-b-2xl shadow-lg items-start bg-white border border-neutral-100 border-t-0">
                      {/* Left column: Grid card */}
                      <div className="bg-neutral-100 rounded-lg p-6 flex items-center justify-center">
                        <div className="w-[90%]">
                          <GridCard
                            images={
                              topCategory.categoryImages?.map((el) => ({
                                src: el,
                                alt: "Product category image",
                              })) || []
                            }
                            className="w-full!"
                          />

                          <ButtonBtnTrans
                            onClick={() => {
                              handleCategoryClick({
                                type: "top",
                                topSlug: topCategory.slug,
                                categories,
                              });
                            }}
                            className="font-medium underline mt-4 block text-center"
                          >
                            View all {topCategory.title}
                          </ButtonBtnTrans>
                        </div>
                      </div>

                      {/* Middle column: Subcategories */}
                      <div className="flex flex-col gap-2 px-2">
                        <h4 className="font-semibold text-xl mb-2">
                          Browse Categories
                        </h4>

                        {subCategories.map((sub) => (
                          <ButtonBtnTrans
                            key={sub._id}
                            onClick={() => {
                              handleCategoryClick({
                                type: "subs",
                                subSlugs: [sub.slug],
                              });
                            }}
                            className="text-left text-neutral-500 hover:text-primary hover:font-medium transition-all transform hover:translate-x-2"
                          >
                            {sub.title}
                          </ButtonBtnTrans>
                        ))}
                      </div>

                      {/* Right column: Featured products */}
                      <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-3 gap-4">
                          {featuredProducts?.slice(0, 6).map((product) => (
                            <FeaturedProductCard
                              key={product.title}
                              product={product}
                            />
                          ))}
                        </div>

                        <ButtonBtn
                          onClick={() => {
                            handleCategoryClick({
                              type: "top",
                              topSlug: topCategory.slug,
                              categories,
                            });
                          }}
                          className="primaryClasses! mx-auto"
                        >
                          View all products
                        </ButtonBtn>
                      </div>
                    </div>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </InnerContainer>
    </nav>
  );
};

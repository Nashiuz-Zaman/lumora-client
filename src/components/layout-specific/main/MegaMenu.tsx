"use client";

// Types
import { ICategoryTreeItem, TProductWithMinimalReviewStats } from "@/types";

// Static Data
import { cardsData } from "@/static-data/productCategoryCards";

// Components - Shared
import { GridCard, IGridCardImage } from "@/components/shared/GridCard";
import { ButtonBtn, ButtonBtnTrans, InnerContainer } from "@/components/shared";

// Components - Local
import { FeaturedProductCard } from "./FeaturedProductCard";

// Hooks
import { useEffect, useState } from "react";
import { useProductSearchParamsManagement } from "@/hooks";

export type TMegaMenuItem = ICategoryTreeItem & {
  featuredProducts?: TProductWithMinimalReviewStats[];
};

export interface IMegaMenuProps {
  categories: TMegaMenuItem[];
}

export const MegaMenu = ({ categories }: IMegaMenuProps) => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const { handleCategoryClick } = useProductSearchParamsManagement();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <nav className="hidden xl:block w-full bg-white border-b border-neutral-100">
      <InnerContainer className="!relative">
        <div className="flex items-center justify-center gap-6 relative">
          {categories.map(
            ({ topCategory: top, subCategories, featuredProducts = [] }) => {
              const cardData = cardsData.find((c) => c.heading === top.title);

              const images: IGridCardImage[] = cardData
                ? cardData?.images?.map((img) => ({
                    src: img?.src,
                    alt: img?.alt,
                  }))
                : [];

              return (
                <div key={top._id} className="group">
                  <p className="cursor-pointer transition-colors duration-200 hover:text-primary font-medium text-xs 2xl:text-sm 3xl:text-base py-3 2xl:py-4">
                    {top.title}
                  </p>

                  <div className="absolute mt-[1px] flex left-0 top-full opacity-0 collapse group-hover:transition-all group-hover:duration-500 group-hover:ease group-hover:opacity-100 group-hover:visible w-full justify-center z-[5000] text-xs 3xl:text-base">
                    <div className="w-full grid grid-cols-[1fr_1fr_2fr] gap-6 p-6 rounded-b-2xl shadow-lg items-start bg-white border border-neutral-100 border-t-0">
                      {/* Left column: Grid card */}
                      <div className="bg-neutral-100 rounded-lg p-6 flex items-center justify-center">
                        <div className="w-[90%]">
                          <GridCard images={images} className="!w-full" />

                          <ButtonBtnTrans
                            onClick={() => {
                              handleCategoryClick({
                                type: "top",
                                topSlug: top.slug,
                                categories,
                              });
                            }}
                            className="font-medium underline mt-4 block text-center"
                          >
                            View all {top.title}
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
                              topSlug: top.slug,
                              categories,
                            });
                          }}
                          className="!primaryClasses !w-full !py-1"
                        >
                          View all products
                        </ButtonBtn>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </InnerContainer>
    </nav>
  );
};

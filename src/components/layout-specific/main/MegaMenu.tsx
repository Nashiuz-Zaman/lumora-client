"use client";

import { ICategoryTreeItem, IProduct } from "@/types";
import Link from "next/link";
import { cardsData } from "@/static-data/productCategoryCards";
import { GridCard, GridCardImage } from "@/components/shared/GridCard";

import { InnerContainer, LinkBtn } from "@/components/shared";
import { FeaturedProductCard } from "./FeaturedProductCard";

export type TMegaMenuItem = ICategoryTreeItem & {
  featuredProducts: Partial<IProduct>[];
};

export interface IMegaMenuProps {
  categories: TMegaMenuItem[];
}

export const MegaMenu = ({ categories }: IMegaMenuProps) => {
  return (
    <nav className="hidden xl:block w-full bg-white border-b border-neutral-100">
      <InnerContainer className="!relative">
        <div className="flex items-center justify-center gap-6 relative">
          {categories.map(
            ({ topCategory: top, subCategories, featuredProducts = [] }) => {
              const cardData = cardsData.find((c) => c.heading === top.title);

              const images: GridCardImage[] = cardData
                ? cardData?.images?.map((img) => ({
                    src: img?.src,
                    alt: img?.alt,
                  }))
                : [];

              return (
                <div key={top._id} className="group">
                  {/* Top category text */}
                  <p className="cursor-pointer transition-colors duration-200 hover:text-primary font-medium text-xs 2xl:text-sm 3xl:text-base py-3 2xl:py-4">
                    {top.title}
                  </p>

                  {/* MegaMenu dropdown */}
                  <div className="absolute mt-[1px] flex left-0 top-full opacity-0 collapse  transition-all duration-300 group-hover:opacity-100 group-hover:visible w-full justify-center z-50 text-xs 3xl:text-base">
                    <div className="w-full grid grid-cols-[1fr_1fr_2fr] gap-6 p-6 rounded-b-lg shadow-lg items-start bg-white">
                      {/* Left column: Grid card */}
                      <div className="bg-neutral-100 rounded-lg p-6 flex items-center justify-center">
                        <div className="w-[90%]">
                          <GridCard images={images} className="!w-full" />

                          <Link
                            href={`/products/search?topCategory=${top.slug}`}
                            className="font-medium underline mt-4 block text-center"
                          >
                            View all {top.title}
                          </Link>
                        </div>
                      </div>

                      {/* Middle column: Subcategories with heading */}
                      <div className="flex flex-col gap-2 px-2">
                        <h4 className="font-semibold text-xl mb-2">
                          Browse Categories
                        </h4>

                        {subCategories.map((sub) => (
                          <Link
                            key={sub._id}
                            href={`/products/search?topCategory=${top?.slug}&subCategory=${sub.slug}`}
                            className="text-neutral-500 hover:text-primary hover:font-medium transition-all transform hover:translate-x-2"
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>

                      {/* Right column: Featured products */}
                      <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-3 gap-4">
                          {featuredProducts.slice(0, 6).map((product) => (
                            <FeaturedProductCard
                              key={product.title}
                              product={product}
                            />
                          ))}
                        </div>

                        <LinkBtn
                          className="!primaryClasses !w-full !py-1"
                          href={`/category/${top.slug}`}
                        >
                          View all products
                        </LinkBtn>
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

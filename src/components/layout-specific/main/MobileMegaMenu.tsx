"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ICategory,
  ICategoryTreeItem,
  IProduct,
  TProductWithMinimalReviewStats,
} from "@/types";
import { FeaturedProductCard } from "./FeaturedProductCard";
import {
  AccordionVertical,
  InnerContainer,
  CloseIcon,
} from "@/components/shared";

export type TMegaMenuItem = ICategoryTreeItem & {
  featuredProducts: Partial<IProduct>[];
};

export interface IMobileMegaMenuProps {
  categories: TMegaMenuItem[];
}

export const MobileMegaMenu = ({ categories }: IMobileMegaMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const router = useRouter();

  const toggleCategory = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  // same logic as in MegaMenu
  const handleCategoryClick = ({
    topSlug,
    subSlug,
    type,
  }: {
    topSlug: string;
    subSlug: string;
    type: "top" | "sub";
  }) => {
    let searchFilter: { subCategories: Record<string, boolean> } = {
      subCategories: {},
    };

    if (type === "sub") {
      searchFilter = { subCategories: { [subSlug]: true } };
    }

    if (type === "top") {
      const topCategoryData = categories.find(
        (cat) => cat.topCategory.slug === topSlug
      );

      if (topCategoryData) {
        const subs: Record<string, boolean> = {};
        topCategoryData.subCategories.forEach((sub: ICategory) => {
          subs[sub.slug] = true;
        });

        searchFilter = { subCategories: subs };
      }
    }

    localStorage.setItem("searchFilters", JSON.stringify(searchFilter));

    setMenuOpen(false); // close menu after selection
    router.push("/products/search");
  };

  return (
    <nav className="block xl:hidden w-full bg-white border-b border-neutral-200">
      {/* Menu toggle button */}
      <InnerContainer>
        <div className="py-3 flex justify-between items-center">
          <span className="font-semibold text-lg">All Products</span>
          <button
            onClick={() => {
              setExpandedIndex(null);
              setMenuOpen(!menuOpen);
            }}
            className="text-primary font-medium"
          >
            {menuOpen ? <CloseIcon className="text-xl" /> : "Menu"}
          </button>
        </div>
      </InnerContainer>

      {/* Menu content */}
      {menuOpen && (
        <div className="py-2 flex flex-col gap-2">
          {categories.map((cat, index) => (
            <div key={cat.topCategory._id}>
              {/* Top category button */}
              <div
                role="button"
                className="w-full text-left py-3 font-medium text-base"
                onClick={() => toggleCategory(index)}
              >
                <InnerContainer className="flex items-center justify-between">
                  {cat.topCategory.title}
                  <span className="text-primary">
                    {expandedIndex === index ? "−" : "+"}
                  </span>
                </InnerContainer>
              </div>

              {/* Accordion for subcategories + featured products */}
              <AccordionVertical
                expanded={expandedIndex === index}
                animate={true}
                duration="200ms"
              >
                <InnerContainer>
                  <div className="flex flex-col gap-3 px-4 pb-4">
                    {/* Subcategories */}
                    <div className="flex flex-col gap-1">
                      {cat.subCategories.map((sub) => (
                        <button
                          key={sub._id}
                          onClick={() =>
                            handleCategoryClick({
                              type: "sub",
                              subSlug: sub.slug,
                              topSlug: "",
                            })
                          }
                          className="text-left text-neutral-500 hover:text-primary hover:font-medium transition-colors"
                        >
                          {sub.title}
                        </button>
                      ))}
                    </div>

                    {/* Featured products */}
                    {cat.featuredProducts.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                        {cat.featuredProducts.slice(0, 4).map((product) => (
                          <FeaturedProductCard
                            key={product.title}
                            product={product as TProductWithMinimalReviewStats}
                          />
                        ))}
                      </div>
                    )}

                    <button
                      onClick={() =>
                        handleCategoryClick({
                          type: "top",
                          topSlug: cat.topCategory.slug,
                          subSlug: "",
                        })
                      }
                      className="!primaryClasses !w-full !py-1 mt-2 rounded bg-primary text-white font-medium"
                    >
                      View all products
                    </button>
                  </div>
                </InnerContainer>
              </AccordionVertical>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

"use client";

import { useState, useEffect } from "react";
import { TProductWithMinimalReviewStats } from "@/types";
import { FeaturedProductCard } from "./FeaturedProductCard";
import {
  AccordionVertical,
  InnerContainer,
  CloseBtn,
  ButtonBtn,
  MobileMenuBtn,
} from "@/components/shared";

import { useProductSearchParamsManagement } from "@/hooks";
import { IMegaMenuProps } from "./MegaMenu";

export const MobileMegaMenu = ({ categories }: IMegaMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { handleCategoryClick } = useProductSearchParamsManagement();

  const toggleCategory = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const closeMenu = () => {
    setMenuOpen(false);
    // Optional: reset accordion state after menu fully closes
    setTimeout(() => setExpandedIndex(null), 300);
  };

  // 1. FREEZE SCROLL LOGIC
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none"; // Prevents iOS bounce
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [menuOpen]);

  // easing curve (Power4.out equivalent)
  const easeCurve = "cubic-bezier(0.25, 1, 0.3, 1)";

  return (
    <nav className="block relative z-5000 xl:hidden w-full bg-white border-b border-neutral-100">
      {/* 2. INLINE TRIGGER BAR */}
      <InnerContainer>
        <div className="py-3 flex justify-between items-center">
          <span className="font-semibold text-lg">All Products</span>

          <MobileMenuBtn
            isMenuOpen={menuOpen}
            noToggleState={true}
            onClick={() => setMenuOpen(true)}
          />
        </div>
      </InnerContainer>

      {/* 3. BACKDROP OVERLAY */}
      <div
        className={`fixed h-screen inset-0 z-5000 bg-black/15 backdrop-blur-sm transition-opacity duration-400 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ transitionTimingFunction: easeCurve }}
        onClick={closeMenu}
      />

      {/* 4. SLIDE-IN DRAWER */}
      <div
        className={`fixed top-0 left-0 bottom-0 h-screen overflow-y-auto z-5001 w-[85%] max-w-[400px] bg-white shadow-2xl flex flex-col transform transition-transform duration-400 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ transitionTimingFunction: easeCurve }}
      >
        {/* Drawer Header (Fixed at top) */}
        <div className="flex justify-between items-center p-5 border-b border-neutral-100 bg-neutral-50">
          <span className="fon text-xl tracking-tight">Menu</span>
          <CloseBtn onClick={closeMenu} />
        </div>

        {/* Drawer Scrollable Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain pb-10">
          <div className="flex flex-col">
            {categories.map((cat, index) => {
              const isExpanded = expandedIndex === index;

              return (
                <div
                  key={cat.topCategory._id}
                  className="border-b border-neutral-100 last:border-0"
                >
                  {/* Top Category Button */}
                  <button
                    className={`w-full text-left px-5 py-4 font-medium text-base transition-colors duration-300 ${
                      isExpanded
                        ? "bg-neutral-50 text-primary"
                        : "bg-white text-neutral-800"
                    }`}
                    onClick={() => toggleCategory(index)}
                  >
                    <div className="flex items-center justify-between">
                      <span className={isExpanded ? "font-semibold" : ""}>
                        {cat.topCategory.title}
                      </span>
                      <span
                        className={`text-xl font-light transform transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      >
                        {isExpanded ? "−" : "+"}
                      </span>
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <AccordionVertical
                    expanded={isExpanded}
                    animate={true}
                    duration="300ms"
                  >
                    <div className="flex flex-col gap-4 px-5 pb-6 pt-2 bg-neutral-50">
                      {/* Subcategories */}
                      <div className="flex flex-col gap-3">
                        {cat?.subCategories.map((sub) => (
                          <button
                            key={sub._id}
                            onClick={() => {
                              handleCategoryClick({
                                type: "subs",
                                subSlugs: [sub.slug],
                              });
                              closeMenu(); // Close drawer on navigation
                            }}
                            className="text-left text-neutral-600 hover:text-primary hover:font-medium transition-all pl-2 border-l-2 border-transparent hover:border-primary"
                          >
                            {sub.title}
                          </button>
                        ))}
                      </div>

                      {/* Featured Products Mini-Grid */}
                      {cat?.featuredProducts &&
                        cat.featuredProducts?.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-neutral-200">
                            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3 block">
                              Featured
                            </span>
                            <div className="grid grid-cols-2 gap-3">
                              {cat.featuredProducts
                                ?.slice(0, 4)
                                .map((product) => (
                                  <FeaturedProductCard
                                    key={product.title}
                                    product={
                                      product as TProductWithMinimalReviewStats
                                    }
                                  />
                                ))}
                            </div>
                          </div>
                        )}

                      {/* View All Button */}
                      <ButtonBtn
                        onClick={() => {
                          handleCategoryClick({
                            type: "top",
                            topSlug: cat.topCategory.slug,
                            categories,
                          });
                          closeMenu();
                        }}
                        className="primaryClasses w-full!"
                      >
                        Shop All {cat.topCategory.title}
                      </ButtonBtn>
                    </div>
                  </AccordionVertical>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

"use client";

import { useSearchPageProductsQueries } from "@/hooks";
import { SearchFilters } from "./SearchFilter";
import {
  InnerContainer,
  Pagination,
  ProductCard,
  SortDropdown,
} from "@/components/shared";
import { useGetCategoryTreeQuery } from "@/libs/redux/apiSlices/category/categoryApiSlice";
import { MobileSearchFilters } from "./MobileSearchFilter";
import { useEffect } from "react";

import { ProductSortOptions } from "@/constants";

export const SearchProductsMain = () => {
  const { data: categories } = useGetCategoryTreeQuery();
  const {
    handleSubmit,
    watchedValues,
    setValue,
    brands,
    products,
    isFetching,
    queryMeta,
    changePage,
  } = useSearchPageProductsQueries();

  //  remove searchFilters on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("searchFilters");
      }
    };
  }, []);

  if (!categories) return null;

  return (
    <InnerContainer className="my-10 3xl:my-14">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_4fr] gap-16">
        {/* Left Column - Filters */}
        <SearchFilters
          categories={categories}
          brands={brands}
          watchedValues={watchedValues}
          setValue={setValue}
          handleSubmit={handleSubmit}
        />

        <MobileSearchFilters
          categories={categories}
          brands={brands}
          watchedValues={watchedValues}
          setValue={setValue}
          handleSubmit={handleSubmit}
        />

        {/* Right Column - Products */}
        <div>
          <SortDropdown
            onUpdate={(value) => {
              if (!value) return;
              setValue("sort", value);
            }}
            selected={watchedValues.sort}
            options={[...ProductSortOptions]}
            buttonLabel="Sort Products"
            className="ml-auto"
          />

          <div className="flex flex-col gap-4">
            {/* ------------------- */}
            {/* Results Summary */}
            <div className="text-sm">
              <h2 className="text-2xl font-semibold mb-2">Results</h2>
              <p className="text-neutral-500">
                {products.length > 0
                  ? `Showing ${
                      ((queryMeta?.page as number) - 1) * queryMeta!.limit + 1
                    }–${Math.min(
                      queryMeta!.page * queryMeta!.limit,
                      queryMeta!.total,
                    )} of ${queryMeta?.total} products`
                  : "No products found"}
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-10 xl:gap-y-16 mt-12 mb-8">
              {isFetching
                ? Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-48 bg-neutral-200 animate-pulse rounded"
                    />
                  ))
                : products.map((product) => (
                    <ProductCard key={product._id} data={product} />
                  ))}
            </div>

            {/* Pagination */}
            {(queryMeta?.totalPages as number) > 0 && (
              <Pagination
                currentPage={queryMeta?.page ?? 1}
                totalPages={queryMeta?.totalPages ?? 1}
                setCurrentPage={changePage}
                className="mt-auto pt-7"
              />
            )}
          </div>
        </div>
      </div>
    </InnerContainer>
  );
};

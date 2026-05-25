import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { ICategoryTreeItem } from "@/types";
import { ProductSortOptions } from "@/constants/product";
import { cleanObject } from "@/utils/cleanObject";
import { compressObjectToBase64Url } from "@/utils/compression";
import { buildUrlWithParams } from "@/utils/buildUrlWithParams";

type TCategoryInput =
  | { type: "subs"; subSlugs: string[] }
  | {
      type: "top";
      topSlug: string;
      categories: ICategoryTreeItem[];
    };

export interface ISearchProductQueriesForm {
  page: number;
  sort: string;
  search: string;
  subCategory: Record<string, boolean>;
  brand: Record<string, boolean>;
  priceMin: number;
  priceMax: number;
}

/**
 * Hook for managing product search params and navigation
 */
export const useProductSearchParamsManagement = () => {
  const router = useRouter();

  /**
   * Returns a comma separated string of selected Sub Categories
   */
  const buildSubCategoryCSVString = useCallback(
    (args: TCategoryInput): Record<string, boolean> => {
      let subCategorySlugs: string[] = [];

      if (args.type === "subs") {
        subCategorySlugs = args.subSlugs;
      }

      if (args.type === "top") {
        const topCategoryData = args.categories.find(
          (cat) => cat.topCategory.slug === args.topSlug,
        );

        if (topCategoryData) {
          subCategorySlugs = topCategoryData.subCategories.map(
            (sub) => sub.slug,
          );
        }
      }

      const subCategoryRecord: Record<string, boolean> = {};

      subCategorySlugs.forEach((category) => {
        subCategoryRecord[category] = true;
      });

      return subCategoryRecord;
    },
    [],
  );

  interface IFilterValues {
    subCategory?: Record<string, boolean>;
    brand?: Record<string, boolean>;
    priceMin?: number;
    priceMax?: number;
    sort?: string;
    page?: number;
    search?: string;
    form?: boolean;
  }

  /**
   * Returns query params object for product search operations
   */
  const buildSearchQueryParams = useCallback((values: IFilterValues = {}) => {
    const {
      subCategory = {},
      brand = {},
      priceMin = 0,
      priceMax = 50000,
      sort = `-${ProductSortOptions[1].value}`,
      page = 1,
      search = "",
    } = values;

    const qObj = cleanObject({
      subCategory,
      brand,
      priceMin,
      priceMax,
      sort,
    });

    return cleanObject({
      page,
      search,
      q: compressObjectToBase64Url(qObj),
    });
  }, []);

  /**
   * Handle category click and navigate to search page
   */
  const handleCategoryClick = useCallback(
    (input: TCategoryInput) => {
      const subCategory = buildSubCategoryCSVString(input);

      const queryParams = buildSearchQueryParams({
        subCategory,
      });

      const url = buildUrlWithParams("/products/s", queryParams);

      router.push(url + "&form=false");
    },
    [router, buildSubCategoryCSVString, buildSearchQueryParams],
  );

  return {
    handleCategoryClick,
    buildSubCategoryCSVString,
    buildSearchQueryParams,
  };
};

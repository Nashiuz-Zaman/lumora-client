import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { ICategoryTreeItem } from "@/types";
import { ProductSortOptions } from "@/constants";
import {
  cleanObject,
  compressObjectToBase64Url,
  buildUrlWithParams,
} from "@/utils";

type TCategoryInput =
  | { type: "subs"; subSlugs: string[] }
  | {
      type: "top";
      topSlug: string;
      categories: ICategoryTreeItem[];
    };

/**
 * Hook for managing product search params and navigation
 */
export const useProductSearchParamsManagement = () => {
  const router = useRouter();

  /**
   * Returns a comma separated string of selected Sub Categories
   */
  const buildSubCategoryCSVString = useCallback(
    (args: TCategoryInput): string => {
      let subSlugs: string[] = [];

      if (args.type === "subs") {
        subSlugs = args.subSlugs;
      }

      if (args.type === "top") {
        const topCategoryData = args.categories.find(
          (cat) => cat.topCategory.slug === args.topSlug
        );

        if (topCategoryData) {
          subSlugs = topCategoryData.subCategories.map((sub) => sub.slug);
        }
      }

      return subSlugs.join(",");
    },
    []
  );

  interface IFilterValues {
    subCategory?: string;
    brand?: string;
    priceMin?: number;
    priceMax?: number;
    sort?: string;
    page?: number;
    search?: string;
    form?: boolean
  }

  /**
   * Returns query params object for product search operations
   */
  const buildSearchQueryParams = useCallback((values: IFilterValues = {}) => {
    const {
      subCategory = "",
      brand = "",
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
        subCategory: subCategory ? subCategory : "",
      });

      const url = buildUrlWithParams("/products/s", queryParams);

      router.push(url + "&form=false");
    },
    [router, buildSubCategoryCSVString, buildSearchQueryParams]
  );

  return {
    handleCategoryClick,
    buildSubCategoryCSVString,
    buildSearchQueryParams,
  };
};

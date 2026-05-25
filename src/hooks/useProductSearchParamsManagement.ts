import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { ICategoryTreeItem } from "@/types";
import { buildUrlWithParams } from "@/utils/common/http/buildUrlWithParams";
import { buildProductSearchQueryParams } from "@/utils/product/buildProductSearchQueryParams";

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
  const buildSubCategoryBooleanRecord = useCallback(
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

  /**
   * Handle category click and navigate to search page
   */
  const handleCategoryClick = useCallback(
    (input: TCategoryInput) => {
      const subCategory = buildSubCategoryBooleanRecord(input);

      const queryParams = buildProductSearchQueryParams({
        subCategory,
      });

      const url = buildUrlWithParams("/products/s", queryParams);

      router.push(url + "&form=false");
    },
    [router, buildSubCategoryBooleanRecord],
  );

  return {
    handleCategoryClick,
    buildSubCategoryCSVString: buildSubCategoryBooleanRecord,
  };
};

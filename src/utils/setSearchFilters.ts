import { ProductSortOptions } from "@/constants";
import { ICategoryTreeItem } from "@/types";
import { cleanObject, compressObjectToBase64Url } from "./";
import { IProductSearchQueryParams } from "@/hooks";

/**
 * Returns a comma separated string of selected Sub Categories
 */
export const buildSubCategoryCSVString = (
  args:
    | { type: "subs"; subSlugs: string[] }
    | {
        type: "top";
        topSlug: string;
        categories: ICategoryTreeItem[];
      }
): string => {
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
};

interface IFilterValues {
  subCategory?: string;
  brand?: string;
  priceMin?: number;
  priceMax?: number;
  sort?: string;
  page?: number;
  search?: string;
}

/**
 * Returns query params object for product search operations
 */
export const buildSearchQueryParams = (values: IFilterValues = {}) => {
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
  }) as IProductSearchQueryParams;
};

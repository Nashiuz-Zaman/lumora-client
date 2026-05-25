import { ProductSortOptions } from "@/constants/product";
import { cleanObject } from "@/utils/common/formatters/cleanObject";
import { compressObjectToBase64Url } from "@/utils/common/io/compression";
import { booleanRecordToCsv } from "@/utils/common/io/csvUtils";
import {
  ISearchProductQueriesForm,
  IMultipleResourceQueryParams,
  IDecompressedParams,
} from "@/types";

export const buildProductSearchQueryParams = (
  values: Partial<ISearchProductQueriesForm>,
  form?: boolean,
): IMultipleResourceQueryParams => {
  const {
    subCategory = {},
    brand = {},
    priceMin = 0,
    priceMax = 50000,
    sort = `-${ProductSortOptions[1].value}`,
    page = 1,
    search = "",
  } = values;

  return cleanObject({
    page,
    search,
    form,
    q: compressObjectToBase64Url<IDecompressedParams>(
      cleanObject({
        subCategory: booleanRecordToCsv(subCategory),
        brand: booleanRecordToCsv(brand),
        priceMin,
        priceMax,
        sort,
      }),
    ),
  }) as IMultipleResourceQueryParams;
};

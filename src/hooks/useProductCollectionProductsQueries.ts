"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { buildUrlWithParams, cleanObject } from "@/utils";
import { useGetProductsFromProductCollectionQuery } from "@/libs/redux/apiSlices/product/productApiSlice";
import { IQueryMeta } from "@/types";

interface IUseProductCollectionProductsOptions {
  limit?: number; // optional limit
}

export const useProductCollectionProductsQueries = (
  collectionSlug: string,
  options: IUseProductCollectionProductsOptions = {}
) => {
  const { limit } = options;

  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();

  // Page param (default 1)
  const page = Number(searchParams.get("page")) || 1;

  const changePage = (newPage: number) => {
    if (newPage !== page) {
      router.push(buildUrlWithParams(path, { page: newPage }));
    }
  };

  // Query params (fixed fields, conditional limit)
  const params = useMemo(
    () =>
      cleanObject({
        page,
        sort: "serial",
        limitFields:
          "_id,title,serial,defaultPrice,defaultImage,defaultOldPrice,totalVariants,totalStock",
        ...(limit ? { limit } : {}), // add limit only if provided
      }),
    [page, limit]
  );

  const query = useGetProductsFromProductCollectionQuery(
    { slug: collectionSlug ?? "", params },
    { skip: !collectionSlug }
  );

  return {
    page,
    changePage,
    collectionProducts: query.data?.data?.products ?? [],
    queryMeta: query.data?.data?.queryMeta as IQueryMeta,
    isFetching: query.isFetching,
    refetch: query.refetch,
  };
};

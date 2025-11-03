"use client";

import { useGetProductsAdminQuery } from "@/libs/redux/apiSlices/product/productApiSlice";
import { IQueryMeta } from "@/types";
import { useState, ChangeEvent } from "react";

interface IQueryParams {
  page: number;
  search: string;
  sort?: string;
}

export const useProductCollectionModalQueries = (
  isModalOpen: boolean,
  topCategorySlug: string
) => {
  const isTopSelling = topCategorySlug?.includes("top-selling");

  const [params, setParams] = useState<IQueryParams>({
    page: 1,
    search: "",
  });

  const query = useGetProductsAdminQuery(
    {
      ...params,
      limit: isTopSelling ? 50 : 25,
      limitFields:
        "defaultImage,defaultPrice,title,totalVariants,totalStock,slug",
    },
    {
      skip: !isModalOpen,
      refetchOnMountOrArgChange: true,
    }
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setParams((prev) => ({
      ...prev,
      search: e.target.value,
      page: 1,
    }));
  };

  const handleSortChange = (sortValue: string) => {
    setParams((prev) => ({
      ...prev,
      sort: sortValue,
      page: 1,
    }));
  };

  const changePage = (page: number) => {
    setParams((prev) => ({
      ...prev,
      page,
    }));
  };

  return {
    params,
    setParams,
    handleSearchChange,
    handleSortChange,
    changePage,
    products: query?.data?.data?.products || [],
    queryMeta: query?.data?.data?.queryMeta as IQueryMeta,
    isFetching: query?.isFetching ?? false,
    refetch: query.refetch,
  };
};

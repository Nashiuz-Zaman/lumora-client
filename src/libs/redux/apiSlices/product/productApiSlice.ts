import { IProductSearchQueryParams } from "@/hooks";
import { baseApiSlice } from "../baseApiSlice";
import {
  IApiResponse,
  IGetProductsParams,
  TPopulatedProductInCollection,
  IProduct,
  IUpdateProductArgs,
  TProductWithMinimalReviewStats,
  TQueryDataWithQueryMeta,
} from "@/types";

// --- API slice ---
export const productsApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductsAdmin: builder.query<
      IApiResponse<TQueryDataWithQueryMeta<{ products: IProduct[] }>>,
      IGetProductsParams
    >({
      query: (params = {}) => ({
        url: `/products/admin`,
        method: "GET",
        params: { limit: 10, ...params },
      }),
      providesTags: (_result, _error, params) => [
        { type: "ProductsAdmin", id: JSON.stringify({ limit: 10, ...params }) },
      ],
    }),

    getProductsForSearchPage: builder.query<
      IApiResponse<
        TQueryDataWithQueryMeta<{
          products: TProductWithMinimalReviewStats[];
          brands: string[];
        }>
      >,
      IProductSearchQueryParams
    >({
      query: (params) => ({
        url: "/products/search",
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 60,
    }),

    getOneProductAdmin: builder.query<IApiResponse, string>({
      query: (id) => ({
        url: `/products/${id}/admin`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),

    createProduct: builder.mutation<IApiResponse, Partial<IProduct>>({
      query: (data) => ({
        url: `/products/`,
        method: "POST",
        data,
      }),
    }),

    updateProduct: builder.mutation<IApiResponse, IUpdateProductArgs>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["ProductsAdmin"],
    }),

    getProductsFromProductCollection: builder.query<
      IApiResponse<
        TQueryDataWithQueryMeta<{
          products: TPopulatedProductInCollection[];
        }>
      >,
      { slug: string; params?: Record<string, any> }
    >({
      query: ({ slug, params }) => ({
        url: `/products/product-collection/${slug}`,
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 60,
    }),

    bulkDeleteProducts: builder.mutation<IApiResponse, string[]>({
      query: (ids) => ({
        url: "/products/bulk-delete",
        method: "PATCH",
        data: { ids },
      }),
      invalidatesTags: ["ProductsAdmin"],
    }),
  }),

  overrideExisting: "throw",
});

export const {
  useGetProductsAdminQuery,
  useGetOneProductAdminQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useBulkDeleteProductsMutation,
  useGetProductsFromProductCollectionQuery,
  useGetProductsForSearchPageQuery,
  useLazyGetProductsForSearchPageQuery,
} = productsApiSlice;

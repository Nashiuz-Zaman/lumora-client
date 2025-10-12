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
  ISearchbarResultProduct,
  IProductWithFullReviewsStats,
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

    searchInSearchbar: builder.query<
      IApiResponse<
        TQueryDataWithQueryMeta<{
          products: ISearchbarResultProduct[];
        }>
      >,
      string
    >({
      query: (searchText) => ({
        url: "/products/search",
        method: "GET",
        params: {
          limitFields: "title,defaultImage,slug",
          limit: 10,
          page: 1,
          search: searchText,
        },
      }),
      keepUnusedDataFor: 0,
    }),

    searchProducts: builder.query<
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

    getProductForCustomer: builder.query<
      IApiResponse<Partial<IProductWithFullReviewsStats>>,
      {
        slug: string;
        limitFields?: string;
        populate?: string;
        reviewStats?: boolean;
      }
    >({
      query: ({ slug, limitFields, populate, reviewStats }) => ({
        url: `/products/${slug}/customer`,
        method: "GET",
        params: {
          ...(limitFields && { limitFields }),
          ...(populate && { populate }),
          ...(reviewStats && { reviewStats: true }),
        },
      }),
      keepUnusedDataFor: 60,
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

// ----------
// Exports
// ----------
export const {
  useGetProductsAdminQuery,
  useGetOneProductAdminQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useBulkDeleteProductsMutation,
  useGetProductsFromProductCollectionQuery,
  useSearchProductsQuery,
  useLazySearchInSearchbarQuery,
  useGetProductForCustomerQuery,
  useLazyGetProductForCustomerQuery,
} = productsApiSlice;

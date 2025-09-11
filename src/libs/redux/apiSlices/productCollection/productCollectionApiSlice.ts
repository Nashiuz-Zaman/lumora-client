import { IApiResponse, IProduct, IQueryMeta } from "@/types";
import { baseApiSlice } from "../baseApiSlice";

export const productCollectionApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET all collections (slug + title)
    getAllCollections: builder.query<
      IApiResponse<{ collections: { slug: string; title: string }[] }>,
      void
    >({
      query: () => ({
        url: "/collections",
        method: "GET",
      }),
      providesTags: ["ProductCollectionsAdmin"],
    }),

    // GET /collections/:slug → fetch products
    getCollectionProducts: builder.query<
      IApiResponse<{ queryMeta: IQueryMeta; products: IProduct[] }>,
      { slug: string; [key: string]: unknown }
    >({
      query: ({ slug, ...queryParams }) => ({
        url: `/collections/${slug}`,
        method: "GET",
        params: queryParams,
      }),
      providesTags: (_result, _error, { slug }) => [
        { type: "ProductCollectionsAdmin", id: slug },
      ],
    }),

    // PATCH /collections/:id/add → add products
    addProductsToCollection: builder.mutation<
      IApiResponse,
      { id: string; productIds: string[] }
    >({
      query: ({ id, productIds }) => ({
        url: `/collections/${id}/add`,
        method: "PATCH",
        data: { productIds },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "ProductCollectionsAdmin", id },
      ],
    }),

    // PATCH /collections/:id/remove → remove products
    removeProductsFromCollection: builder.mutation<
      IApiResponse,
      { id: string; productIds: string[] }
    >({
      query: ({ id, productIds }) => ({
        url: `/collections/${id}/remove`,
        method: "PATCH",
        data: { productIds },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "ProductCollectionsAdmin", id },
      ],
    }),
  }),
  overrideExisting: "throw",
});

export const {
  useGetAllCollectionsQuery,
  useGetCollectionProductsQuery,
  useAddProductsToCollectionMutation,
  useRemoveProductsFromCollectionMutation,
} = productCollectionApi;

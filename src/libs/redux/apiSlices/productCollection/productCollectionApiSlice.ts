import { IApiResponse } from "@/types";
import { baseApiSlice } from "../baseApiSlice";

export const productCollectionApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all collections
    getAllProductCollections: builder.query<
      IApiResponse<{ collections: { slug: string; title: string }[] }>,
      void
    >({
      query: () => ({
        url: "/product-collections",
        method: "GET",
      }),
      providesTags: ["ProductCollectionsAdmin"],
    }),

    // Add products
    addProductsToProductCollection: builder.mutation<
      IApiResponse,
      { slug: string; productIds: string[] }
    >({
      query: ({ slug, productIds }) => ({
        url: `/product-collections/${slug}/add`,
        method: "PATCH",
        data: { productIds },
      }),
    }),

    // Remove products
    removeProductsFromProductCollection: builder.mutation<
      IApiResponse,
      { slug: string; productIds: string[] }
    >({
      query: ({ slug, productIds }) => ({
        url: `/product-collections/${slug}/remove`,
        method: "PATCH",
        data: { productIds },
      }),
    }),
  }),
  overrideExisting: "throw",
});

export const {
  useGetAllProductCollectionsQuery,
  useAddProductsToProductCollectionMutation,
  useRemoveProductsFromProductCollectionMutation,
} = productCollectionApi;

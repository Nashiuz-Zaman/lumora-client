import { baseApiSlice } from "../baseApiSlice";
import { IApiResponse, IProduct } from "@/types";

// Define fields
export const textFields: string[] = [
  "title",
  "subtitle",
  "store",
  "brand",
  "description",
  "seoTitle",
  "metaKeywords",
  "tags",
  "seoDescription",
  "canonicalUrl",
  "status",
  "variants",
  "specifications",
  "collections",
  "productVideos",
];

export const strToArrayFields: string[] = ["metaKeywords", "tags"];
export const mediaFields: string[] = ["images"];

// --- Types ---

export interface IGetProductsParams {
  page?: number;
  limit?: number;
  sort?: string;
  [key: string]: unknown;
}

export interface IUpdateProductArgs {
  id: string;
  data: Partial<IProduct>;
}

export interface ICloneOrMoveProductsArgs {
  selectedProducts: string[];
  selectedCollections: string[];
  operation: "clone" | "move";
}

export interface IFrequentlyBoughtTogetherArgs {
  id: string;
  ids: string[];
}

// --- API slice ---
export const productsApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductsAdmin: builder.query<IApiResponse, IGetProductsParams>({
      query: (params = {}) => ({
        url: `/products/admin`,
        method: "GET",
        params: { ...params, limit: 10 },
      }),
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
      invalidatesTags: ["AdminProductsAll"],
    }),

    cloneOrMoveProducts: builder.mutation<
      IApiResponse,
      ICloneOrMoveProductsArgs
    >({
      query: ({ selectedProducts, selectedCollections, operation }) => ({
        url: "/products/batch-update-collections",
        method: "PATCH",
        data: {
          selectedProducts,
          selectedCollections,
          operation,
        },
      }),
      invalidatesTags: ["AdminProductsAll"],
    }),

    bulkDeleteProducts: builder.mutation<IApiResponse, string[]>({
      query: (ids) => ({
        url: "/products/bulk-delete",
        method: "PATCH",
        data: { ids },
      }),
      invalidatesTags: ["AdminProductsAll"],
    }),

    addFrequentlyBoughtTogether: builder.mutation<
      IApiResponse,
      IFrequentlyBoughtTogetherArgs
    >({
      query: ({ id, ids }) => ({
        url: `/products/${id}/frequently-bought-together/add`,
        method: "PATCH",
        data: { ids },
      }),
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
  useCloneOrMoveProductsMutation,
  useAddFrequentlyBoughtTogetherMutation,
} = productsApiSlice;

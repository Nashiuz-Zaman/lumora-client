import { baseApiSlice } from "../baseApiSlice";

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
export interface Product {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  brand?: string;
  store?: string;
  status?: string;
  images?: string[];
  // extend with other fields as needed
}

export interface GetProductsParams {
  page?: number;
  limit?: number;
  sort?: string;
  [key: string]: unknown;
}

export interface UpdateProductArgs {
  id: string;
  data: Partial<Product>;
}

export interface CloneOrMoveProductsArgs {
  selectedProducts: string[];
  selectedCollections: string[];
  operation: "clone" | "move";
}

export interface BulkDeleteArgs {
  ids: string[];
}

export interface FrequentlyBoughtTogetherArgs {
  id: string;
  ids: string[];
}

// --- API slice ---
export const productsApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductsAdmin: builder.query<Product[], GetProductsParams>({
      query: (params = {}) => ({
        url: `/products/admin`,
        method: "GET",
        params,
      }),
    }),

    getOneProductAdmin: builder.query<Product, string>({
      query: (id) => ({
        url: `/products/${id}/admin`,
        method: "GET",
      }),
      keepUnusedDataFor: 0, // ✅ allowed here
      // ❌ refetchOnMountOrArgChange removed (only allowed in hook usage)
    }),

    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (data) => ({
        url: `/products/`,
        method: "POST",
        data,
      }),
    }),

    updateProduct: builder.mutation<Product, UpdateProductArgs>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["AdminProductsAll"],
    }),

    cloneOrMoveProducts: builder.mutation<unknown, CloneOrMoveProductsArgs>({
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

    bulkDeleteProducts: builder.mutation<unknown, BulkDeleteArgs>({
      query: ({ ids }) => ({
        url: "/products/bulk-delete",
        method: "PATCH",
        data: { ids },
      }),
      invalidatesTags: ["AdminProductsAll"],
    }),

    addFrequentlyBoughtTogether: builder.mutation<
      unknown,
      FrequentlyBoughtTogetherArgs
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

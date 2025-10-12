import { ICategoryTreeItem } from "@/types/category";
import { baseApiSlice } from "../baseApiSlice";

export const categoryApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategoryTree: builder.query<ICategoryTreeItem[], void>({
      query: () => ({
        url: `/categories/tree`,
        method: "GET",
      }),
      providesTags: ["CategoryTree"],
      transformResponse: (response: {
        status: string;
        success: boolean;
        data: { categoryTree: ICategoryTreeItem[] };
      }) => response.data.categoryTree,
    }),
  }),
  overrideExisting: false,
});

// ----------
// Exports
// ----------
export const { useGetCategoryTreeQuery } = categoryApiSlice;

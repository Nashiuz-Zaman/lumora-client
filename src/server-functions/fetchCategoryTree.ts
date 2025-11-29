import { IApiResponse, ICategoryTreeItem } from "@/types";
import { catchAsyncServer, getBaseApiUrl } from "@/utils";

export const fetchCategoryTree = catchAsyncServer(async () => {
  const apiUrl = getBaseApiUrl();
  const res = await fetch(`${apiUrl}/categories/tree`, {
    next: {
      revalidate: 10, // 2 days
    },
  });

  if (!res.ok) throw new Error("Failed to fetch category tree");

  const data: IApiResponse<{ categoryTree: ICategoryTreeItem[] }> =
    await res.json();

  return data?.data;
});

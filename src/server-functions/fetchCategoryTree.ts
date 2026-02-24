import { IApiResponse, ICategoryTreeItem } from "@/types";
import { catchAsyncServer, getBaseApiUrl } from "@/utils";

export const fetchCategoryTree = catchAsyncServer(async () => {
  const apiUrl = getBaseApiUrl();
  const res = await fetch(`${apiUrl}/categories/tree`, {
    next: {
      revalidate: 172800, // 2 days
    },
  });

  if (!res.ok) throw new Error("Failed to fetch category tree");

  const apiResponse: IApiResponse<{ categoryTree: ICategoryTreeItem[] }> =
    await res.json();

  return apiResponse?.data;
});

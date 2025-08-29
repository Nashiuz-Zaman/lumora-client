import { IProductWithReviewsAndStats } from "@/types";
import { catchAsyncServer, getBaseApiUrl } from "@/utils";

export const getProductForCustomer = catchAsyncServer(async (slug: string) => {
  if (!slug) throw new Error("Slug is required");

  const apiUrl = getBaseApiUrl();
  const res = await fetch(`${apiUrl}/products/${slug}/customer`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch product data");

  const data: {
    status: string;
    success: boolean;
    data: IProductWithReviewsAndStats;
  } = await res.json();

  return data?.data;
});

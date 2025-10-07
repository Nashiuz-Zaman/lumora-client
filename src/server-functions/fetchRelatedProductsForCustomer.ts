import { IApiResponse, TProductWithMinimalReviewStats } from "@/types";
import { catchAsyncServer, getBaseApiUrl } from "@/utils";

export const fetchRelatedProductsForCustomer = catchAsyncServer(
  async (productId: string, topCategoryId: string) => {
    if (!productId || !topCategoryId)
      throw new Error("productId and topCategoryId are required");

    const apiUrl = getBaseApiUrl();

    const url = `${apiUrl}/products/related-products?productId=${productId}&topCategoryId=${topCategoryId}`;

    const res = await fetch(url, {
      next: { revalidate: 0 },
    });

    if (!res.ok) throw new Error("Failed to fetch related products");

    const result: IApiResponse<{ products: TProductWithMinimalReviewStats[] }> =
      await res.json();

    return result?.data?.products;
  }
);

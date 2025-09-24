import { IApiResponse, IProductWithReviewsStats } from "@/types";
import { catchAsyncServer, getBaseApiUrl } from "@/utils";

interface GetProductOptions {
  limitFields?: string;
  populate?: string;
  reviewStats?: boolean;
}

export const fetchProductForCustomer = catchAsyncServer(
  async (slug: string, options?: GetProductOptions) => {
    if (!slug) throw new Error("Slug is required");

    const apiUrl = getBaseApiUrl();
    const params = new URLSearchParams();

    if (options?.limitFields) params.append("limitFields", options.limitFields);
    if (options?.populate) params.append("populate", options.populate);
    if (options?.reviewStats) params.append("reviewStats", "true");

    const url = `${apiUrl}/products/${slug}/customer${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    const res = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Failed to fetch product data");

    const result: IApiResponse<IProductWithReviewsStats> = await res.json();

    return result?.data;
  }
);

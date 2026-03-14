import {
  IApiResponse,
  IQueryMeta,
  TPopulatedProductInCollectionWithReviewStats,
} from "@/types";
import { catchAsyncServer } from "@/utils/catchAsyncServer";
import { getBaseApiUrl } from "@/utils/getBaseApiUrl";

export const fetchCollectionProducts = catchAsyncServer(
  async (collectionSlug: string) => {
    if (!collectionSlug) throw new Error("Collection slug is required");

    const apiUrl = getBaseApiUrl();
    const res = await fetch(
      `${apiUrl}/products/product-collection/${collectionSlug}`,
      { next: { revalidate: 120 } }
    );

    if (!res.ok)
      throw new Error("Failed to fetch products from the collection");

    return (await res.json()) as IApiResponse<{
      products: TPopulatedProductInCollectionWithReviewStats[];
      queryMeta?: IQueryMeta;
    }>;
  }
);

import { IApiResponse, IProductCollectionsByPage } from "@/types";
import { catchAsyncServer, getBaseApiUrl } from "@/utils";

export const fetchAllProductCollections = catchAsyncServer(async () => {
  const apiUrl = getBaseApiUrl();
  const res = await fetch(`${apiUrl}/product-collections`);

  if (!res.ok) throw new Error("Failed to fetch product collections");

  return (await res.json()) as IApiResponse<{
    collections: IProductCollectionsByPage[];
  }>;
});

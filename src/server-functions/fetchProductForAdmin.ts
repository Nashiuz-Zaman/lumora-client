import { IApiResponse, IProduct } from "@/types";
import { catchAsyncServer, getBaseApiUrl } from "@/utils";

export const fetchProductForAdmin = catchAsyncServer(
  async (productId: string) => {
    const apiUrl = getBaseApiUrl();
    const res = await fetch(`${apiUrl}/products/${productId}/admin`);

    if (!res.ok) throw new Error("Failed to fetch product data");

    return (await res.json()) as IApiResponse<IProduct>;
  }
);

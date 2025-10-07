import { cookies } from "next/headers";
import { IApiResponse, IProduct } from "@/types";
import { catchAsyncServer, getBaseApiUrl } from "@/utils";

export const fetchProductForAdmin = catchAsyncServer(
  async (productId: string) => {
    const apiUrl = getBaseApiUrl();
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${apiUrl}/products/${productId}/admin`, {
      method: "GET",
      headers: {
        Cookie: cookieHeader, // forward cookies
      },
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to fetch product data");

    return (await res.json()) as IApiResponse<IProduct>;
  }
);

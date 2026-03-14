import { TMegaMenuItem } from "@layout-specific/main/MegaMenu";
import { IApiResponse } from "@/types";
import { catchAsyncServer } from "@/utils/catchAsyncServer";
import { getBaseApiUrl } from "@/utils/getBaseApiUrl";

export const fetchMegaMenuData = catchAsyncServer(async () => {
  const apiUrl = getBaseApiUrl();
  const res = await fetch(`${apiUrl}/products/mega-menu`, {
    next: {
      revalidate: 172800, // 2 days
    },
  });

  if (!res.ok) throw new Error("Failed to fetch mega menu data");

  return (await res.json()) as IApiResponse<TMegaMenuItem[]>;
});

import { TMegaMenuItem } from "@/components/layout-specific/main/MegaMenu";
import { IApiResponse } from "@/types";
import { catchAsyncServer, getBaseApiUrl } from "@/utils";

export const fetchMegaMenuData = catchAsyncServer(async () => {
  const apiUrl = getBaseApiUrl();
  const res = await fetch(`${apiUrl}/products/mega-menu`, {
    next: {
      revalidate: 0,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch mega menu data");

  return (await res.json()) as IApiResponse<TMegaMenuItem[]>;
});

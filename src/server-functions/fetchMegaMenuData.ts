import { TMegaMenuItem } from "@/components/layout-specific/main/MegaMenu";
import { catchAsyncServer, getBaseApiUrl } from "@/utils";

export const fetchMegaMenuData = catchAsyncServer(async () => {
  const apiUrl = getBaseApiUrl();
  const res = await fetch(`${apiUrl}/products/mega-menu`, {
    next: {
      revalidate: 0, // Cache data for 1 hour (3600 seconds)
    },
  });

  if (!res.ok) throw new Error("Failed to fetch mega menu data");

  const data: {
    status: string;
    success: boolean;
    data: TMegaMenuItem[];
  } = await res.json();

  return data?.data || [];
});

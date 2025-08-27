import { TMegaMenuItem } from "@/components/layout-specific/main/MegaMenu";
import { getBaseApiUrl } from "@/utils";

export const fetchMegaMenuData = async (): Promise<TMegaMenuItem[]> => {
  const apiUrl = getBaseApiUrl();
  const res = await fetch(`${apiUrl}/products/mega-menu`, {
    next: {
      revalidate: 3600, // Cache data for 1 hour (3600 seconds)
    },
  });

  if (!res.ok) throw new Error("Failed to fetch mega menu data");

  const data: {
    status: string;
    success: boolean;
    data: TMegaMenuItem[];
  } = await res.json();

  return data?.data || [];
};

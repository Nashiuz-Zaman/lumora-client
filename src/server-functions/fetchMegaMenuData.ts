import { TMegaMenuItem } from "@/components/layout-specific/main/MegaMenu";
import { getBaseApiUrl } from "@/utils";

export const fetchMegaMenuData = async (): Promise<TMegaMenuItem[]> => {
  const apiUrl = getBaseApiUrl();
  const res = await fetch(`${apiUrl}/products/mega-menu`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch mega menu data");

  const data: {
    status: string;
    success: boolean;
    data: TMegaMenuItem[];
  } = await res.json();

  return data?.data || [];
};

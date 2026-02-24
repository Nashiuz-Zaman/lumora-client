import { MegaMenu, TMegaMenuItem } from "./MegaMenu";
import { NoData } from "../../shared";
import { fetchMegaMenuData } from "@/server-functions/fetchMegaMenuData";
import { MobileMegaMenu } from "./MobileMegaMenu";

const MegaMenuServerWrapper = async () => {
  const result = await fetchMegaMenuData();

  if ("isError" in result || !result) {
    return (
      <NoData
        text="Error in Megamenu data fetch"
        className="text-center mx-auto py-10"
      />
    );
  }

  if (!result.data) return "";

  return (
    <>
      <MobileMegaMenu categories={result.data as TMegaMenuItem[]} />
      <MegaMenu categories={result.data as TMegaMenuItem[]} />
    </>
  );
};

export default MegaMenuServerWrapper;

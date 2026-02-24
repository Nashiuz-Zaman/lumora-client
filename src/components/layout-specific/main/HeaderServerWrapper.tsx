import { TMegaMenuItem } from "./MegaMenu";
import { NoData } from "../../shared";
import Header from "./Header";
import { fetchMegaMenuData } from "@/server-functions/fetchMegaMenuData";

const HeaderServerWrapper = async () => {
  const result = await fetchMegaMenuData();

  if ("isError" in result || !result) {
    return (
      <NoData
        text="Error in Megamenu data fetch"
        className="text-center mx-auto py-10"
      />
    );
  }

  return <Header categories={result.data as TMegaMenuItem[]} />;
};

export default HeaderServerWrapper;

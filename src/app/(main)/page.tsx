import {
  FeaturedProductCategories,
  SoldBrands,
} from "@/components/page-specific/main/home";
import { HomeClientWrapper } from "@/components/page-specific/main/home/HomeClientWrapper";

export const metadata = {
  title: "Lumora | Products from top brands all in one place for you",
};

const HomePage = () => {
  return (
    <>
      {/* intro banner is in the client wrapper */}
      <HomeClientWrapper>
        <SoldBrands />
        <FeaturedProductCategories />
      </HomeClientWrapper>
    </>
  );
};

export default HomePage;

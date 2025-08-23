import {
  FeaturedProductCategories,
  SoldBrands,
  TopBanner,
} from "@/components/page-specific/main/home";

export const metadata = {
  title: "Lumora | Products from top brands all in one place for you",
};

const HomePage = () => {
  return (
    <>
      <TopBanner />
      <SoldBrands />
      <FeaturedProductCategories />
    </>
  );
};

export default HomePage;

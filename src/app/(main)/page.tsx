import {
  ProductCategories,
  ProductsFromCollection,
} from "@/components/page-specific/main/home";

import { HomeClientWrapper } from "@/components/page-specific/main/home/HomeClientWrapper";
import { fetchCategoryTree } from "@/server-functions/fetchCategoryTree";

export const metadata = {
  title: "Lumora | Products from top brands all in one place for you",
};

const HomePage = async () => {
  const result = await fetchCategoryTree();
  const isErrorWithCategory = !result || "isError" in result;

  return (
    <>
      {/* intro banner is in the client wrapper */}
      <HomeClientWrapper>
        {/* pass the fetched tree into ProductCategories */}
        <ProductCategories />

        {!isErrorWithCategory && (
          <div className="space-y-14 my-14">
            {/* Top Selling stays unchanged */}
            <ProductsFromCollection
              collectionSlug="top-selling-products-homepage"
              title="Top Selling"
              tagline="Our best-sellers, loved by thousands."
              navigation={{
                nextEl: ".top-selling-products-homepage-next",
                prevEl: ".top-selling-products-homepage-prev",
              }}
            />

            <ProductsFromCollection
              collectionSlug="fashion-accessories-homepage"
              title="Fashion & Accessories"
              categoryTree={result.categoryTree}
              topCategorySlug="fashion-accessories"
              navigation={{
                nextEl: ".fashion-accessories-homepage-next",
                prevEl: ".fashion-accessories-homepage-prev",
              }}
            />

            <ProductsFromCollection
              collectionSlug="gaming-entertainment-homepage"
              title="Gaming & Entertainment"
              categoryTree={result.categoryTree}
              topCategorySlug="gaming-entertainment"
              navigation={{
                nextEl: ".gaming-entertainment-homepage-next",
                prevEl: ".gaming-entertainment-homepage-prev",
              }}
            />

            <ProductsFromCollection
              collectionSlug="mobile-phones-electronics-homepage"
              title="Mobile Phones & Electronics"
              categoryTree={result.categoryTree}
              topCategorySlug="mobile-phones-electronics"
              navigation={{
                nextEl: ".mobile-phones-electronics-homepage-next",
                prevEl: ".mobile-phones-electronics-homepage-prev",
              }}
            />

            <ProductsFromCollection
              collectionSlug="food-snacks-homepage"
              title="Food & Snacks"
              categoryTree={result.categoryTree}
              topCategorySlug="food-snacks"
              navigation={{
                nextEl: ".food-snacks-homepage-next",
                prevEl: ".food-snacks-homepage-prev",
              }}
            />

            <ProductsFromCollection
              collectionSlug="kitchen-essentials-homepage"
              title="Kitchen Essentials"
              categoryTree={result.categoryTree}
              topCategorySlug="kitchen-essentials"
              navigation={{
                nextEl: ".kitchen-essentials-homepage-next",
                prevEl: ".kitchen-essentials-homepage-prev",
              }}
            />

            <ProductsFromCollection
              collectionSlug="home-appliances-essentials-homepage"
              title="Home Appliances & Essentials"
              categoryTree={result.categoryTree}
              topCategorySlug="home-appliances-essentials"
              navigation={{
                nextEl: ".home-appliances-essentials-homepage-next",
                prevEl: ".home-appliances-essentials-homepage-prev",
              }}
            />

            <ProductsFromCollection
              collectionSlug="health-wellness-homepage"
              title="Health & Wellness"
              categoryTree={result.categoryTree}
              topCategorySlug="health-wellness"
              navigation={{
                nextEl: ".health-wellness-homepage-next",
                prevEl: ".health-wellness-homepage-prev",
              }}
            />
          </div>
        )}
      </HomeClientWrapper>
    </>
  );
};

export default HomePage;

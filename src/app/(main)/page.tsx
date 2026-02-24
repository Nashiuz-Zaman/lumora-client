import {
  ProductCategories,
  ProductsFromCollection,
  IntroBanner,
} from "@/components/page-specific";
import { ProductCollectionSkeleton } from "@/components/shared/skeletons/ProductCollectionSkeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Lumora | Products from top brands all in one place for you",
  description:
    "Discover top-selling products, fashion, electronics, gaming gear, home essentials, kitchen items, wellness products, outdoor gear, and more — all in one place. Lumora brings you curated collections from trusted brands with fast delivery, easy shopping, and unbeatable variety.",
};

const HomePage = async () => {
  return (
    <>
      <IntroBanner />

      <Suspense>
        <ProductCategories />
      </Suspense>

      <div className="space-y-8 my-8">
        <Suspense fallback={<ProductCollectionSkeleton />}>
          <ProductsFromCollection
            collectionSlug="top-selling-products-homepage"
            title="Top Selling"
            tagline="Our best-sellers, loved by thousands."
            navigation={{
              nextEl: ".top-selling-products-homepage-next",
              prevEl: ".top-selling-products-homepage-prev",
            }}
          />
        </Suspense>

        <Suspense fallback={<ProductCollectionSkeleton />}>
          <ProductsFromCollection
            id="fashion-accessories"
            collectionSlug="fashion-accessories-homepage"
            title="Fashion & Accessories"
            parentCategorySlug="fashion-accessories"
            navigation={{
              nextEl: ".fashion-accessories-homepage-next",
              prevEl: ".fashion-accessories-homepage-prev",
            }}
          />
        </Suspense>

        <Suspense fallback={<ProductCollectionSkeleton />}>
          <ProductsFromCollection
            id="gaming-entertainment"
            collectionSlug="gaming-entertainment-homepage"
            title="Gaming & Entertainment"
            parentCategorySlug="gaming-entertainment"
            navigation={{
              nextEl: ".gaming-entertainment-homepage-next",
              prevEl: ".gaming-entertainment-homepage-prev",
            }}
          />
        </Suspense>

        <Suspense fallback={<ProductCollectionSkeleton />}>
          <ProductsFromCollection
            id="mobile-phones-electronics"
            collectionSlug="mobile-phones-electronics-homepage"
            title="Mobile Phones & Electronics"
            parentCategorySlug="mobile-phones-electronics"
            navigation={{
              nextEl: ".mobile-phones-electronics-homepage-next",
              prevEl: ".mobile-phones-electronics-homepage-prev",
            }}
          />
        </Suspense>

        <Suspense fallback={<ProductCollectionSkeleton />}>
          <ProductsFromCollection
            id="food-snacks"
            collectionSlug="food-snacks-homepage"
            title="Food & Snacks"
            parentCategorySlug="food-snacks"
            navigation={{
              nextEl: ".food-snacks-homepage-next",
              prevEl: ".food-snacks-homepage-prev",
            }}
          />
        </Suspense>

        <Suspense fallback={<ProductCollectionSkeleton />}>
          <ProductsFromCollection
            id="kitchen-essentials"
            collectionSlug="kitchen-essentials-homepage"
            title="Kitchen Essentials"
            parentCategorySlug="kitchen-essentials"
            navigation={{
              nextEl: ".kitchen-essentials-homepage-next",
              prevEl: ".kitchen-essentials-homepage-prev",
            }}
          />
        </Suspense>

        <Suspense fallback={<ProductCollectionSkeleton />}>
          <ProductsFromCollection
            id="home-appliances-essentials"
            collectionSlug="home-appliances-essentials-homepage"
            title="Home Appliances & Essentials"
            parentCategorySlug="home-appliances-essentials"
            navigation={{
              nextEl: ".home-appliances-essentials-homepage-next",
              prevEl: ".home-appliances-essentials-homepage-prev",
            }}
          />
        </Suspense>

        <Suspense fallback={<ProductCollectionSkeleton />}>
          <ProductsFromCollection
            id="health-wellness"
            collectionSlug="health-wellness-homepage"
            title="Health & Wellness"
            parentCategorySlug="health-wellness"
            navigation={{
              nextEl: ".health-wellness-homepage-next",
              prevEl: ".health-wellness-homepage-prev",
            }}
          />
        </Suspense>

        <Suspense fallback={<ProductCollectionSkeleton />}>
          <ProductsFromCollection
            id="outdoors"
            collectionSlug="outdoors-homepage"
            title="Outdoors"
            parentCategorySlug="outdoors"
            navigation={{
              nextEl: ".outdoors-homepage-next",
              prevEl: ".outdoors-homepage-prev",
            }}
          />
        </Suspense>
      </div>
    </>
  );
};

export default HomePage;

import { CenterContainer } from "../containers/CenterContainer";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

export const ProductCollectionSkeleton = () => {
  return (
    <CenterContainer className="py-8">
      {/* Header Placeholder */}
      <div className="flex justify-between items-end mb-8 animate-pulse">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-neutral-200 rounded" />
          <div className="h-4 w-64 bg-neutral-100 rounded" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-10 bg-neutral-100 rounded-full" />
          <div className="h-10 w-10 bg-neutral-100 rounded-full" />
        </div>
      </div>

      {/* Swiper Grid Placeholder */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {[...Array(5)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </CenterContainer>
  );
};

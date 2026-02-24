export const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col p-4 h-full animate-pulse border border-transparent">
      {/* Badge Placeholder */}
      <div className="h-5 w-20 bg-neutral-200 mb-3" />

      {/* Product Image Placeholder */}
      <div className="mx-auto mt-3 mb-3.5 h-28 aspect-square bg-neutral-200 rounded-md" />

      {/* Title Placeholder */}
      <div className="space-y-2 mb-4 grow">
        <div className="h-4 bg-neutral-200 rounded w-3/4 mx-auto" />
        <div className="h-4 bg-neutral-200 rounded w-1/2 mx-auto" />
      </div>

      {/* Rating Placeholder */}
      <div className="mt-auto">
        <div className="flex justify-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-4 bg-neutral-100 rounded-full" />
          ))}
        </div>

        {/* Pricing Placeholder */}
        <div className="flex justify-center items-center gap-3 mb-3">
          <div className="h-6 w-16 bg-neutral-200 rounded" />
          <div className="h-4 w-12 bg-neutral-100 rounded" />
        </div>

        {/* Brand Placeholder */}
        <div className="h-3 w-20 bg-neutral-100 rounded mx-auto mb-5" />

        {/* Button Placeholder */}
        <div className="h-10 w-full bg-neutral-200 rounded-full" />
      </div>
    </div>
  );
};

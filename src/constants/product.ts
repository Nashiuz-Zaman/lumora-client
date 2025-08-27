// Product status object (frozen for runtime immutability)
export const ProductStatus = Object.freeze({
  Deleted: -1,
  Draft: 0,
  Active: 1,
} as const);

// Type derived from the frozen object
export type TProductStatusValue =
  (typeof ProductStatus)[keyof typeof ProductStatus];

// Product sort options (frozen for immutability)
export const ProductSortOptions = Object.freeze([
  { label: "Product Name", value: "title" },
  { label: "Price", value: "defaultPrice" },
  // { label: "Created", value: "createdAt" },
  { label: "Updated", value: "updatedAt" },
] as const);

// Optional type for product sort values
export type TProductSortOptionValue =
  (typeof ProductSortOptions)[number]["value"];

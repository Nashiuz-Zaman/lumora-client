export const ProductSortOptions = Object.freeze([
  { label: "Product Name", value: "title" },
  { label: "Created", value: "createdAt" },
  { label: "Updated", value: "updatedAt" },
] as const);

export const ProductStatus = Object.freeze({
  Deleted: -1,
  Draft: 0,
  Active: 1,
} as const);

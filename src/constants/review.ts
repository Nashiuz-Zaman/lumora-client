// Review status (frozen)
export const ReviewStatus = Object.freeze({
  Deleted: -1,
  Pending: 0,
  Approved: 1,
} as const);

// Type for review status values
export type TReviewStatus = (typeof ReviewStatus)[keyof typeof ReviewStatus];

// Review sort options (frozen)
export const ReviewSortOptions = Object.freeze([
  { label: "Name", value: "name" },
  { label: "Title", value: "title" },
  { label: "Rating", value: "rating" },
  { label: "Status", value: "status" },
  { label: "Updated", value: "updatedAt" },
] as const);

// Type for sort option values
export type TReviewSortOptionValue =
  (typeof ReviewSortOptions)[number]["value"];

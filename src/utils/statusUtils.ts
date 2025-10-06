import { CouponStatus } from "@/constants/coupon";
import { OrderStatus } from "@/constants/order";
import { ProductStatus } from "@/constants/product";
import { ReturnRequestStatus } from "@/constants/returnRequest";
import { ReviewStatus } from "@/constants/review";

// --- Utility to clean a query param for status ---
export const cleanStatusParam = (statusParam: unknown): number | "all" => {
  if (typeof statusParam === "boolean") return "all";

  if (typeof statusParam === "number") return statusParam;

  if (typeof statusParam === "string") {
    const trimmed = statusParam.trim();
    if (trimmed === "") return "all";

    const num = Number(trimmed);
    if (Number.isFinite(num)) return num;

    return "all";
  }

  return "all";
};

// --- Coupon Status ---
export const getCouponStatusLabel = (statusCode: number): string => {
  const entry = Object.entries(CouponStatus).find(
    ([, value]) => value === statusCode
  );
  return entry ? entry[0] : "Unknown";
};

export const getCouponStatusTextColor = (code: number): string => {
  switch (code) {
    case CouponStatus.Deleted:
      return "text-red-600";
    case CouponStatus.Expired:
      return "text-yellow-500";
    case CouponStatus.Active:
      return "text-green-600";
    default:
      return "text-gray-700";
  }
};

// --- Order Status ---
export const getOrderStatusLabel = (status: number): string =>
  Object.entries(OrderStatus).find(([, value]) => value === status)?.[0] ??
  "Unknown";

export const getOrderStatusTextColor = (code: number): string => {
  switch (code) {
    case OrderStatus.Pending:
      return "text-amber-600";
    case OrderStatus.Confirmed:
      return "text-green-600";
    case OrderStatus.Shipped:
      return "text-indigo-600";
    case OrderStatus.Delivered:
      return "text-green-600";
    case OrderStatus.Cancelled:
      return "text-red-600";
    case OrderStatus.Returned:
      return "text-gray-500";
    case OrderStatus.Deleted:
      return "text-gray-500";
    default:
      return "text-gray-700";
  }
};

// --- Product Status ---
export const getProductStatusTextColor = (code: number): string => {
  switch (code) {
    case ProductStatus.Active:
      return "text-green-600";
    case ProductStatus.Draft:
      return "text-yellow-600";
    case ProductStatus.Deleted:
      return "text-red-500";
    default:
      return "text-gray-600";
  }
};

// Generic helper to get status label from any status object
export const getStatusLabel = (
  status: number,
  statusObj: Record<string, number>
): string =>
  Object.entries(statusObj).find(([, value]) => value === status)?.[0] ??
  "Unknown";

// --- Review Status ---
export const getReviewStatusLabel = (status: number): string => {
  switch (status) {
    case ReviewStatus.Deleted:
      return "Deleted";
    case ReviewStatus.Pending:
      return "Pending Approval";
    case ReviewStatus.Approved:
      return "Approved";
    default:
      return "Unknown";
  }
};

export const getReviewStatusTextColor = (status: number): string => {
  switch (status) {
    case ReviewStatus.Deleted:
      return "text-red-600";
    case ReviewStatus.Pending:
      return "text-yellow-500";
    case ReviewStatus.Approved:
      return "text-green-600";
    default:
      return "text-gray-700";
  }
};

// --- Return Request Status ---
export const getReturnRequestStatusLabel = (status: number): string => {
  switch (status) {
    case ReturnRequestStatus.Rejected:
      return "Rejected";
    case ReturnRequestStatus.Pending:
      return "Pending";
    case ReturnRequestStatus.Approved:
      return "Approved";
    default:
      return "Unknown";
  }
};

export const getReturnRequestStatusTextColor = (status: number): string => {
  switch (status) {
    case ReturnRequestStatus.Rejected:
      return "text-red-600";
    case ReturnRequestStatus.Pending:
      return "text-yellow-500";
    case ReturnRequestStatus.Approved:
      return "text-green-600";
    default:
      return "text-gray-700";
  }
};

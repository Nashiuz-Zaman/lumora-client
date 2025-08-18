import { CouponStatus } from "@/constants/coupon";
import { OrderStatus } from "@/constants/order";
import { ProductStatus } from "@/constants/product";
import { ReturnRequestStatus } from "@/constants/returnRequest";
import { ReviewStatus } from "@/constants/review";

type StatusCode = number | string | undefined;

// --- Utility to clean a query param for status ---
export function cleanStatusParam(statusParam: StatusCode): number | "all" {
  if (statusParam === "" || isNaN(Number(statusParam))) return "all";
  return Number(statusParam);
}

// --- Coupon Status ---
export function getCouponStatusLabel(statusCode: number): string {
  const entry = Object.entries(CouponStatus).find(
    ([, value]) => value === statusCode
  );
  return entry ? entry[0] : "Unknown";
}

export function getCouponStatusTextColor(code: number): string {
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
}

// --- Order Status ---
export function getOrderStatusLabel(status: number): string {
  return (
    Object.entries(OrderStatus).find(([, value]) => value === status)?.[0] ??
    "Unknown"
  );
}

export function getOrderStatusTextColor(code: number): string {
  switch (code) {
    case OrderStatus.Cancelled:
      return "text-red-600";
    case OrderStatus["Quotation Not Sent"]:
      return "text-neutral-400";
    case OrderStatus["Quotation Sent"]:
      return "text-yellow-500";
    case OrderStatus.Confirmed:
      return "text-blue-600";
    case OrderStatus.Shipped:
      return "text-indigo-600";
    case OrderStatus.Delivered:
      return "text-green-600";
    case OrderStatus.Abandoned:
    case OrderStatus.Deleted:
    case OrderStatus.Returned:
      return "text-gray-500";
    default:
      return "text-gray-700";
  }
}

// --- Product Status ---
export function getProductStatusTextColor(code: number): string {
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
}

// Generic helper to get status label from any status object
export function getStatusLabel(
  status: number,
  statusObj: Record<string, number>
): string {
  return (
    Object.entries(statusObj).find(([, value]) => value === status)?.[0] ??
    "Unknown"
  );
}

// --- Review Status ---
export function getReviewStatusLabel(status: number): string {
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
}

export function getReviewStatusTextColor(status: number): string {
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
}

// --- Return Request Status ---
export function getReturnRequestStatusLabel(status: number): string {
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
}

export function getReturnRequestStatusTextColor(status: number): string {
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
}

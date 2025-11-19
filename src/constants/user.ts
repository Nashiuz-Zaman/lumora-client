import { IUser, TSortOptions } from "@/types";

// User roles (frozen)
export const UserRoles = Object.freeze({
  customer: "customer",
  admin: "admin",
  superAdmin: "superadmin",
} as const);

// Type for user role values
export type TUserRoleValue = (typeof UserRoles)[keyof typeof UserRoles];

// User status (frozen)
export const UserStatus = Object.freeze({
  active: "active",
  blocked: "blocked",
  deleted: "deleted",
} as const);

// Type for user status values
export type TUserStatusValue = (typeof UserStatus)[keyof typeof UserStatus];

// User sort options (frozen)
export const UserSortOptions = Object.freeze([
  { label: "Name", value: "name" },
  { label: "Joined", value: "createdAt" },
  { label: "Email", value: "email" },
] as const satisfies TSortOptions<IUser>);

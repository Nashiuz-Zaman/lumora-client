export const UserRoles = Object.freeze({
  customer: "customer",
  admin: "admin",
  superAdmin: "super-admin",
});

// Type of the values ("customer" | "admin" | "super-admin")
export type TUserRoleValue = (typeof UserRoles)[keyof typeof UserRoles];

export const UserStatus = Object.freeze({
  active: "active",
  blocked: "blocked",
  deleted: "deleted",
});

export const UserSortOptions = Object.freeze([
  { label: "Name", value: "name" },
  { label: "Joined", value: "createdAt" },
  { label: "Email", value: "email" },
]);

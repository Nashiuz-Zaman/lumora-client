export interface IRole {
  id?: string; 
  name: "customer" | "admin" | "superadmin";
  slug: "customers" | "admins" | "superadmins";
  permissions:
    | "customer_permissions"
    | "admin_permissions"
    | "superadmin_permissons";
  isDefault?: boolean; 
}

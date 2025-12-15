// Types for nav items
interface INavItem {
  name: string;
  icon: string;
  path: string;
  checkSubstr?: boolean;
}

interface INavSection {
  heading: string;
  items: INavItem[];
}

export const navSections: INavSection[] = [
  {
    heading: "Analytics",
    items: [
      { name: "Dashboard", icon: "mdi:analytics", path: "/admin/analytics" },
    ],
  },
  {
    heading: "Database",
    items: [
      {
        name: "Users",
        icon: "clarity:users-solid",
        path: "/admin/users",
        checkSubstr: true,
      },
      {
        name: "Products",
        icon: "fluent-mdl2:product-variant",
        path: "/admin/products",
        checkSubstr: true,
      },
    ],
  },
  {
    heading: "Orders",
    items: [
      {
        name: "Confirmed",
        icon: "charm:tick",
        path: "/admin/orders/confirmed",
      },
      {
        name: "Shipped",
        icon: "mdi:truck-delivery-outline",
        path: "/admin/orders/shipped",
      },
      {
        name: "Delivered",
        icon: "solar:delivery-bold",
        path: "/admin/orders/delivered",
      },
      {
        name: "Cancelled",
        icon: "material-symbols:cancel-outline",
        path: "/admin/orders/cancelled",
      },
      {
        name: "Returned",
        icon: "material-symbols:assignment-return",
        path: "/admin/orders/returned",
      },
      {
        name: "Archived",
        icon: "mdi:archive-lock",
        path: "/admin/orders/archived",
      },
    ],
  },
  {
    heading: "Returns",
    items: [
      {
        name: "Pending",
        icon: "ion:hourglass-outline",
        path: "/admin/returns/pending",
      },
      {
        name: "Approved",
        icon: "charm:tick",
        path: "/admin/returns/approved",
      },
      {
        name: "Rejected",
        icon: "material-symbols:cancel-outline",
        path: "/admin/returns/rejected",
      },
    ],
  },
  {
    heading: "Transactions",
    items: [
      {
        name: "Payments",
        icon: "material-symbols:paid",
        path: "/admin/transactions/payments",
      },
      {
        name: "Refunds",
        icon: "material-symbols:cancel-outline",
        path: "/admin/transactions/refunds",
      },
    ],
  },
  {
    heading: "Coupons",
    items: [
      {
        name: "Active",
        icon: "nrk:live-activity-active",
        path: "/admin/coupons/active",
      },
      {
        name: "Expired",
        icon: "bi:exclamation-triangle-fill",
        path: "/admin/coupons/expired",
      },
    ],
  },
];

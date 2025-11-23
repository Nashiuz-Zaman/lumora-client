// ---------------------------------------------------------
// CATEGORY MODEL
// Represents a single category in the system
// ---------------------------------------------------------
export interface ICategory {
  _id?: string;
  title: string;
  slug: string;
  parentCategory?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

// ---------------------------------------------------------
// CATEGORY TREE ITEM
// Represents a top-level category and its subcategories
// ---------------------------------------------------------
export interface ICategoryTreeItem {
  topCategory: ICategory;
  subCategories: ICategory[];
}

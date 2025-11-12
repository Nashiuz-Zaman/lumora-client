export interface ICategory {
  _id?: string;
  title: string;
  slug: string;
  parentCategory?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICategoryTreeItem {
  topCategory: ICategory;
  subCategories: ICategory[];
}

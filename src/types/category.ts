export interface ICategory {
  _id?: string;
  title: string;
  slug: string;
  parentCategory?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategoryTreeItem {
  topCategory: ICategory;
  subCategories: ICategory[];
}

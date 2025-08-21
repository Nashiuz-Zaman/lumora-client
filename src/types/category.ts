export interface ISubCategory {
  _id: string;
  title: string;
  slug: string;
}

export interface ITopCategory {
  _id: string;
  title: string;
  slug: string;
}

export interface ICategoryTreeItem {
  topCategory: ITopCategory;
  subCategories: ISubCategory[];
}

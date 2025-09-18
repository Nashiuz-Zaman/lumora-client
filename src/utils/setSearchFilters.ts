import { ICategoryTreeItem } from "@/types";

type TFilterInput =
  | { type: "subs"; subSlugs: string[] }
  | {
      type: "top";
      topSlug: string;
      categories: ICategoryTreeItem[];
    };

export const setCategoryFilter = (input: TFilterInput) => {
  if (typeof window === "undefined") return; // prevent SSR crash

  let subSlugs: string[] = [];

  if (input.type === "subs") {
    subSlugs = input.subSlugs;
  }

  if (input.type === "top") {
    const topCategoryData = input.categories.find(
      (cat) => cat.topCategory.slug === input.topSlug
    );

    if (topCategoryData) {
      subSlugs = topCategoryData.subCategories.map((sub) => sub.slug);
    }
  }

  const subs: Record<string, boolean> = {};
  subSlugs.forEach((slug) => {
    subs[slug] = true;
  });

  // ✅ overwrite old subCategories
  const stored = localStorage.getItem("searchFilters");
  let existing = {};

  if (stored) {
    try {
      existing = JSON.parse(stored);
    } catch {
      // ignore parse errors
    }
  }

  const searchFilter = { ...existing, subCategories: subs };

  localStorage.setItem("searchFilters", JSON.stringify(searchFilter));
};

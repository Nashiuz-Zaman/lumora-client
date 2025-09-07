export const addSubCategoriesToFilter = (subSlugs: string[]) => {
  const subs: Record<string, boolean> = {};

  subSlugs.forEach((slug) => {
    subs[slug] = true;
  });

  const searchFilter = { subCategories: subs };

  localStorage.setItem("searchFilters", JSON.stringify(searchFilter));
};

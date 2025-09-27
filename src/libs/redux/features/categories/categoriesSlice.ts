import { ICategoryTreeItem } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICategoriesState {
  categoryTree: ICategoryTreeItem[];
}

const initialState: ICategoriesState = {
  categoryTree: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (
      state,
      action: PayloadAction<ICategoriesState["categoryTree"]>
    ) => {
      state.categoryTree = action.payload;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;
const categoriesReducer = categoriesSlice.reducer;
export default categoriesReducer;

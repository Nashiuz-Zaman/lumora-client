import { configureStore } from "@reduxjs/toolkit";
import backdropReducer from "./features/backdrop/backdropSlice";
import productQuickViewReducer from "./features/productQuickView/productQuickViewSlice";
import { baseApiSlice } from "./apiSlices/baseApiSlice";
import categoriesReducer from "./features/categories/categoriesSlice";
import { ICategoryTreeItem } from "@/types";

export const makeStore = (preloadedCategories?: ICategoryTreeItem[]) =>
  configureStore({
    reducer: {
      backdrop: backdropReducer,
      productQuickView: productQuickViewReducer,
      categories: categoriesReducer,
      [baseApiSlice.reducerPath]: baseApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApiSlice.middleware),
    preloadedState: preloadedCategories
      ? {
          categories: {
            categoryTree: preloadedCategories,
          },
        }
      : undefined,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type TRootState = ReturnType<AppStore["getState"]>;
export type TAppDispatch = AppStore["dispatch"];

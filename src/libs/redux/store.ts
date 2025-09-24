import { configureStore } from "@reduxjs/toolkit";
import backdropReducer from "./features/backdrop/backdropSlice";
import productQuickViewReducer from "./features/productQuickView/productQuickViewSlice";
import { baseApiSlice } from "./apiSlices/baseApiSlice";

export const store = configureStore({
  reducer: {
    backdrop: backdropReducer,
    productQuickView: productQuickViewReducer,
    [baseApiSlice.reducerPath]: baseApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApiSlice.middleware),
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;

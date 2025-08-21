import { configureStore } from "@reduxjs/toolkit";
import backdropReducer from "./features/nav/backdropSlice";
import { baseApiSlice } from "./apiSlices/baseApiSlice";

export const store = configureStore({
  reducer: {
    backdrop: backdropReducer,
    [baseApiSlice.reducerPath]: baseApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

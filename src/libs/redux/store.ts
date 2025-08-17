import { configureStore } from "@reduxjs/toolkit";
import backdropReducer from "./features/nav/backdropSlice";

export const store = configureStore({
  reducer: {
    backdrop: backdropReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

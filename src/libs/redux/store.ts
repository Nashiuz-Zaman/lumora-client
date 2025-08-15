import { configureStore } from "@reduxjs/toolkit";

// reducers
import navReducer from "@/redux/features/nav/navSlice";

export const store = configureStore({
  reducer: {
    nav: navReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

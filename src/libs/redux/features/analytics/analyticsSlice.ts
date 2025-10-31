// Imports
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAnalyticsState {
  month: string;
  year: string;
}

const initialState: IAnalyticsState = {
  month: "all",
  year: "all",
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    setMonth: (state, action: PayloadAction<string>) => {
      state.month = action.payload;
    },
    setYear: (state, action: PayloadAction<string>) => {
      state.year = action.payload;
    },
  },
});

export const { setMonth, setYear } = analyticsSlice.actions;
const analyticsReducer = analyticsSlice.reducer;
export default analyticsReducer;

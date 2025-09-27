// Imports
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IBackdropState {
  backdropOpen: boolean;
}

const initialState: IBackdropState = {
  backdropOpen: false,
};

const backdropSlice = createSlice({
  name: "backdrop",
  initialState,
  reducers: {
    setBackdropOpen: (state, action: PayloadAction<boolean>) => {
      state.backdropOpen = action.payload;
    },
  },
});

export const { setBackdropOpen } = backdropSlice.actions;
const backdropReducer = backdropSlice.reducer;
export default backdropReducer;

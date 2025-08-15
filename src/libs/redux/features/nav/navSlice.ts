"use client";

// imports
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavState {
  open: boolean;
}

const initialState: NavState = {
  open: true,
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.open = payload;
    },
  },
});

const { actions, reducer } = navSlice;

export default reducer;
export const { setOpen } = actions;

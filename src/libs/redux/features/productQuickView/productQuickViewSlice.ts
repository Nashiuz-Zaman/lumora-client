"use client";

import { IProduct } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setBackdropOpen } from "../backdrop/backdropSlice";

interface IProductQuickViewState {
  quickViewModalData: Partial<IProduct> | null;
  isModalOpen: boolean;
}

const initialState: IProductQuickViewState = {
  quickViewModalData: null,
  isModalOpen: false,
};

const productQuickViewSlice = createSlice({
  name: "productQuickView",
  initialState,
  reducers: {
    setQuickViewModalData: (
      state,
      action: PayloadAction<IProductQuickViewState["quickViewModalData"]>
    ) => {
      state.quickViewModalData = action.payload;
    },
    setIsModalOpen: (
      state,
      action: PayloadAction<IProductQuickViewState["isModalOpen"]>
    ) => {
      state.isModalOpen = action.payload;
      setBackdropOpen(action.payload);
    },
  },
});

export const { setQuickViewModalData, setIsModalOpen } =
  productQuickViewSlice.actions;

const productQuickViewReducer = productQuickViewSlice.reducer;
export default productQuickViewReducer;

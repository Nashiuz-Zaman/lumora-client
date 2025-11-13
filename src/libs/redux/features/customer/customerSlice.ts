import { ICustomerProfile } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICustomerState {
  customerProfileData: ICustomerProfile | null;
  isCustomerProfileLoading?: boolean;
}

const initialState: ICustomerState = {
  customerProfileData: null,
  isCustomerProfileLoading: true,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomerProfileData: (
      state,
      action: PayloadAction<ICustomerState["customerProfileData"]>
    ) => {
      state.customerProfileData = action.payload;
    },
    setIsCustomerProfileLoading: (
      state,
      action: PayloadAction<ICustomerState["isCustomerProfileLoading"]>
    ) => {
      state.isCustomerProfileLoading = action.payload;
    },
  },
});

export const { setCustomerProfileData, setIsCustomerProfileLoading } =
  customerSlice.actions;
export default customerSlice.reducer;

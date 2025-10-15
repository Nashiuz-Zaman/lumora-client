import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IReturnRequestState {
  requestId: string | null;
  isRequestModalOpen: boolean;
}

const initialState: IReturnRequestState = {
  requestId: null,
  isRequestModalOpen: false,
};

const returnRequestSlice = createSlice({
  name: "returnRequest",
  initialState,
  reducers: {
    setRequestId: (
      state,
      action: PayloadAction<IReturnRequestState["requestId"]>
    ) => {
      state.requestId = action.payload;
    },
    setIsRequestModalOpen: (
      state,
      action: PayloadAction<IReturnRequestState["isRequestModalOpen"]>
    ) => {
      state.isRequestModalOpen = action.payload;
    },
  },
});

export const { setRequestId, setIsRequestModalOpen } =
  returnRequestSlice.actions;

export default returnRequestSlice.reducer;

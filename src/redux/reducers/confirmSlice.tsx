import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ConfirmResponse } from "../../types/Confirm.type";

interface ConfirmSliceState {
  confirm: ConfirmResponse | null;
}

const initialState: ConfirmSliceState = {
  confirm: null,
};

const confirmSlice = createSlice({
  name: "confirm",
  initialState: initialState,
  reducers: {
    storeConfirm: (state, action: PayloadAction<ConfirmResponse>) => {
      state.confirm = action.payload;
    },
  },
});

export default confirmSlice.reducer;
export const { storeConfirm } = confirmSlice.actions;

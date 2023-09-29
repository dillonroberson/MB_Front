import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Bank } from "../../types/Bank.type";

export interface BankSliceState {
  banks: Bank[];
}

const initialState: BankSliceState = {
  banks: [],
};

const bankSlice = createSlice({
  name: "bank",
  initialState: initialState,
  reducers: {
    getAll: (state, action: PayloadAction<Bank[]>) => {
      state.banks = action.payload;
    },
  },
});

export default bankSlice.reducer;
export const { getAll } = bankSlice.actions;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  Account,
  ResponseCheckPIN,
  ResponseFindReceiver,
  ResponseRegisterPIN,
} from "../../types/Account.type";

export type AccountSliceState = {
  responseFindReceiver: ResponseFindReceiver | null;
  responseRegisterPIN: ResponseRegisterPIN | null;
  account: Account | null;
  responseCheckPIN: ResponseCheckPIN | null;
};

const initialState: AccountSliceState = {
  responseFindReceiver: null,
  responseRegisterPIN: null,
  account: null,
  responseCheckPIN: null
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    getResponseFindReceiver: (
      state,
      action: PayloadAction<ResponseFindReceiver>
    ) => {
      state.responseFindReceiver = action.payload;
    },
    resetResponseFindReceiver: (state) => {
      state.responseFindReceiver = null;
    },
    getResponseRegisterPIN: (
      state,
      action: PayloadAction<ResponseRegisterPIN>
    ) => {
      state.responseRegisterPIN = action.payload;
    },
    resetResponseRegisterPIN: (state) => {
      state.responseRegisterPIN = null;
    },
    getByUserId: (state, action: PayloadAction<Account>) => {
      state.account = action.payload;
    },
    getResponseCheckPIN: (state, action: PayloadAction<ResponseCheckPIN>) => {
      state.responseCheckPIN = action.payload;
    }
  },
});

export default accountSlice.reducer;
export const {
  getResponseFindReceiver,
  resetResponseFindReceiver,
  getResponseRegisterPIN,
  resetResponseRegisterPIN,
  getByUserId,
  getResponseCheckPIN
} = accountSlice.actions;

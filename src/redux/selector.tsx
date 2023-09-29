import { RootState } from "./store";

export const userSelector = (state: RootState) => state.user;
export const bankSelector = (state: RootState) => state.bank;
export const accountSelector = (state: RootState) => state.account;
export const confirmSelector = (state: RootState) => state.confirm;
export const invoiceSelector = (state: RootState) => state.invoice;
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Invoice, InvoiceResponse, TransactionResponse } from "../../types/Invoice.type";

export type InvoiceSliceState = {
  transactionResponse: TransactionResponse | null;
  invoice: Invoice | null;
  invoices: Invoice [];
  invoiceResponse: InvoiceResponse | null;
  selectedInvoice: Invoice | null;
};

const initialState: InvoiceSliceState = {
  transactionResponse: null,
  invoice: null,
  invoices: [],
  invoiceResponse: null,
  selectedInvoice: null
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: initialState,
  reducers: {
    getTransactionResponse: (
      state,
      action: PayloadAction<TransactionResponse>
    ) => {
      state.transactionResponse = action.payload;
    },
    resetTransactionResponse: (state) => {
      state.transactionResponse = null;
    },
    storeInvoice: (state, action: PayloadAction<Invoice>) => {
      state.invoice = action.payload;
    },
    getInvoicesBySender: (state, action: PayloadAction<Invoice[]>) => {
      state.invoices = action.payload
    },
    getInvoiceResponse: (state, action: PayloadAction<InvoiceResponse>) => {
      state.invoiceResponse = action.payload
    },
    storeSelectedInvoice: (state, action: PayloadAction<Invoice>) => {
      state.selectedInvoice = action.payload
    }
  },
});

export default invoiceSlice.reducer;
export const {
  getTransactionResponse,
  resetTransactionResponse,
  storeInvoice,
  getInvoicesBySender,
  getInvoiceResponse,
  storeSelectedInvoice
} = invoiceSlice.actions;

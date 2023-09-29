import { ThunkAction } from "redux-thunk";
import { Transaction } from "../types/Account.type";
import { AnyAction, Dispatch } from "redux";
import {
  DO_TRANSACTION,
  FIND_INVOICES_BY_SENDER_ID,
  UPDATE,
} from "../api/services/invoiceService";
import {
  InvoiceSliceState,
  getInvoiceResponse,
  getInvoicesBySender,
  getTransactionResponse,
} from "../redux/reducers/invoiceSlice";
import { InvoiceRequestUpdate } from "../types/Invoice.type";

export const doTransaction = (
  transaction: Transaction
): ThunkAction<
  Promise<void>,
  { invoice: InvoiceSliceState },
  undefined,
  AnyAction
> => {
  return async function doTransactionThunk(dispatch: Dispatch) {
    await DO_TRANSACTION(transaction)
      .then((res) => dispatch(getTransactionResponse(res)))
      .catch((err) => dispatch(getTransactionResponse(err.response.data)));
  };
};

export const findInvoiceByAccount = (
  accountId: number
): ThunkAction<
  Promise<void>,
  { invoice: InvoiceSliceState },
  undefined,
  AnyAction
> => {
  return async function findInvoiceByAccountThunk(dispatch: Dispatch) {
    await FIND_INVOICES_BY_SENDER_ID(accountId)
      .then((res) => dispatch(getInvoicesBySender(res)))
      .catch((err) => console.log(err));
  };
};

export const updateInvoice = (data: InvoiceRequestUpdate): ThunkAction<
Promise<void>,
{ invoice: InvoiceSliceState },
undefined,
AnyAction
> => {
  return async function updateInvoiceThunk(dispatch: Dispatch) {
    await UPDATE(data)
      .then((res) => {
        dispatch(getInvoiceResponse(res))
        
      })
      .catch((err) => dispatch(getInvoiceResponse(err.response.data)));
  };
}

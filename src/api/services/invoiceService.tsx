import instance from ".."
import { Transaction } from "../../types/Account.type"
import { InvoiceRequestUpdate } from "../../types/Invoice.type";

export const DO_TRANSACTION = async (data: Transaction) => {
  let response = await instance.patch('/invoices/do-transaction', data);
  return response.data;
}

export const FIND_INVOICES_BY_SENDER_ID = async (senderId: number) => {
  let response = await instance.get('/invoices/account?accountId=' + senderId)
  return response.data;
}

export const UPDATE = async (data: InvoiceRequestUpdate) => {
  let response = await instance.patch(`/invoices/${data.id}`, {message: data.message, timestamp: data.time, amount: data.amount, remain: data.remain})
  window.console.log(response);
  return response.data;
}
import { Account } from "./Account.type";

export type Invoice = {
  id: number;
  senderAcc: Account;
  receiverAcc: Account;
  message: string;
  amount: string;
  timeStamp: number;
  transactionCode: string;
  remainSendAcc: string;
  remainReceiveAcc: string;
}

export type TransactionResponse = {
  status: string;
  message: string;
  data: Invoice
}

export type InvoiceRequestUpdate = {
  id: number;
  message: string;
  time: number;
  amount: string;
}

export type InvoiceResponse = {
  status: string;
  message: string;
  data: Invoice
}
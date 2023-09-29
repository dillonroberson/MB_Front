import { Bank } from "./Bank.type";
import { ConfirmResponse } from "./Confirm.type";
import { User } from "./User.type";

export type Account = {
  id: number;
  number: string;
  PIN: string;
  balance: number;
  user?: User
  bank?: Bank
}

export type ResponseFindReceiver = {
  status: string;
  message: string;
  data: ConfirmResponse
}

export type Transaction = {
  senderAccId: number;
  receiverAccId: number;
  message: string;
  amount: string;
  pin: string;
};

export type ResponseRegisterPIN = {
  status: string;
  message: string;
  data: ConfirmResponse
}

export type CheckPin = {
  senderAccId: number;
  pin: string;
}

export type ResponseCheckPIN = {
  status: string;
  message: string;
}
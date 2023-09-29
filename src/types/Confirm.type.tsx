import { Account } from "./Account.type"

export type ConfirmResponse = {
  receiverAcc: Account;
  message: string;
  amount: number;
  senderAcc: Account;
}
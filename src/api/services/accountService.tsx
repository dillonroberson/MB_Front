import instance from "..";
import { FormExchange } from "../../screens/Exchange";
import { CheckPin } from "../../types/Account.type";
import { RegisterPIN } from "../../types/User.type";

export const FIND_RECEIVER = async (data: FormExchange) => {
  let response = await instance.post('/accounts/pre-exchange', data);
  return response.data;
}

export const REGISTER_PIN = async (data: RegisterPIN) => {
  let response = await instance.patch('/accounts/' + data.userId, {pin: data.pin})
  return response.data;
}

export const FIND_BY_USER = async (userId: number) => {
  let response = await instance.get('/accounts/userId?userId='+ userId)
  return response.data;
}

export const CHECK_PIN = async (data: CheckPin) => {
  let response = await instance.patch('/accounts/check-pin', data)
  return response.data;
}

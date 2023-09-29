import { AnyAction, Dispatch } from "redux";
import {
  AccountSliceState,
  getByUserId,
  getResponseCheckPIN,
  getResponseFindReceiver,
  getResponseRegisterPIN,
} from "../redux/reducers/accountSlice";
import { FormExchange } from "../screens/Exchange";
import { ThunkAction } from "redux-thunk";
import {
  CHECK_PIN,
  FIND_BY_USER,
  FIND_RECEIVER,
  REGISTER_PIN,
} from "../api/services/accountService";
import { RegisterPIN } from "../types/User.type";
import { CheckPin } from "../types/Account.type";

export const findReceiver = (
  data: FormExchange
): ThunkAction<
  Promise<void>,
  { account: AccountSliceState },
  undefined,
  AnyAction
> => {
  return async function findReceiverThunk(dispatch: Dispatch) {
    await FIND_RECEIVER(data)
      .then((res) => dispatch(getResponseFindReceiver(res)))
      .catch((err) => dispatch(getResponseFindReceiver(err.response.data)));
  };
};

export const registerPIN = (
  data: RegisterPIN
): ThunkAction<
  Promise<void>,
  { account: AccountSliceState },
  undefined,
  AnyAction
> => {
  return async function registerPINThunk(dispatch: Dispatch) {
    await REGISTER_PIN(data)
      .then((res) => dispatch(getResponseRegisterPIN(res)))
      .catch((err) => dispatch(getResponseRegisterPIN(err.response.data)));
  };
};

export const findByUserId = (
  userId: number
): ThunkAction<
  Promise<void>,
  { account: AccountSliceState },
  undefined,
  AnyAction
> => {
  return async function findByUserIdPINThunk(dispatch: Dispatch) {
    await FIND_BY_USER(userId)
      .then((res) => dispatch(getByUserId(res)))
      .catch((err) => dispatch(getByUserId(err.response.data)));
  };
};

export const checkPin = (
  data: CheckPin
): ThunkAction<
  Promise<void>,
  { account: AccountSliceState },
  undefined,
  AnyAction
> => {
  return async function checkPinThunk(dispatch: Dispatch) {
    await CHECK_PIN(data)
      .then((res) => dispatch(getResponseCheckPIN(res)))
      .catch((err) => dispatch(getResponseCheckPIN(err.response.data)));
  };
};

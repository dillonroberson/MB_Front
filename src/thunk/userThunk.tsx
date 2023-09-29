import { AnyAction, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RegisterPIN, UserLoginForm, UserRegisterForm } from "../types/User.type";
import { FIND_BY_ID, LOGIN, REGISTER } from "../api/services/userService";
import {
  UserSliceState,
  getRegisterResponse,
  getLoginResponse,
  getById,
} from "../redux/reducers/userSlice";

export const register = (
  user: UserRegisterForm
): ThunkAction<
  Promise<void>,
  { user: UserSliceState },
  undefined,
  AnyAction
> => {
  return async function registerThunk(dispatch: Dispatch) {
    await REGISTER(user)
      .then((res) => {
        console.log('thunk ---->', res);
        dispatch(getRegisterResponse(res))
      })
      .catch((err) => console.log(err));
  };
};

export const login = (
  user: UserLoginForm
): ThunkAction<
  Promise<void>,
  { user: UserSliceState },
  undefined,
  AnyAction
> => {
  return async function loginThunk(dispatch: Dispatch) {
    await LOGIN(user)
      .then((res) => dispatch(getLoginResponse(res)))
      .catch((err) => console.log(err));
  };
};

export const findById = (id: number): ThunkAction<
Promise<void>,
{ user: UserSliceState },
undefined,
AnyAction
> => {
  return async function findByIdThunk(dispatch: Dispatch) {
    await FIND_BY_ID(id)
      .then((res) => dispatch(getById(res)))
      .catch((err) => console.log(err));
  };
}



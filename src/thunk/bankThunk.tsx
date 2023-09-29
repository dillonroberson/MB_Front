import { ThunkAction } from "redux-thunk";
import { BankSliceState, getAll } from "../redux/reducers/bankSlice";
import { AnyAction, Dispatch } from "redux";
import { FIND_ALL } from "../api/services/bankService";

export const findAll = (
): ThunkAction<
  Promise<void>,
  { bank: BankSliceState },
  undefined,
  AnyAction
> => {
  return async function loginThunk(dispatch: Dispatch) {
    await FIND_ALL()
      .then((res) => dispatch(getAll(res)))
      .catch((err) => console.log(err));
  };
};
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoginResonse, RegisterResponse, User } from "../../types/User.type";

export type UserSliceState = {
  registerResponse: RegisterResponse | null;
  loginResponse: LoginResonse | null;
  user: User | null;
};

const initialState: UserSliceState = {
  registerResponse: null,
  loginResponse: null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    getRegisterResponse: (state, action: PayloadAction<RegisterResponse>) => {
      state.registerResponse = action.payload;
    },
    resetRegister: (state) => {
      state.registerResponse = null;
    },
    getLoginResponse: (state, action: PayloadAction<LoginResonse>) => {
      state.loginResponse = action.payload;
    },
    resetLogin: (state) => {
      state.loginResponse = null;
    },
    getById: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
export const {
  getRegisterResponse,
  resetRegister,
  getLoginResponse,
  resetLogin,
  getById,
} = userSlice.actions;

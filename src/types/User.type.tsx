import { Account } from "./Account.type";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: number;
  PIN: number;
  accounts?: Account[]; 
}

export type UserRegisterForm = Omit<User, 'id' | 'PIN'>;
export type UserLoginForm = Pick<User, 'phone' | 'password'>

export type LoginResonse = {
  status: string;
  expiredTime: number;
  type: string;
  token: string;
  user: User;
}

export type RegisterResponse = {
  status: string;
  user: User;
  message: string;
}

export type RegisterPIN = {
  userId: number;
  pin: string;
}
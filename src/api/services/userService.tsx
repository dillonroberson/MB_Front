import instance from ".."
import { RegisterPIN, UserLoginForm, UserRegisterForm } from "../../types/User.type";

export const REGISTER = async (data: UserRegisterForm) => {
  let response = await instance.post('/auth/register', data)
  return response.data;
}

export const LOGIN = async (data: UserLoginForm) => {
  let response = await instance.post('/auth/login', {username: data.phone, password: data.password})
  return response.data;
}

export const FIND_BY_ID = async (id: number) => {
  let response = await instance.get('/users/' + id)
  return response.data;
}


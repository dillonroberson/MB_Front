import axios from "axios";
import { API_URL } from "@env";
console.log(API_URL);

const instance = axios.create(
  {
    baseURL: API_URL
  }
)

export default instance;
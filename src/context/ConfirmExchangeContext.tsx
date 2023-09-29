import { createContext } from "react";
import { ConfirmExchangeProps } from "../screens/ConfirmExchange";

export const ConfirmExchangeContext = createContext<ConfirmExchangeProps | null>(null);
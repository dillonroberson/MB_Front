import { createContext } from "react";
import { MainProps } from "../screens/Main";
import { BillProps } from "../screens/Bill";

export const BillContext = createContext<BillProps | null>(null);
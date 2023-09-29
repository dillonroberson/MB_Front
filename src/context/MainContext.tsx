import { createContext } from "react";
import { MainProps } from "../screens/Main";

export const MainContext = createContext<MainProps | null>(null);
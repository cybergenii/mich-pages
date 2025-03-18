import { Dispatch, createContext } from "react";
import { IAction, InitialStateI } from "../../interface/interface.form";

export interface useContextI {
  state: InitialStateI;
  dispatch: Dispatch<IAction>;
}
export const FormContext = createContext<useContextI | undefined>(undefined);
export type AppDispatch = Dispatch<IAction>;

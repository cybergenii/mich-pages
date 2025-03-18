/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAction, InitialStateI } from "../../interface/interface.form";
import { ActionFormTypesE } from "./state-actions";


export const FormReducer=(state:InitialStateI, action:IAction):InitialStateI => {


    switch (action.type) {
      case ActionFormTypesE.SET_KEY_VALUE: {
        const payload = action.payload;
        return {
          ...state,
          ...Object.keys(payload).reduce((acc, key) => {
            acc[key] = {
              ...state[key],
              ...payload[key],
            };
            return acc;
          }, {} as any),
        };
      }
      case ActionFormTypesE.DELETE_FORM_KEYS: {
        const payload: string[] = action.payload;

        payload.forEach((name) => {
          if (state[name]) delete state[name];
        });
        return state;
      }
    }

}
import { useReducer } from "react";
import { FormContext, useContextI } from "../../state-manager/form/context";
import { FormReducer } from "../../state-manager/form/reducer";
import { initialState } from "../../state-manager/form/state";


// Create a custom hook for using the context

// You can also define a helper function to create the provider
export const FormContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, useAppDispatch] = useReducer(FormReducer, initialState);

  const contextValue: useContextI = {
    state,
 dispatch: useAppDispatch,
  };

  return (
    <FormContext.Provider value={contextValue}>
      {children}
    </FormContext.Provider>
  );
};

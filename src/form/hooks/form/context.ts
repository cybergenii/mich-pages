import { useContext } from "react";
import { FormContext } from "../../state-manager/form/context";


export const useTableContext = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("useYourContext must be used within a YourContextProvider");
  }
  return context;
};

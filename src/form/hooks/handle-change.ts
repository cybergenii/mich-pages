import { AppDispatch } from "../state-manager/form/context";
import { ActionFormTypesE } from "../state-manager/form/state-actions";

export function handleFormChange({
  event,
  dispatch,
}: {
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  dispatch: AppDispatch;
}) {
  if (event.target.name) {
    if (event.target.type === "file") {
      // ((event.target as HTMLInputElement) &&
      //   (event.target as HTMLInputElement).files &&
      //   (event.target as HTMLInputElement)!.files![0]) ??
      //   "",

      dispatch(
     {
         type:ActionFormTypesE.SET_KEY_VALUE,
          payload:{
          [event.target.name]: {
            value: event.target.value,

            isValid: true,
            showMessage: false,
            errorMessage: "",
            showPassword: false,
            validMessage: "",
          },
        }}
      );
    } else {
  
      dispatch(
      
        {
        
           type:ActionFormTypesE.SET_KEY_VALUE,
         payload:{
          [event.target.name]: {
            value: event.target.value,
            isValid: true,
            showMessage: false,
            errorMessage: "",
            showPassword: false,
            validMessage: "",
          },
        }}
      );
    }
  }
}

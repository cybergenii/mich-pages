import { InitialStateI } from "../interface/interface.form";
import { AppDispatch } from "../state-manager/form/context";
import { ActionFormTypesE } from "../state-manager/form/state-actions";


/**
 * The function `validateFormKeys` iterates through key-value pairs, validates the form fields, and
 * dispatches error messages if necessary.
 * @param {KeyFieldsI} keys - The `keys` parameter in the `validateFormKeys` function is an object that
 * contains key-value pairs representing form fields. Each key is a field name, and each value is an
 * object with properties like `value`, `isValid`, etc. The function iterates over these key-value
 * pairs to validate
 * @param {AppDispatch} dispatch - The `dispatch` parameter in the `validateFormKeys` function is a
 * function that is used to dispatch actions to the Redux store. It is typically provided by the
 * `useDispatch` hook in a React component and is used to update the state in the Redux store by
 * dispatching actions.
 * @returns The function `validateFormKeys` returns a boolean value, either `true` or `false`, based on
 * the validation logic performed on the keys provided as input.
 */
export function validateFormKeys(
  keys: InitialStateI,
  dispatch: AppDispatch
): boolean {
  let it = true;

  Object.entries(keys).forEach((key) => {
    const [name, value] = key;
    // //console.log(name, value);

    const fieldName = name
      ? name.split("form")[1].split("-").join(" ").trim()
      : "";
    if (value === undefined) {
      dispatch(
        {   type:ActionFormTypesE.SET_KEY_VALUE,
          payload:{
          [name]: {
            errorMessage: `${fieldName} field is required`,
            isValid: false,
            showMessage: true,
          },
        }}
      );
      it = false;
    } else if (value.value === "" || !value.isValid) {
    
      
      dispatch(
      {
           type:ActionFormTypesE.SET_KEY_VALUE,
          payload:{
          [name]: {
            errorMessage:
              value && value.value
                ? `sorry chief seems like  ${value.value}\n is not a valid ${fieldName}`
                : `${fieldName} field is required`,
            isValid: false,
            showMessage: true,
          },
        }}
      );
      setTimeout(() => { 
   dispatch(
 {
     type:ActionFormTypesE.SET_KEY_VALUE,
      payload:{
       [name]: {
         
         showMessage: false,
       },
     }}
   );
      },2000)
      it = false;
    } else {
   
      dispatch(
        {
             type:ActionFormTypesE.SET_KEY_VALUE,
          payload:{
          [name]: {
            errorMessage: "",
            isValid: true,

            showMessage: false,
          },
        }}
      );
      it = true;
    }
  });
  return it;
}

// validate([password, email])

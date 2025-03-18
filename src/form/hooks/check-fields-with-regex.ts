import { InitialStateI } from "../interface/interface.form";
import { AppDispatch } from "../state-manager/form/context";
import { ActionFormTypesE } from "../state-manager/form/state-actions";

export function regexCheckFormFields({
  event,
  dispatch,
  check,
}: {
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  dispatch: AppDispatch;
  selector?: InitialStateI;
  check?:
    | {
        regex: RegExp;
        message?: string;
      }
    | {
        regex: RegExp;
        message?: string;
      }[];
}) {
  if (event.target.name) {
    const fieldName = event.target.name
      ? event.target.name?.split("form")[1].split("-").join(" ").trim()
      : "";

    if (check) {
      if (Array.isArray(check)) {
        check.forEach((ch) => {
          if (
            event.target.value &&
            !event.currentTarget.value.match(ch.regex)
          ) {
            dispatch({

                 type:ActionFormTypesE.SET_KEY_VALUE,
            payload:{
                [event.target.name]: {
                  errorMessage:
                    ch.message ??
                    "sorry chief seems like  " +
                      event.target?.value +
                      "\n" +
                      " is not a valid " +
                      fieldName,
                  isValid: false,
                  showMessage: true,
                },
              }}
            );
          } else if (
            event.target.value &&
            ch.regex.test(event.currentTarget.value)
          ) {
            dispatch(
              {
                type:ActionFormTypesE.SET_KEY_VALUE,
                payload: {
                  [event.target.name]: {
                  errorMessage: "",
                  isValid: true,
                  validMessage: "keep going chief nice job so far",
                  showMessage: true,
                }},
              }
            );
            setTimeout(() => {
              dispatch(
                {type:ActionFormTypesE.SET_KEY_VALUE,
                  payload:
               { [event.target.name]: { showMessage: false } }
                }
              );
            }, 2000);
          } else {
            dispatch(
              { type:ActionFormTypesE.SET_KEY_VALUE,
              payload:{
                [event.target.name]: {
                  showMessage: false,
                },
              }}
            );
          }
        });
      } else {
        if (
          event.target.value &&
          String(event.target.value) &&
          !check.regex.test(event.currentTarget.value)
        ) {
          dispatch(
           {type:ActionFormTypesE.SET_KEY_VALUE,
            payload:{
              [event.target.name]: {
                errorMessage:
                  check.message ??
                  "sorry chief seems like  " +
                    event.target?.value +
                    "\n" +
                    " is not a valid " +
                    fieldName,
                isValid: false,
                showMessage: true,
              },
            }}
          );
        } else if (
          event.target.value &&
          String(event.target.value).length > 2 &&
          check.regex.test(event.currentTarget.value)
        ) {
          dispatch({
            type:ActionFormTypesE.SET_KEY_VALUE,
            payload:
          {
              [event.target.name]: {
                errorMessage: "",
                isValid: true,
                validMessage: "keep going chief nice job so far",
                showMessage: true,
              },
            }}
          );
          setTimeout(() => {
            dispatch(
 
                
                
                
                
              {
                type:ActionFormTypesE.SET_KEY_VALUE,
                 payload: { [event.target.name]: { showMessage: false } }
              }
              
            );
          }, 2000);
        } else {
          dispatch(
            {
            
               type:ActionFormTypesE.SET_KEY_VALUE,
              payload:{
              [event.target.name]: {
                showMessage: false,
              },
            }}
          );
        }
      }
    }
    if (event.target.required && !event.target.value) {
      dispatch({
           type:ActionFormTypesE.SET_KEY_VALUE,
        payload:{
          [event.target.name]: {
            errorMessage: `${fieldName} field is required`,
            isValid: false,
            showMessage: true,
          },
        }}
      );
    }
  }

  // event.preventDefault();
  // alert(message);
}

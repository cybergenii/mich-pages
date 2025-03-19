import { InitialStateI } from "../interface/interface.form";
import { AppDispatch } from "../state-manager/form/context";
import { ActionFormTypesE } from "../state-manager/form/state-actions";

/**
 * Validates form field input against regex patterns and dispatches appropriate actions
 * @param event - The input change event
 * @param dispatch - The dispatch function from context
 * @param check - Single or array of regex validation rules
 */
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
  if (!event.target.name) return;

  // Extract field name from the input name attribute
  const fieldName = event.target.name
    ? event.target.name?.split("form")[1].split("-").join(" ").trim()
    : "";

  // Handle validation rules
  if (check) {
    if (Array.isArray(check)) {
      handleMultipleChecks(event, dispatch, check, fieldName);
    } else {
      handleSingleCheck(event, dispatch, check, fieldName);
    }
  }

  // Handle required field validation
  if (event.target.required && !event.target.value) {
    dispatch({
      type: ActionFormTypesE.SET_KEY_VALUE,
      payload: {
        [event.target.name]: {
          errorMessage: `${fieldName} field is required`,
          isValid: false,
          showMessage: true,
        },
      },
    });
  }
}

/**
 * Handles validation with multiple regex checks
 * All checks must pass before showing validation success
 */
function handleMultipleChecks(
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  dispatch: AppDispatch,
  checks: { regex: RegExp; message?: string }[],
  fieldName: string
) {
  console.log({ handleMultipleChecks });

  // Skip validation if there's no value
  if (!event.target.value) {
    hideValidationMessage(event, dispatch);
    return;
  }

  // Check if any validation fails
  for (const check of checks) {
    if (!check.regex.test(event.currentTarget.value)) {
      dispatch({
        type: ActionFormTypesE.SET_KEY_VALUE,
        payload: {
          [event.target.name]: {
            errorMessage:
              check.message ??
              `Invalid ${fieldName}: "${event.target?.value}" does not match the required format`,
            isValid: false,
            showMessage: true,
          },
        },
      });
      return; // Exit early on first failure
    }
  }

  // If we reach here, all checks have passed
  showValidationSuccess(event, dispatch);
}

/**
 * Handles validation with a single regex check
 */
function handleSingleCheck(
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  dispatch: AppDispatch,
  check: { regex: RegExp; message?: string },
  fieldName: string
) {
  console.log({
    event,
    dispatch,
    check,
    fieldName,
  });

  if (
    event.target.value &&
    String(event.target.value) &&
    !check.regex.test(event.currentTarget.value)
  ) {
    dispatch({
      type: ActionFormTypesE.SET_KEY_VALUE,
      payload: {
        [event.target.name]: {
          errorMessage:
            check.message ??
            `Invalid ${fieldName}: "${event.target?.value}" does not match the required format`,
          isValid: false,
          showMessage: true,
        },
      },
    });
  } else if (
    event.target.value &&
    String(event.target.value).length > 2 &&
    check.regex.test(event.currentTarget.value)
  ) {
    showValidationSuccess(event, dispatch);
  } else {
    hideValidationMessage(event, dispatch);
  }
}

/**
 * Shows validation success message and hides it after a delay
 */
function showValidationSuccess(
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  dispatch: AppDispatch
) {
  dispatch({
    type: ActionFormTypesE.SET_KEY_VALUE,
    payload: {
      [event.target.name]: {
        errorMessage: "",
        isValid: true,
        validMessage: "Validation successful",
        showMessage: true,
      },
    },
  });

  setTimeout(() => {
    dispatch({
      type: ActionFormTypesE.SET_KEY_VALUE,
      payload: {
        [event.target.name]: {
          showMessage: false,
        },
      },
    });
  }, 2000);
}

/**
 * Hides validation message
 */
function hideValidationMessage(
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  dispatch: AppDispatch
) {
  dispatch({
    type: ActionFormTypesE.SET_KEY_VALUE,
    payload: {
      [event.target.name]: {
        showMessage: false,
      },
    },
  });
}

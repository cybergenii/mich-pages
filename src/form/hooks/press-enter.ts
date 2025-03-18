import React from "react";

export function pressEnterForNextField(
  e: React.KeyboardEvent<HTMLInputElement>,
  nextField: React.RefObject<HTMLInputElement>
) {
  switch (e.key) {
    case "Tab":
      e.preventDefault();
      break;
    case "Enter": {
      e.preventDefault();
      nextField.current!.focus();
      break;
    }
    case "ArrowRight": {
      e.preventDefault();
      nextField.current!.focus();
      break;
    }
    case "ArrowUp": {
      e.preventDefault();
      nextField.current!.focus();
      break;
    }
  }
}
export function pressBackSpaceForPreviousField(
  e: React.KeyboardEvent<HTMLInputElement>,
  previousField: React.RefObject<HTMLInputElement>
) {
  switch (e.key) {
    case "Tab":
      e.preventDefault();
      break;
    case "Backspace": {
      e.preventDefault();
      previousField.current!.focus();
      break;
    }
  }
}

export function pressArrowLeftForPreviousField(
  e: React.KeyboardEvent<HTMLInputElement>,
  previousField: React.RefObject<HTMLInputElement>
) {
  switch (e.key) {
    case "Tab":
      e.preventDefault();
      break;
    case "ArrowLeft": {
      e.preventDefault();
      previousField.current!.focus();
      break;
    }
  }
}

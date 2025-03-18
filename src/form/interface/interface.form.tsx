/* eslint-disable @typescript-eslint/no-explicit-any */
export interface InitialStateI {
  [key: string]: {
    value?: any;
    errorMessage?: string;
    validMessage?: string;
    isValid?: boolean;
    showMessage?: boolean;
    showPassword?: boolean;
  };
}

export interface IAction {
  type: ActionFormTypesE;
  payload: any;
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ActionFormTypesE } from "../state-manager/form/state-actions";

export interface InputTypeI {
  imageUrl?: string;

  type:
    | "text"
    | "password"
    | "checkbox"
    | "radio"
    | "submit"
    | "reset"
    | "button"
    | "file"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "month"
    | "number"
    | "range"
    | "search"
    | "tel"
    | "time"
    | "url"
    | "week";

  name?: string;
  placeholder?: string;
  value?: string | number | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop?: (event: React.DragEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  ref?: React.RefObject<HTMLInputElement>;
  id?: string;
  required?: boolean;
  pattern?: string;
  minlength?: number;
  maxlength?: number;
  disabled?: boolean;
  readonly?: boolean;
  autofocus?: boolean;
  autocomplete?: string;
  classN?: string;
  form?: string;
  
  checked?: boolean;
  min?: number;
  max?: number;
  step?: number;
  accept?: string;
  multiple?: boolean;
  label?: string;
  
  
}

export interface InputI {
  inputType: InputTypeI;
  label: string;

  err?: boolean;
  helper?: string;
  showHelper?: boolean;
  showExtraInfo?: boolean;
  extraInfo?: string;
  extraInfoIcon?: any;
  prefix?: {
    element?: any;
    click?: () => void;
  };
  suffix?: {
    element: any;
    click?: () => void;
  };
}

export interface SelectI extends Omit<InputI, "inputType" | "suffix"> {
  kv: { [key: string]: { value: any; description: string } };
  placeholder: string;
  inputType: Pick<
    InputTypeI,
    | "value"
    | "disabled"
    | "name"
    | "required"
    | "multiple"
    | "form"
    | "autocomplete"
  > & {
    size?: number;
    className: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  };
}

export interface SelectTwoI extends Omit<InputI, "inputType" | "suffix"> {
  kv: { [key: string]: { value: any; description: string } };
  placeholder: string;
  inputType: Pick<
    InputTypeI,
    | "value"
    | "disabled"
    | "name"
    | "required"
    | "multiple"
    | "form"
    | "autocomplete"
  > & {
    size?: number;
    className: string;
    onChange?: ({
      key,
      value,
    }: {
      key: string;
      value: { value: any; description: string };
    }) => void;
  };
}
export interface SelectThreeI extends Omit<InputI, "inputType" | "suffix"> {
  kv: { [key: string]: { value: any; description: string } };
  placeholder: string;
  inputType: Pick<
    InputTypeI,
    | "value"
    | "disabled"
    | "name"
    | "required"
    | "multiple"
    | "form"
    | "autocomplete"
  > & {
    size?: number;
    className: string;
    onChange?: ({ key, value }: { key: string; value: any }) => void;
  };
}

export interface FileInputI extends Omit<InputI, "inputType" | "suffix"> {
  placeholder: string;
  inputType: Pick<
    InputTypeI,
    | "value"
    | "disabled"
    | "accept"
    | "name"
    | "required"
    | "multiple"
    | "form"
    | "autocomplete"
  > & {
    className: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
}



export interface PageHeadingI {
  key: string;
  name: string;
  category: string;

  formType:
    | InputTypeI["type"]
    | "select"
    | "select2"
    | "select3"
    | "image"
    | "obj"
    | "toggle"
    | "textarea2"
    | "textarea1"
    | "array"
    | "rawHtml";
  placeholder?: string;

  unique?: boolean;
  prefixIcons?: any;
  suffixIcons?: any;
  disabled?: boolean;
  required?: boolean;

  show?: boolean;
  useRegex?: boolean;

  keyValue?: {
    [key: string]: {
      value: any;
      description: string;
    };
  };
  isKeyValueChild?: boolean;
  child?: PageHeadingI[];

  filter?: {
    childKey: string;
    childValue: string;
    childDescription?: string;

    linkToChildKey: string;
    data: Record<string, any>[];
    parentFilterKey?: string;
    arrKey: string;
  };
}

export interface PageCategoriesI {
  name: string;
  key: string;
}

export interface PageI {
    type: "CREATE" | "UPDATE" | "VIEW";
    style:{
        primary?: string
        secondary?: string
        tertiary?:string
    },

  delete?: {
    delete: (id: string) => void;
    deleteStatus: "error" | "loading" | "success" | "none";
    errorMessage?: any;

    deleteMetaData: string[];
  };
  create?: {
    create: (
      data: any
    ) => Promise<"isLoading" | "isSuccess" | "isError" | "none">;
    createStatus: "error" | "loading" | "success" | "none";
    errorMessage?: any;
  };
  update?: {
    updateStatus?: "error" | "loading" | "success" | "none";
    errorMessage?: any;
    update?: (
      id: any
    ) => Promise<"isLoading" | "isSuccess" | "isError" | "none">;
    updateRoute?: string;
  };
  buttonName?: string;
  showButton?: {
    deleteButton?: boolean;
    updateButton?: boolean;
    createButton?: boolean;
    any?: boolean;
  };
  showHeading?: boolean;
  name: string;
  extraInfo?: string;
  icon?: any;
  categories: PageCategoriesI[];
  headings: PageHeadingI[];
  data: Record<string, any>;
  id: string;
}

export type PageFormT = Pick<
  PageI,
  "name" | "headings" | "categories" | "type" | "data"
>;

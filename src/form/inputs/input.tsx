/* eslint-disable @typescript-eslint/no-unused-vars */
import { AlertCircle, Check, Edit3, Info, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { InputI, InputTypeI } from "../interface/interface.form";


// Utility function to merge CSS classes
const mergeCssClass = (...classes: string[]): string => {
  return classes.filter(Boolean).join(" ");
};

export function Input({ props }: { props: InputI }) {
  const [imageUrl, setImageUrl] = useState<string>(
    "https://fakeimg.pl/600x400"
  );
  const [focus, setFocus] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (props.inputType.imageUrl && props.inputType.imageUrl !== "") {
      setImageUrl(props.inputType.imageUrl);
    }
  }, [props.inputType.imageUrl]);

  // Event handlers
  const handleFocus = (f: boolean) => setFocus(f);
  const handleHover = (f: boolean) => setHover(f);
  const handleDragEnter = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setDragging(false);
  };
  const handleDragOver = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setDragging(true);
  };

  // Extract props
  const {
    type = "text",
    placeholder,
    value,
    onChange,
    name,
    id,
    classN,
    required = false,
    pattern,
    minlength,
    maxlength,
    disabled,
    readonly,
    autofocus,
    autocomplete,
    form,
  
    min,
    max,
    step,
    accept,
    checked,
    multiple = false,
    label,
    
  } = props.inputType;

  // Filter out undefined props
  const filterInputProps = (obj: InputTypeI): Partial<InputTypeI> => {
    return Object.fromEntries(
      Object.entries(obj).filter(([_key, value]) => value !== undefined)
    );
  };

  const theProps: Omit<Partial<InputTypeI>, "onDrop"> = filterInputProps({
    type,
    value,
    onChange,
    name,
    id,
    required,
    pattern,
    minlength,
    maxlength,
    disabled,
    readonly,
    autofocus,
    autocomplete,
    form,
  
    min,
    max,
    placeholder,
    checked,
    step,
    accept,
    multiple,
    label,
  
  });

  // Helper component for validation messages
  const ValidationMessage = () => {
    if (!props.showHelper) return null;

    return (
      <div
        className={`flex items-center mt-1 text-xs ${
          props.err ? "text-red-600" : "text-emerald-600"
        }`}
      >
        {props.err ? (
          <X size={14} className="mr-1 flex-shrink-0" />
        ) : (
          <Check size={14} className="mr-1 flex-shrink-0" />
        )}
        <span>{props.helper}</span>
      </div>
    );
  };

  // Helper component for extra info
  const ExtraInfo = () => {
    if (!props.showExtraInfo) return null;

    return (
      <div className="flex items-center mt-1 text-xs text-blue-600">
        {props.extraInfoIcon || (
          <Info size={14} className="mr-1 flex-shrink-0" />
        )}
        <span>{props.extraInfo}</span>
      </div>
    );
  };

  // Render different input types
  function InputType(type: string) {
    switch (type) {
      case "email":
      case "password":
      case "number":
      case "text":
      case "date": {
        return (
          <div className="input-wrapper mb-4">
            <div className="mb-1 flex items-center">
              <label
                className={mergeCssClass(
                  "text-sm font-medium",
                  focus ? "text-blue-600" : "",
                  props.err && props.showHelper ? "text-red-600" : "",
                  props.inputType.disabled ? "text-gray-500" : "text-gray-700"
                )}
              >
                {props.label}
                {theProps.required && (
                  <AlertCircle size={12} className="ml-1 inline text-red-500" />
                )}
              </label>
            </div>

            <div className="relative">
              {props.prefix && (
                <div
                  className={mergeCssClass(
                    "absolute inset-y-0 left-0 flex items-center pl-3 ",
                    props.inputType.disabled
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  )}
                >
                  {props.prefix}
                </div>
              )}

              <input
                {...theProps}
                onFocus={() => handleFocus(true)}
                onMouseOver={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
                onBlur={() => handleFocus(false)}
                className={mergeCssClass(
                  "block appearance-none w-full rounded-md border-gray-200 border  py-2.5 px-3 shadow-sm  transition-all duration-200 placeholder:text-gray-400  sm:text-sm",
                  props.prefix ? "pl-10" : "",
                  props.suffix ? "pr-10" : "",
                  props.inputType.disabled
                    ? "bg-gray-100 text-gray-500 ring-gray-300"
                    : "",
                  props.err && props.showHelper
                    ? "ring-red-500 focus:ring-red-500 text-red-900 placeholder-red-300"
                    : "ring-gray-300 focus:ring-blue-500 disabled:text-gray-500 disabled:bg-gray-100 text-gray-900",
                  focus || hover ? "border-blue-500" : "",

                  classN ?? ""
                )}
              />

              {props.suffix && (
                <div
                  className={mergeCssClass(
                    "absolute inset-y-0 right-0 flex items-center pr-3",
                    "cursor-pointer"
                  )}
                >
                  {props.suffix}
                </div>
              )}
            </div>

            <ValidationMessage />
            <ExtraInfo />
          </div>
        );
      }

      case "checkbox": {
        return (
          <div className="checkbox-wrapper mb-4 mt-2">
            <div
              className={mergeCssClass(
                "flex items-center justify-between px-4 py-3 rounded-md border border-gray-300",
                focus || hover ? "border-blue-500" : "",
                props.err && props.showHelper ? "border-red-500" : ""
              )}
            >
              <div className="flex items-center">
                {props.prefix && (
                  <div
                    className={mergeCssClass(
                      "mr-2",
                   
                    )}
                  
                  >
                    {props.prefix}
                  </div>
                )}

                <label className="text-sm font-medium text-gray-700 cursor-pointer">
                  {props.label}
                  {theProps.required && (
                    <AlertCircle
                      size={12}
                      className="ml-1 inline text-red-500"
                    />
                  )}
                </label>
              </div>

              <div className="relative">
                <input
                  {...theProps}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  onFocus={() => handleFocus(true)}
                  onBlur={() => handleFocus(false)}
                  onMouseOver={() => handleHover(true)}
                  onMouseLeave={() => handleHover(false)}
                />
              </div>
            </div>

            <ValidationMessage />
            <ExtraInfo />
          </div>
        );
      }

      case "file": {
        return (
          <div className="file-input-wrapper mb-4">
            <div className="mb-1 flex items-center">
              <label
                className={mergeCssClass(
                  "text-sm font-medium",
                  focus ? "text-blue-600" : "text-gray-700",
                  props.err && props.showHelper ? "text-red-600" : ""
                )}
              >
                {props.label}
                {theProps.required && (
                  <AlertCircle size={12} className="ml-1 inline text-red-500" />
                )}
              </label>
            </div>

            <div
              className={mergeCssClass(
                "mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-all duration-200",
                dragging ? "border-blue-500 bg-blue-50" : "border-gray-300",
                props.err && props.showHelper ? "border-red-300" : "",
                disabled
                  ? "bg-gray-50 cursor-not-allowed"
                  : "hover:border-gray-400"
              )}
              onDrop={props.inputType.onDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onMouseLeave={() => setDragging(false)}
            >
              <div className="space-y-1 text-center">
                <div className="file-upload-preview relative mx-auto w-24 h-24 mb-3">
                  <img
                    src={imageUrl}
                    alt="Upload preview"
                    className="h-full w-full object-cover rounded-md"
                  />
                  <div className="absolute right-0 bottom-0 p-1 bg-white rounded-full shadow">
                    <Edit3 size={16} className="text-blue-600" />
                  </div>
                </div>

                <div className="flex justify-center">
                  <Upload
                    className="mx-auto h-12 w-12 text-gray-400"
                    strokeWidth={1}
                  />
                </div>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor={id || name}
                    className="relative cursor-pointer font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id={id || name}
                      type="file"
                      {...theProps}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  {props.inputType.accept
                    ? `Allowed: ${props.inputType.accept}`
                    : "PNG, JPG, GIF up to 10MB"}
                </p>
              </div>
            </div>

            <ValidationMessage />
            <ExtraInfo />
          </div>
        );
      }
      default:
        return <input {...theProps} />;
    }
  }

  return <>{InputType(theProps.type ?? "text")}</>;
}

/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";

import { Check, CircleAlert, X } from "lucide-react";

import { SelectI, SelectThreeI, SelectTwoI } from "../interface/interface.form";
import {
  capitalize,
  deleteFields,
  isImageURL,
  mergeCssClass,
} from "../utillities/utils";
import { filterInputProps } from "./fn";


export function SelectInput({ props }: { props: SelectI }) {
  const filterInput = filterInputProps<SelectI["inputType"]>(
    props.inputType
  );
  const { className, ...ff } = filterInput;
  const removeClassName = deleteFields(ff, ["value"]);

  const [focus, setFocus] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);



  const handleFocus = (f: boolean) => {
    setFocus(f);
  };

  const handleHover = (f: boolean) => {
    setHover(f);
  };

  return (
    <div className="select-input-container">
      <div className="px-4 py-2">
        <div className="flex items-center gap-1 mb-1">
          <label
            className={mergeCssClass(
              "text-sm font-medium",
              props.err && props.showHelper ? "text-red-600" : "",
              props.inputType.disabled ? "text-gray-500" : "text-gray-700"
            )}
          >
            {capitalize(props.label)}
          </label>
          {removeClassName.required && (
            <div className="text-red-600">
              <CircleAlert size={12} />
            </div>
          )}
        </div>

        <div
          className={mergeCssClass(
            "relative border rounded-lg",
            props.inputType.disabled
              ? "bg-gray-100 text-gray-500 cursor-not-allowed"
              : "bg-white",
            props.err && props.showHelper
              ? "border-red-400 focus:border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-200",
            className ?? ""
          )}
        >
          {props.prefix && (
            <div
              className={mergeCssClass(
                "absolute left-0 inset-y-0 flex items-center px-3  z-10",
                props.inputType.disabled
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              )}
            >
              {props.prefix}
            </div>
          )}

          <div
            onFocus={() => handleFocus(true)}
            onBlur={() => handleFocus(false)}
            onMouseOver={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            className={mergeCssClass(
              "select-wrapper relative",
              props.prefix ? "pl-10" : ""
            )}
          >
            <select
              {...removeClassName}
              value={props.inputType.value}
              className={mergeCssClass(
                "w-full py-2.5 px-4 text-sm transition-all appearance-none border-0 focus:border-0 hover:border-0 "
              )}
            >
              <option selected disabled>
                {props.placeholder}
              </option>
              {Object.entries(props.kv).map(([k, v], key) => (
                <option className="py-2" key={key} value={v.value}>
                  {String(k).toUpperCase()}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className={mergeCssClass(
                  "h-4 w-4 transition-colors",
                  props.err && props.showHelper
                    ? "text-red-500"
                    : focus || hover
                    ? "text-blue-500"
                    : "text-gray-400"
                )}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {props.showHelper && (
        <div
          className={`flex items-center gap-1 px-4 ${
            props.err ? "text-red-600" : "text-green-600"
          }`}
        >
          <div className="h-5 w-5 flex-shrink-0">
            {props.err ? <X /> : <Check />}
          </div>
          <div className="text-xs">{props.helper}</div>
        </div>
      )}

      {props.showExtraInfo && (
        <div className="flex items-center gap-1 px-4 text-blue-700">
          <div className="h-4 w-4 flex-shrink-0">{props.extraInfoIcon}</div>
          <div className="text-xs">{props.extraInfo}</div>
        </div>
      )}
    </div>
  );
}

export function SelectInput2({ props }: { props: SelectTwoI }) {
  const filterInput = filterInputProps<SelectTwoI["inputType"]>(
    props.inputType
  );

  const { className, ...removeClassName } = filterInput;
  const [picked, setPicked] = useState<string | undefined>(
    String(props.inputType.value)
  );

  useEffect(() => {
    setPicked(String(props.inputType.value));
  }, [props.inputType.value]);

  return (
    <div className="select-input-container">
      <div className="py-2">
        <div className="flex items-center gap-1 mb-2">
          <label
            className={mergeCssClass(
              "text-sm font-medium",
              props.err && props.showHelper ? "text-red-600" : "text-gray-700"
            )}
          >
            {capitalize(props.label)}
          </label>
          {removeClassName.required && (
            <div className="text-red-600">
              <CircleAlert size={12} />
            </div>
          )}
        </div>

        <div
          className={mergeCssClass(
            "relative",
            props.inputType.disabled ? "opacity-50" : "",
            props.err && props.showHelper ? "border-red-400" : ""
          )}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {Object.entries(props.kv).map(([k, v], key) => (
              <div key={key} className="col-span-1">
                <div
                  className={mergeCssClass(
                    "h-28 rounded-lg p-4 transition-all cursor-pointer hover:shadow-md",
                    picked && picked === (v as any).value
                      ? props.inputType.disabled
                        ? "border-1 border-blue-100 bg-gray-50"
                        : "border-2 border-blue-500 bg-blue-50"
                      : "border border-gray-200 bg-white shadow-sm hover:border-blue-300"
                  )}
                  onClick={() => {
                    if (!props.inputType.disabled) {
                      setPicked((v as any).value);
                      props.inputType.onChange &&
                        props.inputType.onChange({ key: k, value: v });
                    }
                  }}
                >
                  <div className="flex h-full flex-col">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {props.prefix && <div>{props.prefix}</div>}
                        <div className="font-medium text-sm capitalize text-gray-800">
                          {k}
                        </div>
                      </div>
                      <div
                        className={mergeCssClass(
                          "flex items-center justify-center h-6 w-6 rounded-full border",
                          picked && picked === (v as any).value
                            ? "border-blue-500 bg-blue-100 text-blue-600"
                            : "border-gray-300 bg-gray-50"
                        )}
                      >
                        {picked  && picked === (v as any).value && (
                          <div className="text-blue-600">
                            <Check />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 text-xs font-medium text-gray-600">
                      {(v as any).description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {props.showHelper && (
        <div
          className={`flex items-center gap-1 mt-2 ${
            props.err ? "text-red-600" : "text-green-600"
          }`}
        >
          <div className="h-5 w-5 flex-shrink-0">
            {props.err ? <X /> : <Check />}
          </div>
          <div className="text-xs">{props.helper}</div>
        </div>
      )}

      {props.showExtraInfo && (
        <div className="flex items-center gap-1 mt-1 text-blue-700">
          <div className="h-4 w-4 flex-shrink-0">{props.extraInfoIcon}</div>
          <div className="text-xs">{props.extraInfo}</div>
        </div>
      )}
    </div>
  );
}

export function SelectInput3({ props }: { props: SelectThreeI }) {
  const filterInput = filterInputProps<SelectThreeI["inputType"]>(
    props.inputType
  );
  const { className, ...ff } = filterInput;
  const removeClassName = deleteFields(ff, ["value"]);

  const [selectPlaceholder, setSelectPlaceholder] = useState<string>(
    props.placeholder
  );
  const [focus, setFocus] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [value, setValue] = useState<string | undefined>(
    String(props.inputType.value)
  );
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // setValue(String(props.inputType.value));
    setSelectPlaceholder(props.placeholder);
  }, [props.inputType.value, props.placeholder]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setOpenSelect(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFocus = (f: boolean) => {
    setFocus(f);
  };

  const handleHover = (f: boolean) => {
    setHover(f);
  };

  function handleOpenSelect(d: boolean, val?: string) {
    if (val) setSelectPlaceholder(val);
    setOpenSelect(d);
  }

  return (
    <div className="select-input-container" ref={selectRef}>
      <div className="px-4 py-2">
        <div className="flex items-center gap-1 mb-1">
          <label
            className={mergeCssClass(
              "text-sm font-medium",
              props.err && props.showHelper ? "text-red-600" : "",
              props.inputType.disabled ? "text-gray-500" : "text-gray-700"
            )}
          >
            {capitalize(props.label)}
          </label>
          {removeClassName.required && (
            <div className="text-red-600">
              <CircleAlert size={12} />
            </div>
          )}
        </div>

        <div
          className={mergeCssClass(
            "relative border rounded-lg ",
            props.inputType.disabled
              ? "bg-gray-100 text-gray-500 cursor-not-allowed"
              : "bg-white",
            props.err && props.showHelper
              ? "border-red-400"
              : (focus || hover || openSelect) && !props.inputType.disabled
              ? "border-blue-500 shadow-sm"
              : "border-gray-200"
          )}
        >
          {props.prefix && (
            <div
              className={mergeCssClass(
                "absolute left-0 inset-y-0 flex items-center px-3  z-10",

                props.inputType.disabled
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              )}
            >
              {props.prefix}
            </div>
          )}

          <div
            onFocus={() => handleFocus(true)}
            onBlur={() => handleFocus(false)}
            onMouseOver={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            onClick={() => {
              if (!props.inputType.disabled) {
                setOpenSelect(!openSelect);
              }
            }}
            className={mergeCssClass(
              "relative cursor-pointer select-none",
              props.prefix ? "pl-10" : ""
            )}
          >
            <div
              className={mergeCssClass(
                "w-full  py-2.5 px-4 text-sm transition-all flex items-center"
              )}
            >
              <span
                className={mergeCssClass(
                  "flex-grow truncate",
                  !value && "text-gray-500"
                )}
              >
                {value || selectPlaceholder}
              </span>
              <div className="ml-2">
                <svg
                  className={mergeCssClass(
                    "h-4 w-4 transition-transform",
                    openSelect ? "rotate-180 transform" : "",
                    props.err && props.showHelper
                      ? "text-red-500"
                      : focus || hover || openSelect
                      ? "text-blue-500"
                      : "text-gray-400"
                  )}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {openSelect && (
            <Selectmodal
              selected={handleOpenSelect}
              children={
                <SelectChildren
                  filteredOptions={props.kv}
                  click={({ key, value }) => {
                    setValue(key);
                    props.inputType.onChange &&
                      props.inputType.onChange({ key, value: value.value });
                  }}
                  closeSelect={handleOpenSelect}
                />
              }
            />
          )}
        </div>
      </div>

      {props.showHelper && (
        <div
          className={`flex items-center gap-1 px-4 ${
            props.err ? "text-red-600" : "text-green-600"
          }`}
        >
          <div className="h-5 w-5 flex-shrink-0">
            {props.err ? <X /> : <Check />}
          </div>
          <div className="text-xs">{props.helper}</div>
        </div>
      )}

      {props.showExtraInfo && (
        <div className="flex items-center gap-1 px-4 text-blue-700">
          <div className="h-4 w-4 flex-shrink-0">{props.extraInfoIcon}</div>
          <div className="text-xs">{props.extraInfo}</div>
        </div>
      )}
    </div>
  );
}

const Selectmodal: React.FC<{
  children: React.ReactNode;
  selected: (d: boolean) => void;
}> = ({ children, selected }) => {
  return (
    <div className="absolute z-50 left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-auto">
      <div className="sticky top-0 right-0 p-1 text-right bg-white border-b border-gray-100 z-10">
        <button
          className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
          onClick={() => {
            selected(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

const SelectChildren = ({
  filteredOptions,
  click,
  closeSelect,
}: {
  filteredOptions: Record<string, any>;
  click?: ({ key, value }: { key: string; value: any }) => void;
  closeSelect: (d: boolean, val?: string) => void;
}) => {
  const [data, setData] = useState<Record<string, any>>(filteredOptions);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    setData(filteredOptions);
  }, [filteredOptions]);

  function filtering(d: string) {
    setSearchTerm(d);
    const filtered = Object.fromEntries(
      Object.entries(filteredOptions).filter(([key, value]) => {
        const keyMatches = key.toLowerCase().includes(d.toLowerCase());
        const valueMatches = checkValueMatches(value, d);
        return keyMatches || valueMatches;
      })
    );
    setData(filtered);
  }

  function checkValueMatches(value: any, searchTerm: string): boolean {
    if (typeof value === "object" && value !== null) {
      return Object.values(value).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return String(value).toLowerCase().includes(searchTerm.toLowerCase());
  }

  return (
    <div className="flex flex-col">
      <div className="p-3 border-b border-gray-100">
        <div className="relative">
          <input
            name="filter_search"
            value={searchTerm}
            type="search"
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Search..."
            aria-controls="users_table"
            spellCheck={false}
            onChange={(e) => {
              filtering(e.currentTarget.value);
            }}
          />

          <div className="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="py-1">
        {Object.entries(data).length === 0 ? (
          <div className="px-4 py-2 text-sm text-gray-500 text-center">
            No results found
          </div>
        ) : (
          Object.entries(data).map(([k, v], key) => (
            <div
              key={key}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700 text-sm transition-colors"
              onClick={() => {
                closeSelect(false, typeof v === "object" ? (v as any).value : v);
                click && click({ key: k, value: v });
              }}
            >
              {typeof v === "object" ? (
                <div className="flex items-center justify-between">
                  {Object.entries(v).map(([subKey, subValue], ky) => {
        
                    return isImageURL(String(subValue)) ? (
                      <img
                        key={ky}
                        className="w-6 h-6 object-cover rounded"
                        src={String(subValue)}
                        alt={subKey}
                      />
                    ) : (
                      <div key={ky} className="truncate">
                        {String(k)}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="uppercase">{k}</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

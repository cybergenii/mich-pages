import { useState } from "react";

import { Check, Info, X } from "lucide-react";
import { FileInputI } from "../interface/interface.form";
import { mergeCssClass } from "../utillities/utils";
import { filterInputProps } from "./fn";


export default function FileInput({ props }: { props: FileInputI }) {
  const thProps = filterInputProps<FileInputI["inputType"]>(props.inputType);
  const { className, ...theProps } = thProps;
  const [focus, setFocus] = useState<boolean>(false);
  const handleFocus = (f: boolean) => {
    setFocus(f);
  };
  return (
    <>
      <div className="pl-[20px] md:pl-[20px] lg:pl-[24px] xl:pl-[20px] py-[4px]">
        <div className="flex flex-row relative left-[-24px]">
          <div
            className={mergeCssClass(
              `text-[16px] capitalize pl-[-4px] `,
              focus ? "text-[var(--primary-dark)]" : "",
              props.err && props.showHelper ? "text-red-700 " : ""
            )}
          >
            {props.label}
          </div>{" "}
          {theProps.required && (
            <div className="h-[24px] w-[24px] text-red-600">
              <Info />
            </div>
          )}
        </div>

        <div className="relative">
          {props.prefix && (
            <div
              className={mergeCssClass(
                "absolute left-[-24px] border-2 inset-y-0 flex   items-center rounded-l-xl p-[4px] bg-[var(--gray-4)]",
                props.err && props.showHelper
                  ? " border-red-600"
                  : "focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] focus:shadow-outline border-r-0 ",
                focus ? "border-[var(--primary-dark)]" : " border-gray-200"
              )}
          
            >
              {props.prefix}
            </div>
          )}
          <input
            {...theProps}
            onFocus={() => handleFocus(true)}
            onBlur={() => handleFocus(false)}
            className={mergeCssClass(
              `appearance-none border-2  active:border-[var(--primary-dark)] hover:border-[var(--primary-dark)]  transition-colors rounded-lg w-full py-3 px-2 text-gray-800 leading-tight `,
              props.inputType.disabled
                ? "bg-gray-200 text-gray-500 hover:border-gray-400 border-2  active:border-gray-400"
                : "",
              props.err && props.showHelper
                ? " border-red-600"
                : "focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] focus:shadow-outline border-gray-200",
              className ?? ""
            )}
          />
        </div>
      </div>

      {props.showHelper && (
        <div
          className={`flex flex-row " ${
            props.err ? "text-red-700 " : "text-green-700"
          }`}
        >
          {" "}
          <div className="h-[22px] w-[22px]">
            {props.err ? <X /> : <Check />}
          </div>{" "}
          <div className="text-[16px] ">{props.helper}</div>
        </div>
      )}
      {props.showExtraInfo && (
        <div className={`flex flex-row text-[var(--primary-dark)]`}>
          {" "}
          <div className="h-[22px] w-[22px]">{props.extraInfoIcon}</div>{" "}
          <div className="text-[16px] ">{props.extraInfo}</div>
        </div>
      )}
    </>
  );
}

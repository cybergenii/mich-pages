import clsx from "clsx";
import { LegacyRef, TextareaHTMLAttributes, forwardRef, useState } from "react";

interface StyledTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
  showCount?: boolean;
  maxLength?: number;
}

const StyledTextarea = forwardRef(
  (
    {
      className,
      label,
      error,
      helper,
      showCount = false,
      maxLength,
      id,
      value,
      defaultValue,
      ...rest
    }: StyledTextareaProps,
    ref: LegacyRef<HTMLTextAreaElement>
  ) => {
    const [inputValue, setInputValue] = useState(value || defaultValue || "");
    const uniqueId =
      id || `textarea-${Math.random().toString(36).substring(2, 9)}`;
    const characterCount =
      typeof inputValue === "string" ? inputValue.length : 0;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputValue(e.target.value);
      if (rest.onChange) {
        rest.onChange(e);
      }
    };

    return (
      <div className="flex flex-col w-full gap-1">
        {label && (
          <label
            htmlFor={uniqueId}
            className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={uniqueId}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${uniqueId}-error`
              : helper
              ? `${uniqueId}-helper`
              : undefined
          }
          className={clsx(
            "rounded text-sm p-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300",
            "resize-none w-full min-h-[6rem]",
            "border border-solid transition-colors duration-200",
            "outline-none focus:ring-2 focus:ring-offset-0",
            "placeholder:text-gray-400 dark:placeholder:text-gray-500",
            {
              "border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500/30 dark:border-gray-600 dark:hover:border-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/30":
                !error,
              "border-red-500 focus:border-red-500 focus:ring-red-500/30 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400/30":
                !!error,
              "bg-gray-100 dark:bg-gray-800/50 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-600 pointer-events-none":
                rest.disabled,
            },
            className
          )}
          {...rest}
        ></textarea>

        <div className="flex justify-between items-center mt-1 text-xs">
          <div>
            {error && (
              <p
                id={`${uniqueId}-error`}
                className="text-red-500 dark:text-red-400"
              >
                {error}
              </p>
            )}
            {!error && helper && (
              <p
                id={`${uniqueId}-helper`}
                className="text-gray-500 dark:text-gray-400"
              >
                {helper}
              </p>
            )}
          </div>

          {showCount && (
            <div
              className={clsx(
                "text-gray-500 dark:text-gray-400 tabular-nums",
                maxLength &&
                  characterCount > maxLength * 0.9 &&
                  "text-orange-500 dark:text-orange-400",
                maxLength &&
                  characterCount >= maxLength &&
                  "text-red-500 dark:text-red-400"
              )}
            >
              {characterCount}
              {maxLength ? `/${maxLength}` : ""}
            </div>
          )}
        </div>
      </div>
    );
  }
);

StyledTextarea.displayName = "StyledTextarea";

export default StyledTextarea;

/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { useState } from "react";
import { useTableContext } from "../hooks/form/context";

const StyledToggle = (
  props:  {
    checked?: boolean;
    disabled?: boolean;
    id?: string;
    size?: "default" | "small";
    onclick?:(data:boolean)=>void
  }
) => {
  const {  disabled = false, id = 'id', size = "default" } = props;
  
const [checked, setChecked] = useState(false)

  const selector = useTableContext().state;
  

  

  return (
    <div
      onClick={
        () => {
          if (!disabled && props.onclick) {
            setChecked(!checked);
            console.log({ckd:checked})
            
            props.onclick(!checked)
          }
        }
 }

      role="switch"
      aria-checked={checked}
      tabIndex={disabled ? -1 : 0}
      className={clsx(
        "relative rounded-full transition-colors duration-200 outline-none",
        size === "default" ? "w-14 h-7" : "w-10 h-5",
        selector[id]?.value ?? false ? "bg-blue-800/80" : "bg-gray-300",
        disabled
          ? "cursor-not-allowed opacity-50 pointer-events-none"
          : "cursor-pointer",
        "focus-visible:ring focus-visible:ring-blue-300 focus-visible:ring-opacity-50"
      )}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (!disabled && props.onclick) props.onclick(e as any);
        }
      }}
    >
      <div
        className={clsx(
          "rounded-full bg-white absolute top-0 shadow-sm transition-all duration-200",
          size === "default" ? "w-7 h-7" : "w-5 h-5",
          selector[id]?.value ?? false ? "left-7" : "left-0" // Fixed positioning
        )}
      ></div>
    </div>
  );
};

export default StyledToggle;

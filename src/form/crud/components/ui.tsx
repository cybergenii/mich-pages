/* eslint-disable @typescript-eslint/no-explicit-any */
import { Info } from "lucide-react";
import { Input } from "../../inputs/input";
import { InputI, PageI } from "../../interface/interface.form";
import { capitalize, getPageType } from "../../utillities/utils";


export function PageUI({ data, Children }: { data: PageI; Children: any }) {
  const showHeading = data.showHeading ?? true;

  return (
    <div className={`w-full ${showHeading ? "mt-10" : ""}`}>
      <div className="w-full max-w-7xl mx-auto">
        <div
          className={`
            bg-white 
            rounded-lg
            overflow-hidden
            flex
            flex-col
            shadow-lg
            ${!showHeading ? "" : "border-t-4 border-[var(--primary)]"}
            transition-all
            duration-300
          `}
        >
          {showHeading && (
            <div className="bg-[var(--gray-2)] p-4 flex items-center justify-start border-b border-gray-200">
              <div className="h-6 w-6 text-[var(--primary)]">{data.icon || getPageType(data.type)}</div>
              <span className="ml-3 font-semibold text-lg text-[var(--dark-1)]">
                {capitalize( data.type.toLowerCase() )} {data.name}
              </span>
            </div>
          )}

          {data.extraInfo && (
            <div className="flex items-center bg-[var(--gray-1)] px-6 py-3 border-b border-gray-100">
              <div className="h-5 w-5 text-[var(--success-darkest)] flex-shrink-0">
                <Info />
              </div>
              <span className="ml-3 text-[var(--dark-1)] text-sm font-medium">
                {data.extraInfo}
              </span>
            </div>
          )}

          <div className="p-6">{Children}</div>

          <div className="h-6"></div>
        </div>
      </div>
    </div>
  );
}

export function MapFormUI({ data }: { data: InputI[] }) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-x-6 gap-y-4">
      {data.map((input, index) => (
        <div className="form-field-container" key={index}>
          <Input props={input} />
        </div>
      ))}
    </div>
  );
}

// Add this CSS to your global styles or as a styled component
/*
.form-field-container:nth-child(odd):last-child:nth-child(2n+1) {
  grid-column: span 2;
}
*/

 
 

import { Info } from "lucide-react";
import { PageI } from "../../interface/interface.form";

import { capitalize } from "../../utillities/utils";

import { CreatePage } from "./create";
import { SubmitPage } from "./submit";
import { ViewPage } from "./view";


export function Page({ data }: { data: PageI }) {
  const showHeading = data.showHeading ?? true;
  const showButton = data.showButton?.any ?? true;

  return (
    <div className={`${showHeading ? "mt-10" : ""}`}>
      <div className="container mx-auto">
        <div className="w-full">
          <div
            className={`
              bg-white 
              shadow-lg 
              rounded-md 
              ${!showHeading ? "rounded-t-none" : ""} 
              ${!showHeading ? "" : "border-t-4"} 
              ${!showHeading ? "" : `border-t-[${data.style?.primary}]`}
              overflow-hidden
            `}
          >
            {showHeading && (
              <div className="bg-gray-50 p-4 shadow-sm flex items-center gap-3">
                <div className="h-6 w-6 flex-shrink-0">{data.icon}</div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {capitalize( data.type.toLowerCase() )} {data.name}
                </h2>
              </div>
            )}

            {data.extraInfo && (
              <div className="px-6 py-3 flex items-center gap-2">
                <div className="h-5 w-5 text-emerald-700 flex-shrink-0">
                  <Info />
                </div>
                <p className="text-sm text-gray-700 font-medium">
                  {data.extraInfo}
                </p>
              </div>
            )}

            <div className="p-6">
              {data.type === "VIEW" && <ViewPage data={data} />}

              {(data.type === "CREATE" || data.type === "UPDATE") && (
                <CreatePage data={data} />
              )}
            </div>

            {showButton && (
              <div className="px-6 pb-6">
                <SubmitPage data={data} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Calendar as CalendarIcon,
  ChevronRight,
  FileText,
  Image as ImageIcon,
  Info,
  Mail,
  Phone,
  Tag,
  ToggleLeft
} from "lucide-react";
import React from "react";
import { PageFormT } from "../../interface/interface.form";
import { convertDateFormat } from "../../utillities/time-magic";
import { capitalize, parseNotification, RenderHtml, splitByUppercase } from "../../utillities/utils";

interface ViewPageProps {
  data: PageFormT;
}

const ImageAvatar = ({
  imageUrl,
  height = 40,
  showView = true,
}: {
  imageUrl: string;
  height?: number;
  round?: boolean;
  showView?: boolean;
}) => {
  return (
    <div className="relative">
      <img
        src={imageUrl}
        alt="Avatar"
        style={{ height: `${height}px` }}
        className="object-cover rounded-md"
      />
      {showView && (
        <div className="absolute top-0 right-0 bg-blue-500 text-white rounded-full p-1 text-xs">
          <ImageIcon size={12} />
        </div>
      )}
    </div>
  );
};

const Toggle = ({ checked }: { checked: boolean }) => {
  return (
    <div className={`flex items-center justify-center w-11 h-6 ${checked ? "bg-blue-600" : "bg-gray-200"} rounded-full transition-colors duration-200 ease-in-out`}>
      <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${checked ? "translate-x-2" : "-translate-x-2"}`}></div>
    </div>
  );
};

const DataField = ({ icon, label, value, children }: { icon: React.ReactNode, label: string, value?: string, children?: React.ReactNode }) => {
  return (
    <div className="flex items-start p-3 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="h-8 w-8 mr-3 text-blue-500 bg-blue-50 flex items-center justify-center rounded-lg">
        {icon}
      </div>
      <div className="flex-1">
        {children || (
          <div className="text-sm text-gray-800 font-medium mb-1">
            {value || "—"}
          </div>
        )}
        <div className="text-xs font-normal text-gray-500">
          {label}
        </div>
      </div>
    </div>
  );
};

export function ViewPage({ data }: ViewPageProps) {
  const name = data.name.toLowerCase().trim();
  const fieldName = name.split(" ").join("-") + "-form";

  const field: Record<string, any> = {};
  const requiredField: Record<string, string> = {};

  data.headings.forEach((heading) => {
    if (heading.formType === "obj" && heading.child) {
      heading.child.forEach((el) => {
        const va = splitByUppercase(String(el.key)).join("-");
        field[String(el.key)] = `${fieldName}-${va}`;
        if (el.required) {
          requiredField[String(el.key)] = `${fieldName}-${va}`;
        }
      });
    } else {
      const val = splitByUppercase(String(heading.key)).join("-");
      field[String(heading.key)] = `${fieldName}-${val}`;
      if (heading.required) {
        requiredField[String(heading.key)] = `${fieldName}-${val}`;
      }
    }
  });

  // Helper function to get icon based on formType
  const getIconForFormType = (formType: string) => {
    switch (formType) {
      case "image":
        return <ImageIcon />;
      case "date":
        return <CalendarIcon />;
      case "email":
        return <Mail />;
      case "text":
        return <FileText />;
      case "number":
        return <Info />;
      case "tel":
        return <Phone />;
      case "toggle":
        return <ToggleLeft />;
      default:
        return <Tag />;
    }
  };

  return (
    <div className="space-y-6">
      {data.categories.map((category, categoryIndex) => (
        <div
          key={`category-${categoryIndex}`}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="border-b border-gray-100 bg-gray-50">
            <h3 className="text-base font-semibold px-6 py-4 text-gray-700 flex items-center">
              <ChevronRight className="mr-2 h-5 w-5 text-blue-500" />
              {capitalize(category.name)}
            </h3>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.headings
                .filter(
                  (head) => head.category === category.key && head.show !== false
                )
                .sort((a, b) => {
                  // Sort by formType === "toggle", with toggle values coming first
                  if (a.formType === "toggle" && b.formType !== "toggle") {
                    return -1;
                  } else if (a.formType !== "toggle" && b.formType === "toggle") {
                    return 1;
                  } else {
                    return 0;
                  }
                })
                .map((heading, headingIndex) => {
                  const icon = heading.prefixIcons
                    ? heading.prefixIcons
                    : getIconForFormType(heading.formType);

                  return (
                    <React.Fragment key={`heading-${headingIndex}`}>
                      {heading.formType === "image" && (
                        <DataField 
                          icon={icon} 
                          label={heading.name}
                        >
                          <ImageAvatar
                            height={40}
                            imageUrl={data.data[String(heading.key)]}
                            showView={true}
                          />
                        </DataField>
                      )}

                      {heading.formType === "toggle" && (
                        <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-100 shadow-sm">
                          <div className="flex items-center">
                            <div className="h-8 w-8 mr-3 text-blue-500 bg-blue-50 flex items-center justify-center rounded-lg">
                              {icon}
                            </div>
                            <div className="text-sm font-medium text-gray-700">
                              {heading.name}
                            </div>
                          </div>
                          <Toggle
                            checked={Boolean(data.data[String(heading.key)])}
                          />
                        </div>
                      )}

                      {heading.formType === "rawHtml" && (
                        <DataField
                          icon={icon}
                          label={heading.name}
                        >
                          <div className="text-sm text-gray-800">
                            <RenderHtml
                              jsonData={parseNotification(
                                String(data.data[String(heading.key)])
                              )}
                            />
                          </div>
                        </DataField>
                      )}

                      {heading.formType !== "image" &&
                        heading.formType !== "obj" &&
                        heading.formType !== "date" &&
                        heading.formType !== "toggle" &&
                        heading.formType !== "rawHtml" && (
                          <DataField
                            icon={icon}
                            label={heading.name}
                            value={capitalize(
                              String(data.data[String(heading.key)]) || ''
                            )}
                          />
                        )}

                      {heading.formType === "date" && (
                        <DataField
                          icon={<CalendarIcon />}
                          label={heading.name}
                          value={convertDateFormat(
                            String(data.data[String(heading.key)])
                          )}
                        />
                      )}

                      {heading.formType === "obj" &&
                        heading.child &&
                        heading.child.map((childItem, childIndex) => {
                          const childIcon = childItem.prefixIcons
                            ? childItem.prefixIcons
                            : getIconForFormType(childItem.formType);

                          return (
                            <React.Fragment
                              key={`child-${headingIndex}-${childIndex}`}
                            >
                              {childItem.formType === "image" && (
                                <div className="ml-6">
                                  <DataField
                                    icon={childIcon}
                                    label={childItem.name}
                                  >
                                    <ImageAvatar
                                      height={30}
                                      imageUrl={
                                        data.data[String(heading.key)][
                                          childItem.key
                                        ]
                                      }
                                      showView={true}
                                    />
                                  </DataField>
                                </div>
                              )}

                              {childItem.formType === "toggle" && (
                                <div className="ml-6">
                                  <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-100 shadow-sm">
                                    <div className="flex items-center">
                                      <div className="h-8 w-8 mr-3 text-blue-500 bg-blue-50 flex items-center justify-center rounded-lg">
                                        {childIcon}
                                      </div>
                                      <div className="text-sm font-medium text-gray-700">
                                        {childItem.name}
                                      </div>
                                    </div>
                                    <Toggle
                                      checked={Boolean(
                                        data.data[String(heading.key)][
                                          childItem.key
                                        ]
                                      )}
                                    />
                                  </div>
                                </div>
                              )}

                              {childItem.formType === "rawHtml" && (
                                <div className="ml-6">
                                  <DataField
                                    icon={childIcon}
                                    label={childItem.name}
                                  >
                                    <div className="text-sm text-gray-800">
                                      <RenderHtml
                                        jsonData={
                                          parseNotification(
                                            String(
                                              data.data[String(heading.key)][
                                                childItem.key
                                              ]
                                            )
                                          )["jsonData"]
                                        }
                                        metaData={
                                          parseNotification(
                                            String(
                                              data.data[String(heading.key)][
                                                childItem.key
                                              ]
                                            )
                                          )["metaData"]
                                        }
                                        subject={
                                          parseNotification(
                                            String(
                                              data.data[String(heading.key)][
                                                childItem.key
                                              ]
                                            )
                                          )["subject"]
                                        }
                                      />
                                    </div>
                                  </DataField>
                                </div>
                              )}

                              {childItem.formType !== "image" &&
                                childItem.formType !== "obj" &&
                                childItem.formType !== "date" &&
                                childItem.formType !== "toggle" &&
                                childItem.formType !== "rawHtml" && (
                                  <div className="ml-6">
                                    <DataField
                                      icon={childIcon}
                                      label={childItem.name}
                                      value={capitalize(
                                        String(
                                          data.data[String(heading.key)][
                                            childItem.key
                                          ]
                                        ) || ''
                                      )}
                                    />
                                  </div>
                                )}

                              {childItem.formType === "date" && (
                                <div className="ml-6">
                                  <DataField
                                    icon={<CalendarIcon />}
                                    label={childItem.name}
                                    value={convertDateFormat(
                                      String(
                                        data.data[String(heading.key)][
                                          childItem.key
                                        ]
                                      )
                                    )}
                                  />
                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}
                    </React.Fragment>
                  );
                })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
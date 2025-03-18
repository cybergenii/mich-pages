/* eslint-disable @typescript-eslint/no-explicit-any */


import { AlertCircle, Calendar, CheckCircle, File, Info, Plus, Tag, Trash2 } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { regexCheckFormFields } from "../../hooks/check-fields-with-regex";
import { useTableContext } from "../../hooks/form/context";
import { handleFormChange } from "../../hooks/handle-change";
import { validateFormKeys } from "../../hooks/validateFields";
import { Input } from "../../inputs/input";
import { SelectInput, SelectInput2, SelectInput3 } from "../../inputs/select";
import { InitialStateI, PageHeadingI, PageI } from "../../interface/interface.form";
import { ActionFormTypesE } from "../../state-manager/form/state-actions";
import { isMyProperty } from "../../utillities/checkkey-in-object";
import { ImageAvatar } from "../../utillities/imageAvatar";
import PresetQuillEditor from "../../utillities/textbox/rich-text-ui";
import StyledTextarea from "../../utillities/textbox/textarea";
import { convertDateFormat } from "../../utillities/time-magic";
import { errorToast } from "../../utillities/toaster";
import StyledToggle from "../../utillities/toggle";
import { capitalize, findKeyByValue, parseNotification, RenderHtml, splitByUppercase } from "../../utillities/utils";


export function CreatePage<T extends object>({
  data,
}: {
  data: Pick<PageI, "name" | "headings" | "categories" | "type" | "data">;
}) {
  const name = data.name.toLowerCase().trim();
  const fieldName = name.split(" ").join("-") + "-form";

  const [kvMap, setKvMap] = useState<Record<string, any>>({});

  //handle image

  const [arrayfield, setArrayfield] = useState<
    Array<PageHeadingI & { data: any }>[]
  >([]);
  const [arrayValfield] = useState<
    Array<Record<string, Array<PageHeadingI & { data: any }>>>
  >([]);

  const field: Record<string, any> = useMemo(()=>({}),[]);

  const requiredField: Record<string, string> = {};
  const selector = useTableContext().state;
  const dispatch = useTableContext().dispatch;

  data.headings.forEach((heading) => {
    if (heading.formType === "obj" && heading.child) { 
      heading.child.forEach((el) => {
        const va = splitByUppercase(el.key).join("-");
        field[el.key] = `${fieldName}-${va}`;
        if (el.required) {
          requiredField[el.key] = `${fieldName}-${va}`;
        }
      });
    } else if (heading.formType === "array" && heading.child) {
      const val = splitByUppercase(heading.key).join("-");
      field[heading.key] = `${fieldName}-${val}`;
      if (heading.required) {
        requiredField[heading.key] = `${fieldName}-${val}`;
      }

      heading.child.forEach((el) => {
        const va = splitByUppercase(el.key).join("-");
        field[el.key] = `${fieldName}-${va}`;
        if (el.required) {
          requiredField[el.key] = `${fieldName}-${va}`;
        }
      });
    } else {
      const val = splitByUppercase(heading.key).join("-");
      field[heading.key] = `${fieldName}-${val}`;
      if (heading.required) {
        requiredField[heading.key] = `${fieldName}-${val}`;
      }
    }
  });

  useEffect(() => {
    if (data.type === "UPDATE" && data.data) {
      const value: InitialStateI = {};

      Object.entries(field).map(([k, v]) => {
        const heading = data.headings.find((h) => h.key === k);
        if (heading?.formType === "date") {
          const dte = data.data[k] && String(data.data[k]).slice(0, 10);
          value[v] = {
            value: dte,
            isValid: true,
            errorMessage: "",
            validMessage: "",
          };
        } else if (
          ["select", "select2", "select3"].includes(heading?.formType || "")
        ) {
          value[v] = {
            value: data.data[k],
            isValid: true,
            errorMessage: "",
            validMessage: "",
          };
        } else if (
          isMyProperty<T>(k, data.data as T) &&
          heading?.formType !== "obj"
        ) {
          value[v] = {
            value: data.data[k],
            isValid: true,
            errorMessage: "",
            validMessage: "",
          };
        }

        data.headings
          .filter((hd) => hd.formType === "array")
          .map((hd) => {
            if (hd.child && hd.child.length > 1) {
              const dataForArr: Array<PageHeadingI & { data: any }> = [];

              hd.child.forEach((el) => {
                if (el.key === k) {
                  if (el.formType === "date") {
                    const dte =
                      data.data[hd.key][k] &&
                      String(data.data[hd.key][k]).slice(0, 10);
                    value[v] = {
                      value: dte,
                      isValid: true,
                      errorMessage: "",
                      validMessage: "",
                    };
                  } else if (
                    ["select", "select2", "select3"].includes(el.formType)
                  ) {
                    value[v] = {
                      value: data.data[hd.key][k],
                      isValid: true,
                      errorMessage: "",
                      validMessage: "",
                    };
                  } else if (isMyProperty<T>(k, data.data[hd.key] as T)) {
                    value[v] = {
                      value: data.data[hd.key][k],
                      isValid: true,
                      errorMessage: "",
                      validMessage: "",
                    };
                  }
                  dataForArr.push({ ...el, data: data.data[hd.key] });
                }
              });
              setArrayfield([...arrayfield, dataForArr]);
            }
          });

        data.headings
          .filter((d) => d.formType === "obj" && d.child && d.child.length >= 1)
          .map((e) => {
            if (e.child && e.child.length > 1) {
              e.child.forEach((el) => {
                if (el.key === k) {
                  if (el.formType === "date") {
                    const dte =
                      data.data[e.key][k] &&
                      String(data.data[e.key][k]).slice(0, 10);
                    value[v] = {
                      value: dte,
                      isValid: true,
                      errorMessage: "",
                      validMessage: "",
                    };
                  } else if (
                    ["select", "select2", "select3"].includes(el.formType)
                  ) {
                    value[v] = {
                      value: data.data[e.key][k],
                      isValid: true,
                      errorMessage: "",
                      validMessage: "",
                    };
                  } else if (isMyProperty<T>(k, data.data[e.key] as T)) {
                    value[v] = {
                      value: data.data[e.key][k],
                      isValid: true,
                      errorMessage: "",
                      validMessage: "",
                    };
                  }
                }
              });
            }
          });
      });

      dispatch({
        type: ActionFormTypesE.SET_KEY_VALUE,
        payload: value,
      });
    }
  }, [

    data.data,
    arrayValfield,
    data.type,
    data.headings,
  
    arrayfield,
  ]);

  function addToArray(da: PageHeadingI) {

    if (!da.child) return;
    const vl:boolean[] = []

    // Map over the children and collect data
    const ddd = da.child.map((d) => {
      const data = selector[field[d.key]]?.value;
      if (d.required && !data) {
        errorToast(da.name + " cannot be empty");
        validateFormKeys({ [field[d.key]]: selector[field[d.key]] }, dispatch);
        vl.push(true)
        return; // Flag this object as invalid
      }else{
      vl.push(false)
      }

      return { ...d, data };
    });

    if (vl.some(data=>data===true)) return;

    // Convert the array to an object
    const obj = ddd.reduce((acc, data) => {
      if (data && data.key) {
        acc[data.key] = data.data;
      }
      return acc;
    }, {} as Record<string, any>);

    // Initial array with the new object
    const newArr = [obj];

    // Iterate over arrayfield and convert each entry to an object
    arrayfield.forEach((fi: (PageHeadingI & { data: any })[]) => {
      const newObj = fi.reduce((acc, data) => {
        if (data && data.key) {
          acc[data.key] = data.data;
        }
        return acc;
      }, {} as Record<string, any>);

      // Push only unique values (no repeating keys) if da.unique is true

  // lets get all keys are unique

  const filt = fi.filter((f) => f.unique);
  // now we have an array of unique keys lets check if the new object has any of the unique keys
      if (filt.length >= 1) {
      const itsAdded =  filt.some((f) => {
          if (newObj[f.key] === obj[f.key]) {

            return true;
          }
          return false;
      })
      if (!itsAdded) {
        newArr.push(newObj);
        }

      } else {
        newArr.push(newObj);
      }

    });

    // Update the state with the new nested array

    // Check if any of the keys in da.unique already exist in arrayfield
    const isUniqueKeyPresent = ddd?.some((d) => {
      if (d?.unique) {
        return arrayfield.some((arr) => arr.some((a) => a.data === d.data));
      } else {
        return false;
      }
    });
    if (!isUniqueKeyPresent) {
      setArrayfield(
        arrayfield
          ? [...arrayfield, ddd as Array<PageHeadingI & { data: any }>]
          : [ddd as Array<PageHeadingI & { data: any }>]
      );
    } else {
      errorToast(`Duplicate key found in ${ddd?.filter((d) => {
        if (d?.unique) {
          return arrayfield.some((arr) => arr.some((a) => a.data === d.data))
        } else {
          return false
        }
      }).map((d) => d?.name).join(", ")}`);
    }
    // Dispatch the updated value
    dispatch({
      type:ActionFormTypesE.SET_KEY_VALUE,
      payload:{
        [field[da.key]]: {
          value: newArr,
        },
      }}
    );
  }

  function deleteArrayBlock(indexToDelete: number, hd: PageHeadingI) {
    const updatedArray = arrayfield.filter(
      (_, index) => index !== indexToDelete
    );
    setArrayfield(updatedArray);

    const newArr: Record<string, any>[] = [];
    updatedArray.forEach(
      (
        fi: (PageHeadingI & {
          data: any;
        })[]
      ) => {
        const newObj = fi.reduce((acc, data) => {
          if (data && data.key) {
            acc[data.key] = selector[field[data.key as string]]?.value;
          }
          return acc;
        }, {} as Record<string, any>);
        newArr.push(newObj);
      }
    );

    dispatch({
      payload: { [field[hd.key]]: { value: newArr } },
      type: ActionFormTypesE.SET_KEY_VALUE,
    });
  }

  function renderSelected(hd: PageHeadingI) {
    switch (hd.formType) {
      case "select2":
        return (
          <div className="px-2 md:px-6">
            <SelectInput2
              props={{
                prefix: {
                  element: (
                    <div className="w-6 h-6 text-[var(--dark-2)]">
                      {" "}
                      {hd.prefixIcons}
                    </div>
                  ),
                },
                label: hd.name,
                placeholder: hd.placeholder,
                err: !selector[field[hd.key]]?.isValid,
                helper: selector[field[hd.key]]?.isValid
                  ? selector[field[hd.key]]?.validMessage
                  : selector[field[hd.key]]?.errorMessage,
                showHelper: selector[field[hd.key]]?.showMessage,
                inputType: {
                  name: field[hd.key],

                  value: selector[field[hd.key]]?.value,
                  className: "",
                  required: hd.required,
                  disabled: hd.disabled ?? false,

                  onChange: ({ value }) => {
                    dispatch({
                      type: ActionFormTypesE.SET_KEY_VALUE,
                      payload: {
                        [field[hd.key]]: {
                          value: value.value,
                        },
                      },
                    });
                    if (
                      hd.filter &&
                      hd.filter !== undefined &&
                      hd.filter.data
                    ) {
                      const filter = hd.filter.data.find((d) => {
                        return (
                          String(
                            d[hd.filter!.parentFilterKey ?? hd.key]
                          ).toLowerCase() === String(value.value).toLowerCase()
                        );
                      });
                      if (filter) {
                        // reduce to object having key value pair
                        const da = (
                          filter[hd.filter.arrKey] as Record<string, any>[]
                        ).reduce((acc, curr) => {
                          acc[curr[hd.filter!.childKey]] = {
                            value: curr[hd.filter!.childValue],
                            description: hd.filter?.childDescription
                              ? curr[hd.filter.childDescription]
                              : "",
                          };
                          return acc;
                        }, {} as Record<string, any>);

                        const linkd = data.headings.find(
                          (h) => h.key === hd.filter!.linkToChildKey
                        );

                        if (linkd) {
                          linkd.keyValue = da;
                        }
                      }
                    }
                  },
                },
                kv: hd.keyValue ? hd.keyValue : {},
              }}
            />
          </div>
        );

      case "select":
        return (
          <div className="px-2 md:px-6">
            <SelectInput
              props={{
                prefix: {
                  element: (
                    <div className="w-6 h-6 text-[var(--dark-2)]">
                      {" "}
                      {hd.prefixIcons}
                    </div>
                  ),
                },
                label: hd.name,
                placeholder: hd.placeholder,
                err: !selector[field[hd.key]]?.isValid,
                helper: selector[field[hd.key]]?.isValid
                  ? selector[field[hd.key]]?.validMessage
                  : selector[field[hd.key]]?.errorMessage,
                showHelper: selector[field[hd.key]]?.showMessage,
                inputType: {
                  name: field[hd.key],

                  value: selector[field[hd.key]]?.value,
                  className: "",
                  required: hd.required,
                  disabled: hd.disabled ?? false,

                  onChange: (e: any) => {
                 
                    handleFormChange({
                      event: e,
                      dispatch,
                    });
                    regexCheckFormFields({
                      event: e,
                      dispatch,
                    });

                    if (
                      hd.filter &&
                      hd.filter !== undefined &&
                      hd.filter.data
                    ) {
                      const filter = hd.filter.data.find((d) => {
                        return (
                          String(
                            d[hd.filter!.parentFilterKey ?? hd.key]
                          ).toLowerCase() ===
                          String(e.target.value).toLowerCase()
                        );
                      });

                      if (filter) {
                        // reduce to object having key value pair
                        const da = (
                          filter[hd.filter.arrKey] as Record<string, any>[]
                        ).reduce((acc, curr) => {
                          acc[curr[hd.filter!.childKey]] =
                            curr[hd.filter!.childValue];
                          return acc;
                        }, {} as Record<string, any>);

                        const linkd = data.headings.find(
                          (h) => h.key === hd.filter!.linkToChildKey
                        );
                        if (linkd) {
                          setKvMap((prev) => ({
                            ...prev,
                            [linkd.key]: da,
                          }));
                          linkd.keyValue = da;
                        }
                      }
                      // now we want to update the kv of the
                      // child with the data how can the parent now send this data to child select options
                      // we can use the kv prop to send the data to the child
                      // can i get a way to update the kv of the child
                    }
                  },
                },
                kv: hd.keyValue
                  ? hd.isKeyValueChild
                    ? kvMap[hd.key]
                      ? kvMap[hd.key]
                      : hd.keyValue
                    : hd.keyValue
                  : {},
              }}
            />
          </div>
        );

      case "select3":
        return (
          <div className="px-2 md:px-6">
            <SelectInput3
              props={{
                prefix: {
                  element: (
                    <div className="w-6 h-6 text-[var(--dark-2)]">
                      {" "}
                      {hd.prefixIcons}
                    </div>
                  ),
                },
                label: hd.name,
                placeholder: hd.placeholder,
                err: !selector[field[hd.key]]?.isValid,
                helper: selector[field[hd.key]]?.isValid
                  ? selector[field[hd.key]]?.validMessage
                  : selector[field[hd.key]]?.errorMessage,
                showHelper: selector[field[hd.key]]?.showMessage,
                inputType: {
                  name: field[hd.key],

                  value: selector[field[hd.key]]?.value,
                  className: "",
                  required: hd.required,
                  disabled: hd.disabled ?? false,

                  onChange: ({ value }: { key: string; value: string }) => {
                    dispatch({
                      type: ActionFormTypesE.SET_KEY_VALUE,
                      payload: {
                        [field[hd.key]]: {
                          value: value,
                          isValid: true,
                          showMessage: false,
                        },
                      },
                    });

                    if (
                      hd.filter &&
                      hd.filter !== undefined &&
                      hd.filter.data
                    ) {
                      const filter = hd.filter.data.find((d) => {
                        return (
                          String(
                            d[hd.filter!.parentFilterKey ?? hd.key]
                          ).toLowerCase() === String(value).toLowerCase()
                        );
                      });
                      if (filter) {
                        // reduce to object having key value pair
                        const da = (
                          filter[hd.filter.arrKey] as Record<string, any>[]
                        ).reduce((acc, curr) => {
                          acc[curr[hd.filter!.childKey]] =
                            curr[hd.filter!.childValue];
                          return acc;
                        }, {} as Record<string, any>);

                        const linkd = data.headings.find(
                          (h) => h.key === hd.filter!.linkToChildKey
                        );

                        if (linkd) {
                          linkd.keyValue = da;
                          console.log({ kvMap });
                          setKvMap((prev) => ({
                            ...prev,
                            [linkd.key]: da,
                          }));
                        }
                      }
                    }
                  },
                },
                kv: hd.key
                  ? hd.isKeyValueChild
                    ? kvMap[hd.key]
                    : hd.keyValue
                  : {},
              }}
            />
          </div>
        );

      case "toggle":
        return (
          <div className="px-2 md:px-6 mt-8 ">
            <div className="px-2 border py-2 hover:border-gray-300 border-gray-100  flex flex-row items-center justify-between align-middle rounded-xl">
              <span className="text-gray-700 text-sm font-medium mr-4">
                {hd.name}
              </span>
              <StyledToggle
  
                disabled={hd.disabled ?? false}
                checked={Boolean(selector[field[hd.key]]?.value)}
                id={field[hd.key]}
                onclick={(e) => {
                  dispatch({
                    type: ActionFormTypesE.SET_KEY_VALUE,
                    payload: {
                      [field[hd.key]]: {
                        value: e,
                      },
                    },
                  });
                }}
              />
            </div>
          </div>
        );
      case "textarea1":
        return (
          <div className="px-2 md:px-6">
            <div className="flex flex-col w-full mt-4">
              <div className="flex items-center mb-2">
                <span className="text-gray-700 text-sm font-medium">
                  {hd.name}
                </span>
                {hd.required && (
                  <AlertCircle className="h-4 w-4 text-red-500 ml-1" />
                )}
              </div>
              <StyledTextarea
                value={selector[field[hd.key]]?.value}
                onChange={(e) => {
                  dispatch({
                    type: ActionFormTypesE.SET_KEY_VALUE,
                    payload: {
                      [field[hd.key]]: {
                        value: e.target.value,
                      },
                    },
                  });
                }}
              />
            </div>
          </div>
        );

      case "textarea2":
        return (
          <div className="px-2 md:px-6">
            <div className="flex flex-col w-full mt-4">
              <div className="flex items-center mb-2">
                <span className="text-gray-700 text-sm font-medium">
                  {hd.name}
                </span>
                {hd.required && (
                  <AlertCircle className="h-4 w-4 text-red-500 ml-1" />
                )}
              </div>
              <PresetQuillEditor
                initialValue={selector[field[hd.key]]?.value}
                onChange={(id: any) => {
                  dispatch({
                    type: ActionFormTypesE.SET_KEY_VALUE,
                    payload: {
                      [field[hd.key]]: {
                        value: id,
                      },
                    },
                  });
                }}
              />
            </div>
          </div>
        );

      case "button":
      case "checkbox":
      case "color":
      case "date":
      case "datetime-local":
      case "email":
      case "file":
      case "month":
      case "number":
      case "password":
      case "radio":
      case "range":
      case "reset":
      case "search":
      case "tel":
      case "text":
      case "time":
      case "url":
      case "week":
        return (
          <div className="px-2 md:px-6">
            <Input
              props={{
                inputType: {
                  type: hd.formType,
                  name: field[hd.key],
                  disabled: hd.disabled ?? false,
                  value: selector[field[hd.key]]?.value,
                  placeholder: hd.placeholder,
                  classN: "w-full",
                  label: "text",
                  required: hd.required,
                  onChange: (e: any) => {
                    handleFormChange({
                      event: e,
                      dispatch,
                    });
                    regexCheckFormFields({
                      event: e,
                      dispatch,
                    });
                  },
                },
                prefix: hd.prefixIcons && {
                  element: (
                    <div className="w-6 h-6 text-gray-600">
                      {hd.prefixIcons}
                    </div>
                  ),
                },
                label: hd.name,
                err: !selector[field[hd.key]]?.isValid,
                helper: selector[field[hd.key]]?.isValid
                  ? selector[field[hd.key]]?.validMessage
                  : selector[field[hd.key]]?.errorMessage,
                showHelper: selector[field[hd.key]]?.showMessage,
              }}
            />
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <>
      {data.categories.map((category, k) => {
        return (
          <div
            key={k}
            className="rounded-lg shadow-md m-3 p-2 border border-gray-200"
          >
            <h2 className="px-2 text-gray-800 font-semibold text-lg">
              {capitalize(category.name)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.headings
                .filter(
                  (head) =>
                    head.category === category.key && head.show !== false
                )
                .sort((a, b) => {
                  // Sort by isToggle, with true values coming first
                  if (a.formType === "toggle" && b.formType !== "toggle") {
                    return -1; // true comes first
                  } else if (
                    a.formType !== "toggle" &&
                    b.formType === "toggle"
                  ) {
                    return 1; // true comes first
                  } else {
                    return 0; // No change in order
                  }
                })
                .map((hd, k) => {
                  return (
                    <React.Fragment key={k}>
                      {renderSelected(hd)}
                    </React.Fragment>
                  );
                })}
              {data.headings
                .filter((hd) => hd.formType === "obj" && hd.child)
                .sort((a, b) => {
                  // Sort by isToggle, with true values coming first
                  if (a.formType === "toggle" && b.formType !== "toggle") {
                    return -1; // true comes first
                  } else if (
                    a.formType !== "toggle" &&
                    b.formType === "toggle"
                  ) {
                    return 1; // true comes first
                  } else {
                    return 0; // No change in order
                  }
                })
                .map((hd, key) => (
                  <React.Fragment key={key} >
                    {hd.formType === "obj" &&
                      hd.child &&
                      hd.child?.length > 0 &&
                      hd.child
                        .filter(
                          (ch) =>
                            ch.category === category.key && ch.show !== false
                        )
                        .map((ch) => {
                          return <>{renderSelected(ch)}</>;
                        })}
                  </React.Fragment>
                ))}

              {data.headings
                .filter((hd) => hd.formType === "array" && hd.child)
                .sort((a, b) => {
                  // Sort by isToggle, with true values coming first
                  if (a.formType === "toggle" && b.formType !== "toggle") {
                    return -1; // true comes first
                  } else if (
                    a.formType !== "toggle" &&
                    b.formType === "toggle"
                  ) {
                    return 1; // true comes first
                  } else {
                    return 0; // No change in order
                  }
                })
                .map((hd, key) => (
                  <React.Fragment key={key}>
                    <React.Fragment key={key+1}>
                      {
                        <div className="hidden">
                          <Input
                            props={{
                              inputType: {
                                type: "text",
                                name: field[hd.key],
                                value: JSON.stringify(arrayValfield),
                                placeholder: hd.placeholder,
                                classN: "w-[100%]",
                                label: "text",

                                onChange: (e: any) => {
                                  handleFormChange({
                                    event: e,
                                    dispatch,
                                  });
                                  regexCheckFormFields({
                                    event: e,
                                    dispatch,
                                    selector,
                                  });
                                },
                              },
                              prefix: hd.prefixIcons && {
                                element: (
                                  <div className="w-6 h-6 text-[var(--dark-2)]">
                                    {" "}
                                    {hd.prefixIcons}
                                  </div>
                                ),
                              },
                              label: hd.name,
                              err: !selector[field[hd.key]]?.isValid,
                              helper: selector[field[hd.key]]?.isValid
                                ? selector[field[hd.key]]?.validMessage
                                : selector[field[hd.key]]?.errorMessage,
                              showHelper: selector[field[hd.key]]?.showMessage,
                            }}
                          />
                        </div>
                      }
                      {hd.formType === "array" &&
                        hd.child &&
                        hd.child?.length > 0 &&
                        hd.child
                          .filter(
                            (ch) =>
                              ch.category === category.key && ch.show !== false
                          )
                          .map((ch, key) => {
                            return <React.Fragment key={key} >{renderSelected(ch)}</React.Fragment>;
                          })}
                    </React.Fragment>
                    <div className="mt-4">
                      {hd.formType === "array" &&
                        category.key === hd.category &&
                        arrayfield &&
                        arrayfield.length > 0 && (
                          <div className="mt-4 bg-gray-50 rounded-md p-2">
                            {arrayfield.map((hx, index) => (
                              <div
                                key={index}
                                className="flex items-center border border-gray-200 rounded-md p-2 mb-2"
                              >
                                {hx.map((d, di) => (
                                  <div key={di} className="flex-1">
                                    <ArrayDetails data={d} />
                                  </div>
                                ))}
                                <button
                                  onClick={() => deleteArrayBlock(index, hd)}
                                  className="p-2 text-red-500 rounded-full hover:bg-red-50"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                    {/* Add Button */}
                    {hd.formType === "array" &&
                      hd.child &&
                      category.key === hd.category && (
                        <div className="mt-4">
                          <button
                            onClick={() => addToArray(hd)}
                            className="flex items-center gap-2 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
                          >
                            <Plus className="h-4 w-4" />
                            <span>Add {hd.name}</span>
                          </button>
                        </div>
                      )}
                  </React.Fragment>
                ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

  


export function ArrayDetails({ data }: { data: PageHeadingI & { data: any } }) {
  // Check if data exists before accessing properties
  if (!data) return null;


  const formType = data.formType || "";

  // Helper for rendering the icon based on form type
  const renderIcon = () => {
    const className = "h-5 w-5 text-amber-200/40";

    if (data.prefixIcons) {
      return <div className="h-6 w-6 mx-1">{data.prefixIcons}</div>;
    }

    switch (formType) {
      case "file":
        return <File className={className} />;
      case "date":
        return <Calendar className={className} />;
      case "select":
      case "select2":
      case "select3":
        return <Tag className={className} />;
      default:
        return <Info className={className} />;
    }
  };

  return (
    <div className="w-full">
      {formType === "image" && (
        <div className="flex flex-row items-center my-2 pl-2 sm:pl-2 lg:pl-8 xl:pl-8">
          {renderIcon()}
          <div>
            <ImageAvatar
              height={40}
              imageUrl={data.data[data.key]}
              round={false}
              showView={true}
            />
            <div className="flex flex-row text-xs font-normal text-gray-700">
              {data.name}
            </div>
          </div>
        </div>
      )}

      {formType === "toggle" && (
        <div className="flex flex-row justify-between items-start my-2 mx-1 py-2 px-2 rounded-lg border-2 border-gray-200">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-amber-200/40" />
            <span className="text-sm font-medium text-gray-700">
              {data.name}
            </span>
          </div>
          <div>
            <StyledToggle checked={Boolean(data.data)} />
          </div>
        </div>
      )}

      {formType !== "toggle" && formType !== "image" && formType !== "obj" && (
        <div className="flex flex-row items-center my-2 pl-2 sm:pl-2 lg:pl-8 xl:pl-8">
          {renderIcon()}
          <div>
            <div className="text-sm font-semibold text-gray-800">
              {["select",'select2','select3'].includes(formType) ? (
                // Select field value display
                formType=='rawHtml' ? (
                  <RenderHtml
                    jsonData={parseNotification(
                      String(
                        data.keyValue ? findKeyByValue(data.keyValue , data.data) : data.data
                      ) || ""
                    )}
                  />
                ) : (
                  capitalize(
                        data.keyValue ? findKeyByValue(data.keyValue, data.data) : data.data 
                      ) 
                )
              ) : formType === "date" ? (
                // Date field display
                convertDateFormat(String(data.data))
              ) : // Default field display
              formType === "rawHtml" ? (
                <RenderHtml jsonData={parseNotification(String(data.data))} />
              ) : (
                capitalize(data.data) || ""   )}
            </div>
            <div className="text-xs font-normal text-gray-700">{data.name}</div>
          </div>
        </div>
      )}
    </div>
  );
} 
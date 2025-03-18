// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Grid, Typography } from "@mui/material";

// import React, { useEffect, useState } from "react";


// export function CreateCrud<T extends object>({
//   data,
// }: {
//   data: Pick<CruI, "name" | "headings" | "categories" | "type" | "data">;
// }) {
//   const name = data.name.toLowerCase().trim();
//   const fieldName = name.split(" ").join("-") + "-form";

//   const [kvMap, setKvMap]=useState<Record<string,any>>({})



// //handle image




// const [arrayfield, setArrayfield] = useState<Array<(CRUHeadingI&{data:any})>[] >([]);
// const [arrayValfield] = useState<
//   Array<Record<string, Array<CRUHeadingI & { data: any }>>>
// >([]);

//   const field: Record<string, any> = {};
//   const requiredField: Record<string, string> = {};
//   const selector = useAppSelector((state) => state.form);
//   const dispatch = useAppDispatch();

//   data.headings.forEach((heading) => {
//     if (heading.formType === "obj" && heading.child) {
//       heading.child.forEach((el) => {
//         const va = splitByUppercase(el.key).join("-");
//         field[el.key] = `${fieldName}-${va}`;
//         if (el.required) {
//           requiredField[el.key] = `${fieldName}-${va}`;
//         }
//       });
//     } 
//     else if (heading.formType === "array" && heading.child) {
//         const val = splitByUppercase(heading.key).join("-");
//         field[heading.key] = `${fieldName}-${val}`;
//         if (heading.required) {
//           requiredField[heading.key] = `${fieldName}-${val}`;
//         }

//       heading.child.forEach((el) => {
//         const va = splitByUppercase(el.key).join("-");
//         field[el.key] = `${fieldName}-${va}`;
//         if (el.required) {
//           requiredField[el.key] = `${fieldName}-${va}`;
//         }
//       });
//     } else {
//       const val = splitByUppercase(heading.key).join("-");
//       field[heading.key] = `${fieldName}-${val}`;
//       if (heading.required) {
//         requiredField[heading.key] = `${fieldName}-${val}`;
//       }
//     }
//   });

//   useEffect(() => {
//     if (data.type === "UPDATE" && data.data) {
//       const value: FormsReducerI = {};


//       Object.entries(field).map(([k, v]) => {
//         const heading = data.headings.find((h) => h.key === k);
//         if (heading?.formType === "date") {
//           const dte = data.data[k] && String(data.data[k]).slice(0, 10);
//           value[v] = {
//             value: dte,
//             isValid: true,
//             errorMessage: "",
//             validMessage: "",
//           };
//         } else if (heading?.formType === "select3") {
//           value[v] = {
//             value: data.data[k],
//             isValid: true,
//             errorMessage: "",
//             validMessage: "",
//           };
//         } else if (heading?.formType === "select") {
//           value[v] = {
//             value: data.data[k],
//             isValid: true,
//             errorMessage: "",
//             validMessage: "",
//           };
//         } else if (heading?.formType === "select2") {
//           value[v] = {
//             value: data.data[k],
//             isValid: true,
//             errorMessage: "",
//             validMessage: "",
//           };
//         } else if (
//           isMyProperty<T>(k, data.data as T) &&
//           heading?.formType !== "obj"
//         ) {
//           value[v] = {
//             value: data.data[k],
//             isValid: true,
//             errorMessage: "",
//             validMessage: "",
//           };
//         }




        
//         data.headings.filter((hd) => hd.formType === "array").map((hd) => { 
//           if (hd.child && hd.child.length > 1) {

//            const dataForArr:Array<CRUHeadingI&{data:any}> =[]

//             hd.child.forEach((el) => {


//               if (el.key === k) {
//                 if (el.formType === "date") {
//                   const dte =
//                     data.data[hd.key][k] &&
//                     String(data.data[hd.key][k]).slice(0, 10);
//                   value[v] = {
//                     value: dte,
//                     isValid: true,
//                     errorMessage: "",
//                     validMessage: "",
//                   };
//                 } else if (el.formType === "select") {
//                   value[v] = {
//                     value: data.data[hd.key][k],
//                     isValid: true,
//                     errorMessage: "",
//                     validMessage: "",
//                   };
//                 }
//                 else if (el.formType === "select2") {
//                   value[v] = {
//                     value: data.data[hd.key][k],
//                     isValid: true,
//                     errorMessage: "",
//                     validMessage: "",
//                   };
                  
//                 }
//                 else if (el.formType === "select3") {
//                   value[v] = {
//                     value: data.data[hd.key][k],
//                     isValid: true,
//                     errorMessage: "",
//                     validMessage: "",
//                   };
                  
//                 }
//                 else if (isMyProperty<T>(k, data.data[hd.key] as T)) {
//                   value[v] = {
//                     value: data.data[hd.key][k],
//                     isValid: true,
//                     errorMessage: "",
//                     validMessage: "",
//                   };

//                 }
//                 dataForArr.push({ ...el, data: data.data[hd.key] });
//               }
//             });
//             setArrayfield([...arrayfield, dataForArr])
//           }
//         })





//         data.headings
//           .filter((d) => d.formType === "obj" && d.child && d.child.length >= 1)
//           .map((e) => {
//             if (e.child && e.child.length > 1) {
//               e.child.forEach((el) => {
//                 if (el.key === k) {
//                   if (el.formType === "date") {
//                     const dte =
//                       data.data[e.key][k] &&
//                       String(data.data[e.key][k]).slice(0, 10);
//                     value[v] = {
//                       value: dte,
//                       isValid: true,
//                       errorMessage: "",
//                       validMessage: "",
//                     };
//                   } else if (el.formType === "select") {
//                     value[v] = {
//                       value: data.data[e.key][k],
//                       isValid: true,
//                       errorMessage: "",
//                       validMessage: "",
//                     };
//                   } else if (el.formType === "select2") {
//                     value[v] = {
//                       value: data.data[e.key][k],
//                       isValid: true,
//                       errorMessage: "",
//                       validMessage: "",
//                     };
//                   } else if (isMyProperty<T>(k, data.data[e.key] as T)) {
//                     value[v] = {
//                       value: data.data[e.key][k],
//                       isValid: true,
//                       errorMessage: "",
//                       validMessage: "",
//                     };
//                   }
//                 }
//               });
//             }
//           });
//       });

//       dispatch(setKeyValue(value));
     
//     }
//   }, [dispatch, /*  status, */ data.data, arrayValfield]);


// function addToArray(da: CRUHeadingI) {


//   if (!da.child) return;
//   const vl:boolean[] = []

//   // Map over the children and collect data
//   const ddd = da.child.map((d) => {
//     const data = selector[field[d.key]]?.value;
//     if (d.required && !data) {
//       toast.error(da.name + " cannot be empty");
//       validateFormKeys({ [field[d.key]]: selector[field[d.key]] }, dispatch);
//       vl.push(true)
//       return; // Flag this object as invalid
//     }else{
//     vl.push(false)
//     }

 
//     return { ...d, data };
//   });

//   if (vl.some(data=>data===true)) return;


//   // Convert the array to an object
//   const obj = ddd.reduce((acc, data) => {
//     if (data && data.key) {
//       acc[data.key] = data.data;
//     }
//     return acc;
//   }, {} as Record<string, any>);

//   // Initial array with the new object
//   const newArr = [obj];

//   // Iterate over arrayfield and convert each entry to an object
//   arrayfield.forEach((fi: (CRUHeadingI & { data: any })[]) => {
//     const newObj = fi.reduce((acc, data) => {
//       if (data && data.key) {
//         acc[data.key] = data.data;
//       }
//       return acc;
//     }, {} as Record<string, any>);
    
//     // Push only unique values (no repeating keys) if da.unique is true



// // lets get all keys are unique

    
// const filt = fi.filter((f) => f.unique);
// // now we have an array of unique keys lets check if the new object has any of the unique keys
//     if (filt.length >= 1) {
//     const itsAdded =  filt.some((f) => {
//         if (newObj[f.key] === obj[f.key]) {

//           return true;
//         }
//         return false;
//     })
//     if (!itsAdded) {
//       newArr.push(newObj);
//       }
      
  
//     } else {
//       newArr.push(newObj);
//     }

    
//   });

//   // Update the state with the new nested array

//   // Check if any of the keys in da.unique already exist in arrayfield
//   const isUniqueKeyPresent = ddd?.some((d) => {
//     if (d?.unique) {
//       return arrayfield.some((arr) => arr.some((a) => a.data === d.data));
//     } else {
//       return false;
//     }
//   });
//   if (!isUniqueKeyPresent) {
//     setArrayfield(
//       arrayfield
//         ? [...arrayfield, ddd as Array<CRUHeadingI & { data: any }>]
//         : [ddd as Array<CRUHeadingI & { data: any }>]
//     );
//   } else {
//     toast.error(`Duplicate key found in ${ddd?.filter((d) => {
//       if (d?.unique) {
//         return arrayfield.some((arr) => arr.some((a) => a.data === d.data))
//       } else {
//         return false
//       }
//     }).map((d) => d?.name).join(", ")}`);
//   }
//   // Dispatch the updated value
//   dispatch(
//     setKeyValue({
//       [field[da.key]]: {
//         value: newArr,
//       },
//     })
//   );
// }

// function deleteArrayBlock(indexToDelete: number, hd: CRUHeadingI) {
//   const updatedArray = arrayfield.filter((_, index) => index !== indexToDelete);
//   setArrayfield(updatedArray);



//  const newArr:Record<string, any >[] = [];
// updatedArray.forEach(
//   (
//     fi: (CRUHeadingI & {
//       data: any;
//     })[]
//   ) => {
//     const newObj = fi.reduce((acc, data) => {
//       if (data && data.key) {
//         acc[data.key] = selector[field[data.key as string]]?.value;
//       }
//       return acc;
//     }, {} as Record<string, any>);
//     newArr.push(newObj);
//   }
// );

//   dispatch(setKeyValue({ [field[hd.key]]: { value: newArr } }));

// }
//   return (
//     <>
//       {data.categories.map((category, k) => {
//         return (
//           <div key={k} className=" rounded-lg  shadow-[1px_1px_0px_0px_hsla(280,70%,80%,0.3),-1px_-1px_0px_0px_hsla(280,70%,80%,0.1)] m-3  p-2">
//             <Typography
//               sx={{
//                 display: "flex",
//                 justifyContent: "start",
//                 placeItems: "flex-start",
//                 fontWeight: "600",
//                 fontSize: "16px",
//               }}
//               className="px-2 text-[var(--primary-dark)]"
//             >
//               {capitalize({ text: category.name })}
//             </Typography>
//             <Grid
//               container
//               justifyContent="flex-start"
//               alignItems="flex-start"
//               xs={12}
//               sm={12}
//               lg={12}
//               md={12}
//               xl={12}
//             >
//               {data.headings
//                 .filter(
//                   (head) =>
//                     head.category === category.key && head.show !== false
//                 )
//                 .sort((a, b) => {
//                   // Sort by isToggle, with true values coming first
//                   if (a.isToggle && !b.isToggle) {
//                     return -1; // true comes first
//                   } else if (!a.isToggle && b.isToggle) {
//                     return 1; // true comes first
//                   } else {
//                     return 0; // No change in order
//                   }
//                 })
//                 .map((hd, k) => {
//                   return (
//                     <React.Fragment key={k}>
//                       {hd.formType === "select" && (
//                         <Grid
//                         item
//                           xs={12}
//                           sm={12}
//                           lg={6}
//                           md={12}
//                           xl={6}
//                           className="lg:px-6 sm:px-2 xl:px-6 md:px-2"
//                         >
//                           <SelectInput
//                             props={{
//                               prefix: {
//                                 element: (
//                                   <div className="w-6 h-6 text-[var(--dark-2)]">
//                                     {" "}
//                                     {hd.prefixIcons}
//                                   </div>
//                                 ),
//                               },
//                               label: hd.name,
//                               placeholder: hd.placeholder,
//                               err: !selector[field[hd.key]]?.isValid,
//                               helper: selector[field[hd.key]]?.isValid
//                                 ? selector[field[hd.key]]?.validMessage
//                                 : selector[field[hd.key]]?.errorMessage,
//                               showHelper: selector[field[hd.key]]?.showMessage,
//                               inputType: {
//                                 name: field[hd.key],

//                                 value: selector[field[hd.key]]?.value,
//                                 className: "",
//                                 required: hd.required,
//                                 disabled: hd.disabled ?? false,

//                                 onChange: (e: any) => {
//                                   handleFormChange({
//                                     event: e,
//                                     dispatch,
//                                   });
//                                   regexCheckFormFields({
//                                     event: e,
//                                     dispatch,
//                                   });

//                                   if (
//                                     hd.filter &&
//                                     hd.filter !== undefined &&
//                                     hd.filter.data
//                                   ) {
//                                     const filter = hd.filter.data.find((d) => {
//                                       return (
//                                         String(
//                                           d[
//                                             hd.filter!.parentFilterKey ?? hd.key
//                                           ]
//                                         ).toLowerCase() ===
//                                         String(e.target.value).toLowerCase()
//                                       );
//                                     });

//                                     if (filter) {
//                                       // reduce to object having key value pair
//                                       const da = (
//                                         filter[hd.filter.arrKey] as Record<
//                                           string,
//                                           any
//                                         >[]
//                                       ).reduce((acc, curr) => {
//                                         acc[curr[hd.filter!.childKey]] =
//                                           curr[hd.filter!.childValue];
//                                         return acc;
//                                       }, {} as Record<string, any>);

//                                       const linkd = data.headings.find(
//                                         (h) => h.key === hd.filter!.link
//                                       );
//                                       if (linkd) {
                                
//                                         setKvMap((prev)=>({...prev, [linkd.key]: da }));
//                                         linkd.kv = da;
//                                       }
//                                     }
//                                     // now we want to update the kv of the
//                                     // child with the data how can the parent now send this data to child select options
//                                     // we can use the kv prop to send the data to the child
//                                     // can i get a way to update the kv of the child
//                                   }
//                                 },
//                               },
//                               kv: hd.kv
//                                 ? hd.isKvChild
//                                   ? kvMap[hd.key]?kvMap[hd.key]:hd.kv 
//                                   : hd.kv
//                                 : {},
//                             }}
//                           />
//                         </Grid>
//                       )}
//                       {hd.formType === "select2" && (
//                         <Grid
//                           xs={12}
//                           sm={12}
//                           lg={6}
//                           md={12}
//                           xl={6}
//                           item
//                           className="lg:px-6 sm:px-2 xl:px-6 md:px-2"
//                         >
//                           <SelectInput2
//                             props={{
//                               prefix: {
//                                 element: (
//                                   <div className="w-6 h-6 text-[var(--dark-2)]">
//                                     {" "}
//                                     {hd.prefixIcons}
//                                   </div>
//                                 ),
//                               },
//                               label: hd.name,
//                               placeholder: hd.placeholder,
//                               err: !selector[field[hd.key]]?.isValid,
//                               helper: selector[field[hd.key]]?.isValid
//                                 ? selector[field[hd.key]]?.validMessage
//                                 : selector[field[hd.key]]?.errorMessage,
//                               showHelper: selector[field[hd.key]]?.showMessage,
//                               inputType: {
//                                 name: field[hd.key],

//                                 value: selector[field[hd.key]]?.value,
//                                 className: "",
//                                 required: hd.required,
//                                 disabled: hd.disabled ?? false,

//                                 onChange: ({
//                                   value,
//                                 }: {
//                                   key: string;
//                                   value: { value: any; description: string };
//                                 }) => {
//                                   dispatch(
//                                     setKeyValue({
//                                       [field[hd.key]]: {
//                                         value: value.value,
//                                       },
//                                     })
//                                   );
//                                   if (
//                                     hd.filter &&
//                                     hd.filter !== undefined &&
//                                     hd.filter.data
//                                   ) {
//                                     const filter = hd.filter.data.find((d) => {
//                                       return (
//                                         String(
//                                           d[
//                                             hd.filter!.parentFilterKey ?? hd.key
//                                           ]
//                                         ).toLowerCase() ===
//                                         String(value.value).toLowerCase()
//                                       );
//                                     });
//                                     if (filter) {
//                                       // reduce to object having key value pair
//                                       const da = (
//                                         filter[hd.filter.arrKey] as Record<
//                                           string,
//                                           any
//                                         >[]
//                                       ).reduce((acc, curr) => {
//                                         acc[curr[hd.filter!.childKey]] =
//                                           curr[hd.filter!.childValue];
//                                         return acc;
//                                       }, {} as Record<string, any>);

//                                       const linkd = data.headings.find(
//                                         (h) => h.key === hd.filter!.link
//                                       );

//                                       if (linkd) {
//                                         linkd.kv = da;
//                                       }
//                                     }
//                                  }
//                                 },
//                               },
//                               kv: hd.kv ? hd.kv : {},
//                             }}
//                           />
//                         </Grid>
//                       )}
//                       {hd.formType === "select3" && (
//                         <Grid
//                           xs={12}
//                           sm={12}
//                           lg={6}
//                           md={12}
//                           xl={6}
//                           item
//                           className="lg:px-6 sm:px-2 xl:px-6 md:px-2"
//                         >
//                           <SelectInput3
//                             props={{
//                               prefix: {
//                                 element: (
//                                   <div className="w-6 h-6 text-[var(--dark-2)]">
//                                     {" "}
//                                     {hd.prefixIcons}
//                                   </div>
//                                 ),
//                               },
//                               label: hd.name,
//                               placeholder: hd.placeholder,
//                               err: !selector[field[hd.key]]?.isValid,
//                               helper: selector[field[hd.key]]?.isValid
//                                 ? selector[field[hd.key]]?.validMessage
//                                 : selector[field[hd.key]]?.errorMessage,
//                               showHelper: selector[field[hd.key]]?.showMessage,
//                               inputType: {
//                                 name: field[hd.key],

//                                 value: selector[field[hd.key]]?.value,
//                                 className: "",
//                                 required: hd.required,
//                                 disabled: hd.disabled ?? false,

//                                 onChange: ({
//                                   value
//                                 }: {
//                                   key: string;
//                                   value: string;
//                                 }) => {

                        
//                                   dispatch(
//                                     setKeyValue({
//                                       [field[hd.key]]: {
//                                         value: value,
//                                         isValid: true,
//                                         showMessage: false,
//                                       },
//                                     })
//                                   );

//                                   if (
//                                     hd.filter &&
//                                     hd.filter !== undefined &&
//                                     hd.filter.data
//                                   ) {
//                                     const filter = hd.filter.data.find((d) => {
//                                       return (
//                                         String(
//                                           d[
//                                             hd.filter!.parentFilterKey ?? hd.key
//                                           ]
//                                         ).toLowerCase() ===
//                                         String(value).toLowerCase()
//                                       );
//                                     });
//                                     if (filter) {
//                                       // reduce to object having key value pair
//                                       const da = (
//                                         filter[hd.filter.arrKey] as Record<
//                                           string,
//                                           any
//                                         >[]
//                                       ).reduce((acc, curr) => {
//                                         acc[curr[hd.filter!.childKey]] =
//                                           curr[hd.filter!.childValue];
//                                         return acc;
//                                       }, {} as Record<string, any>);

//                                       const linkd = data.headings.find(
//                                         (h) => h.key === hd.filter!.link
//                                       );

//                                       if (linkd) {
//                                         linkd.kv = da;
//                                         console.log({ kvMap });
//                                         setKvMap((prev)=>({...prev, [linkd.key]: da }));
//                                       }
//                                     }
//                                 }
//                                 },
//                               },
//                               kv: hd.kv
//                                 ? hd.isKvChild
//                                   ? kvMap[hd.key]
//                                   : hd.kv
//                                 : {},
//                             }}
//                           />
//                         </Grid>
//                       )}

//                       {hd.formType === "toggle" && (
//                         <Grid
//                           xs={12}
//                           sm={12}
//                           lg={6}
//                           md={12}
//                           xl={6}
//                           item
//                           className="lg:px-6 sm:px-2 xl:px-6 md:px-2"
//                         >
//                           <Grid
//                             xs={12}
//                             item
//                             className="flex flex-row align-bottom place-items-baseline py-[6px]   justify-between shadow-[0.9px_1px_0px_0px_var(--gray-3),-1px_-0px_1px_0px_var(--gray-3)] active:shadow-[0.9px_1px_0px_0px_var(--primary),-1px_-1px_1px_0px_var(--primary)] hover:shadow-[0.9px_1px_0px_0px_var(--primary),-1px_-0px_1px_0px_var(--primary)]    transition-colors rounded-lg w-full  px-2 text-gray-800 leading-tight mt-7 "
//                           >
//                             {" "}
//                             {/* <div className="flex flex-row align-bottom items-stretch justify-between mt-4 "> */}
//                             <Typography
//                               sx={{
//                                 display: "flex",
//                                 justifyContent: "start",
//                                 placeItems: "center",
//                                 fontWeight: "500",
//                                 fontSize: "12px",
//                               }}
//                               className="px-4 text-black"
//                             >
//                               {hd.name}
//                             </Typography>{" "}
//                             <div className="">
//                               <StyledToggle
//                                 disabled={hd.disabled ?? false}
//                                 checked={Boolean(
//                                   selector[field[hd.key]]?.value
//                                 )}
//                                 onClick={() => {
//                                   dispatch(
//                                     setKeyValue({
//                                       [field[hd.key]]: {
//                                         value: !selector[field[hd.key]]?.value,
//                                       },
//                                     })
//                                   );
//                                 }}
//                               />
//                             </div>
//                             {/* </div> */}
//                           </Grid>
//                         </Grid>
//                       )}
//                       {hd.formType === "textarea1" && (
//                         <Grid
//                           xs={12}
//                           sm={12}
//                           lg={6}
//                           md={12}
//                           xl={6}
//                           item
//                           className="lg:px-6 sm:px-2 xl:px-6 md:px-2"
//                         >
//                           <Grid
//                             xs={12}
//                             item
//                             className="flex flex-col align-bottom place-items-baseline py-[6px]   justify-between   transition-colors rounded-lg w-full  px-2 text-gray-800 leading-tight mt-7 "
//                           >
//                             {" "}
//                             {/* <div className="flex flex-row align-bottom items-stretch justify-between mt-4 "> */}
//                             <div className="flex flex-row relative left-[-24px]">
//                               <div
//                                 className={mergeCssClass(
//                                   `text-[12px] capitalize  sm:pl-[16px] md:pl-[20px] xl:pl-[32px] lg:pl-[32px] `
//                                 )}
//                               >
//                                 {hd.name}
//                               </div>{" "}
//                               {hd.required && (
//                                 <div className="h-[16px] w-[24px] text-red-600">
//                                   <ImportantIcon />
//                                 </div>
//                               )}
//                             </div>
//                             <div className="">
//                               <StyledTextarea
//                                 value={selector[field[hd.key]]?.value}
//                                 onChange={() => {
//                                   dispatch(
//                                     setKeyValue({
//                                       [field[hd.key]]: {
//                                         value: !selector[field[hd.key]]?.value,
//                                       },
//                                     })
//                                   );
//                                 }}
//                               />
//                             </div>
//                             {/* </div> */}
//                           </Grid>
//                         </Grid>
//                       )}
//                       {hd.formType === "textarea2" && (
//                         <Grid
//                           xs={12}
//                           sm={12}
//                           lg={6}
//                           md={12}
//                           xl={6}
//                           item
//                           className="lg:px-6 sm:px-2 xl:px-6 md:px-4"
//                         >
//                           <Grid
//                             xs={12}
//                             item
//                             className="flex flex-col align-bottom place-items-baseline py-[6px]   justify-between   transition-colors rounded-lg w-full  px-2 text-gray-800 leading-tight mt-7 "
//                           >
//                             {" "}
//                             {/* <div className="flex flex-row align-bottom items-stretch justify-between mt-4 "> */}
//                             <div className="flex flex-row relative sm:left-[0px] xl:left-[-24px] 2xl:left-[-24px] lg:left-[-24px]">
//                               <div
//                                 className={mergeCssClass(
//                                   `text-[12px] capitalize  sm:pl-[16px] md:pl-[20px] xl:pl-[32px] lg:pl-[32px] `
//                                 )}
//                               >
//                                 {hd.name}
//                               </div>{" "}
//                               {hd.required && (
//                                 <div className="h-[16px] w-[24px] text-red-600">
//                                   <ImportantIcon />
//                                 </div>
//                               )}
//                             </div>
//                             <div className="">
//                               <PresetQuillEditor
//                                 initialValue={selector[field[hd.key]]?.value}
//                                 onChange={(id: any) => {
//                                   dispatch(
//                                     setKeyValue({
//                                       [field[hd.key]]: {
//                                         value: id,
//                                       },
//                                     })
//                                   );
//                                 }}
//                               />
//                             </div>
//                             {/* </div> */}
//                           </Grid>
//                         </Grid>
//                       )}

//                       {hd.formType !== "select" &&
//                         hd.formType !== "select2" &&
//                         hd.formType !== "select3" &&
//                         hd.formType !== "image" &&
//                         hd.formType !== "obj" &&
//                         hd.formType !== "toggle" &&
//                         hd.formType !== "textarea1" &&
//                         hd.formType !== "textarea2" &&
//                         hd.formType !== "array" && (
//                           <Grid
//                             xs={12}
//                             sm={12}
//                             lg={6}
//                             md={12}
//                             xl={6}
//                             item
//                             className="lg:px-6 sm:px-2 xl:px-6 md:px-2"
//                           >
//                             <Input
//                               props={{
//                                 inputType: {
//                                   type: hd.formType,
//                                   name: field[hd.key],
//                                   disabled: hd.disabled ?? false,

//                                   value: selector[field[hd.key]]?.value,
//                                   placeholder: hd.placeholder,

//                                   classN: "w-[100%]",
//                                   label: "text",
//                                   required: hd.required,
//                                   onChange: (e: any) => {
//                                     handleFormChange({
//                                       event: e,
//                                       dispatch,
//                                     });
//                                     regexCheckFormFields({
//                                       event: e,
//                                       dispatch,
//                                     });
//                                   },
//                                 },

//                                 prefix: hd.prefixIcons && {
//                                   element: (
//                                     <div className="w-6 h-6 text-[var(--dark-2)]">
//                                       {" "}
//                                       {hd.prefixIcons}
//                                     </div>
//                                   ),
//                                 },
//                                 label: hd.name,
//                                 err: !selector[field[hd.key]]?.isValid,
//                                 helper: selector[field[hd.key]]?.isValid
//                                   ? selector[field[hd.key]]?.validMessage
//                                   : selector[field[hd.key]]?.errorMessage,
//                                 showHelper:
//                                   selector[field[hd.key]]?.showMessage,
//                               }}
//                             />
//                           </Grid>
//                         )}
//                     </React.Fragment>
//                   );
//                 })}
//               {data.headings
//                 .filter((hd) => hd.formType === "obj" && hd.child)
//                 .sort((a, b) => {
//                   // Sort by isToggle, with true values coming first
//                   if (a.isToggle && !b.isToggle) {
//                     return -1; // true comes first
//                   } else if (!a.isToggle && b.isToggle) {
//                     return 1; // true comes first
//                   } else {
//                     return 0; // No change in order
//                   }
//                 })
//                 .map((hd) => (
//                   <>
//                     {hd.formType === "obj" &&
//                       hd.child &&
//                       hd.child?.length > 0 &&
//                       hd.child
//                         .filter(
//                           (ch) =>
//                             ch.category === category.key && ch.show !== false
//                         )
//                         .map((ch) => {
//                           return (
//                             <>
//                               {ch.formType === "select" && (
//                                 <Grid
//                                   item
//                                   xs={12}
//                                   sm={12}
//                                   lg={6}
//                                   md={12}
//                                   xl={6}
                            
//                                   className="lg:px-6 sm:px-2 xl:px-6 md:px-2"
//                                 >
//                                   <SelectInput
//                                     props={{
//                                       prefix: {
//                                         element: (
//                                           <div className="w-6 h-6 text-[var(--dark-2)]">
//                                             {" "}
//                                             {ch.prefixIcons}
//                                           </div>
//                                         ),
//                                       },
//                                       label: ch.name,

//                                       placeholder: ch.placeholder,
//                                       err: !selector[field[ch.key]]?.isValid,
//                                       helper: selector[field[ch.key]]?.isValid
//                                         ? selector[field[ch.key]]?.validMessage
//                                         : selector[field[ch.key]]?.errorMessage,
//                                       showHelper:
//                                         selector[field[ch.key]]?.showMessage,
//                                       inputType: {
//                                         name: field[ch.key],

//                                         value: selector[field[ch.key]]?.value,
//                                         className: "",
//                                         required: ch.required,
//                                         disabled: ch.disabled ?? false,

//                                         onChange: (e: any) => {
//                                           handleFormChange({
//                                             event: e,
//                                             dispatch,
//                                           });
//                                           regexCheckFormFields({
//                                             event: e,
//                                             dispatch,
//                                             selector,
//                                           });

//                                            if (
//                                              ch.filter &&
//                                              ch.filter !== undefined &&
//                                              ch.filter.data
//                                            ) {
//                                              const filter = ch.filter.data.find(
//                                                (d) =>
//                                                  String(
//                                                    d[
//                                                      ch.filter!
//                                                        .parentFilterKey ??
//                                                        ch.key
//                                                    ]
//                                                  ).toLowerCase() ===
//                                                  String(
//                                                    selector[field[ch.key]]
//                                                      ?.value
//                                                  ).toLowerCase()
//                                              );
//                                              if (filter) {
//                                                // reduce to object having key value pair
//                                                const da = (
//                                                  filter as Record<string, any>[]
//                                                ).reduce((acc, curr) => {
//                                                  acc[
//                                                    curr[ch.filter!.childKey]
//                                                  ] =
//                                                    curr[ch.filter!.childValue];
//                                                  return acc;
//                                                }, {} as Record<string, any>);

//                                                const linkd = data.headings.find(
//                                                  (h) =>
//                                                    h.key === ch.filter!.link
//                                                );
//                                                if (linkd) {
//                                                  linkd.kv = da;
//                                                }
//                                              }
//                                              // now we want to update the kv of the
//                                              // child with the data how can the parent now send this data to child select options
//                                              // we can use the kv prop to send the data to the child
//                                              // can i get a way to update the kv of the child
//                                            }
//                                         },
//                                       },
//                                       kv: ch.kv ? ch.kv : {},
//                                     }}
//                                   />
//                                 </Grid>
//                               )}
//                               {ch.formType === "select2" && (
//                                 <Grid
//                                   item
//                                   xs={12}
//                                   sm={12}
//                                   lg={6}
//                                   md={12}
//                                   xl={6}
                                
//                                   className="lg:px-6 sm:px-2 xl:px-6 md:px-2"
//                                 >
//                                   <SelectInput2
//                                     props={{
//                                       prefix: {
//                                         element: (
//                                           <div className="w-6 h-6 text-[var(--dark-2)]">
//                                             {" "}
//                                             {ch.prefixIcons}
//                                           </div>
//                                         ),
//                                       },
//                                       label: ch.name,

//                                       placeholder: ch.placeholder,
//                                       err: !selector[field[ch.key]]?.isValid,
//                                       helper: selector[field[ch.key]]?.isValid
//                                         ? selector[field[ch.key]]?.validMessage
//                                         : selector[field[ch.key]]?.errorMessage,
//                                       showHelper:
//                                         selector[field[ch.key]]?.showMessage,
//                                       inputType: {
//                                         name: field[ch.key],

//                                         value: selector[field[ch.key]]?.value,
//                                         className: "",
//                                         required: ch.required,
//                                         disabled: ch.disabled ?? false,

//                                         onChange: (e: any) => {
//                                           handleFormChange({
//                                             event: e,
//                                             dispatch,
//                                           });
//                                           regexCheckFormFields({
//                                             event: e,
//                                             dispatch,
//                                             selector,
//                                           });
//                                            if (ch.filter && ch.filter !== undefined && ch.filter.data) {
//     const filter = ch.filter.data.find(
//       (d) =>
//         String(d[ch.filter!.parentFilterKey ?? ch.key]).toLowerCase() ===
//         String(selector[field[ch.key]]?.value).toLowerCase()
//     );
//     if (filter) {
//       // reduce to object having key value pair
//       const da = (filter as Record<string, any>[]).reduce((acc, curr) => {
//         acc[curr[ch.filter!.childKey]] = curr[ch.filter!.childValue];
//         return acc;
//       }, {} as Record<string, any>);

//       const linkd = data.headings.find((h) => h.key === ch.filter!.link);
//       if (linkd) {
//         linkd.kv = da;
//       }
//     }
//     // now we want to update the kv of the
//     // child with the data how can the parent now send this data to child select options
//     // we can use the kv prop to send the data to the child
//     // can i get a way to update the kv of the child
//   }
//                                         },
//                                       },
//                                       kv: ch.kv ? ch.kv : {},
//                                     }}
//                                   />
//                                 </Grid>
//                               )}
//                               {ch.formType === "select3" && (
//                                 <Grid
//                                   item
//                                   xs={12}
//                                   sm={12}
//                                   lg={6}
//                                   md={12}
//                                   xl={6}
                          
//                                   className="lg:px-6 sm:px-2 xl:px-6 md:px-2"
//                                 >
//                                   <SelectInput3
//                                     props={{
//                                       prefix: {
//                                         element: (
//                                           <div className="w-6 h-6 text-[var(--dark-2)]">
//                                             {" "}
//                                             {ch.prefixIcons}
//                                           </div>
//                                         ),
//                                       },
//                                       label: ch.name,

//                                       placeholder: ch.placeholder,
//                                       err: !selector[field[ch.key]]?.isValid,
//                                       helper: selector[field[ch.key]]?.isValid
//                                         ? selector[field[ch.key]]?.validMessage
//                                         : selector[field[ch.key]]?.errorMessage,
//                                       showHelper:
//                                         selector[field[ch.key]]?.showMessage,
//                                       inputType: {
//                                         name: field[ch.key],

//                                         value: selector[field[ch.key]]?.value,
//                                         className: "",
//                                         required: ch.required,
//                                         disabled: ch.disabled ?? false,

//                                         onChange: (e: any) => {
//                                           handleFormChange({
//                                             event: e,
//                                             dispatch,
//                                           });
//                                           regexCheckFormFields({
//                                             event: e,
//                                             dispatch,
//                                             selector,
//                                           });
//                                            if (
//                                              ch.filter &&
//                                              ch.filter !== undefined &&
//                                              ch.filter.data
//                                            ) {
//                                              const filter = ch.filter.data.find(
//                                                (d) =>
//                                                  String(
//                                                    d[
//                                                      ch.filter!
//                                                        .parentFilterKey ??
//                                                        ch.key
//                                                    ]
//                                                  ).toLowerCase() ===
//                                                  String(
//                                                    selector[field[ch.key]]
//                                                      ?.value
//                                                  ).toLowerCase()
//                                              );
//                                              if (filter) {
//                                                // reduce to object having key value pair
//                                                const da = (
//                                                  filter as Record<string, any>[]
//                                                ).reduce((acc, curr) => {
//                                                  acc[
//                                                    curr[ch.filter!.childKey]
//                                                  ] =
//                                                    curr[ch.filter!.childValue];
//                                                  return acc;
//                                                }, {} as Record<string, any>);

//                                                const linkd = data.headings.find(
//                                                  (h) =>
//                                                    h.key === ch.filter!.link
//                                                );
//                                                if (linkd) {
//                                                  linkd.kv = da;
//                                                }
//                                              }
//                                              // now we want to update the kv of the
//                                              // child with the data how can the parent now send this data to child select options
//                                              // we can use the kv prop to send the data to the child
//                                              // can i get a way to update the kv of the child
//                                            }
//                                         },
//                                       },
//                                       kv: ch.kv ? ch.kv : {},
//                                     }}
//                                   />
//                                 </Grid>
//                               )}
//                               {ch.formType === "toggle" && (
//                                 <Grid
//                                   item
//                                   xs={12}
//                                   sm={12}
//                                   lg={6}
//                                   md={12}
//                                   xl={6}
//                                   className="lg:px-6 sm:px-2 xl:px-6 md:px-2"
//                                 >
//                                   <Grid
//                                     item
//                                     xs={12}
//                                     className="flex flex-row align-middle items-center"
//                                   >
//                                     {" "}
//                                     <Typography
//                                       sx={{
//                                         display: "flex",
//                                         justifyContent: "start",
//                                         placeItems: "center",
//                                         fontWeight: "500",
//                                         fontSize: "20px",
//                                       }}
//                                       className="px-8 text-[var(--primary-dark)]"
//                                     >
//                                       {ch.name}
//                                     </Typography>{" "}
//                                     <div className="">
//                                       <StyledToggle
//                                         disabled={ch.disabled ?? false}
//                                         checked={Boolean(
//                                           selector[field[ch.key]]?.value
//                                         )}
//                                         onClick={() =>
//                                           dispatch(
//                                             setKeyValue({
//                                               [field[ch.key]]: {
//                                                 value:
//                                                   !selector[field[ch.key]]
//                                                     ?.value,
//                                               },
//                                             })
//                                           )
//                                         }
//                                       />
//                                     </div>
//                                   </Grid>
//                                 </Grid>
//                               )}{" "}
//                               {ch.formType === "textarea1" && (
//                                 <Grid
//                                   xs={10}
//                                   sm={10}
//                                   lg={5}
//                                   md={10}
//                                   xl={5}
//                                   className="lg:px-6 sm:px-2 xl:px-6 md:px-2"
//                                 >
//                                   <Grid
//                                     xs={12}
//                                     item
//                                     className="flex flex-col align-bottom place-items-baseline py-[6px]   justify-between   transition-colors rounded-lg w-full  px-2 text-gray-800 leading-tight mt-7 "
//                                   >
//                                     {" "}
//                                     {/* <div className="flex flex-row align-bottom items-stretch justify-between mt-4 "> */}
//                                     <div className="flex flex-row relative left-[-24px]">
//                                       <div
//                                         className={mergeCssClass(
//                                           `text-[16px] capitalize  sm:pl-[16px] md:pl-[20px] xl:pl-[32px] lg:pl-[32px] `
//                                         )}
//                                       >
//                                         {ch.name}
//                                       </div>{" "}
//                                       {ch.required && (
//                                         <div className="h-[24px] w-[24px] text-red-600">
//                                           <ImportantIcon />
//                                         </div>
//                                       )}
//                                     </div>
//                                     <div className="">
//                                       <StyledTextarea
//                                         value={selector[field[ch.key]]?.value}
//                                         onChange={() => {
//                                           dispatch(
//                                             setKeyValue({
//                                               [field[ch.key]]: {
//                                                 value:
//                                                   !selector[field[ch.key]]
//                                                     ?.value,
//                                               },
//                                             })
//                                           );
//                                         }}
//                                       />
//                                     </div>
//                                     {/* </div> */}
//                                   </Grid>
//                                 </Grid>
//                               )}
//                               {ch.formType === "textarea2" && (
//                                 <Grid
//                                   item
//                                   xs={12}
//                                   sm={12}
//                                   lg={6}
//                                   md={12}
//                                   xl={6}
//                                   className="lg:px-6 sm:px-2 xl:px-6 md:px-2"
//                                 >
//                                   <Grid
//                                     xs={12}
//                                     item
//                                     className="flex flex-col align-bottom place-items-baseline py-[6px]   justify-between   transition-colors rounded-lg w-full  px-2 text-gray-800 leading-tight mt-7 "
//                                   >
//                                     {" "}
//                                     {/* <div className="flex flex-row align-bottom items-stretch justify-between mt-4 "> */}
//                                     <div className="flex flex-row relative left-[-24px]">
//                                       <div
//                                         className={mergeCssClass(
//                                           `text-[16px] capitalize  sm:pl-[16px] md:pl-[20px] xl:pl-[32px] lg:pl-[32px] `
//                                         )}
//                                       >
//                                         {ch.name}
//                                       </div>{" "}
//                                       {ch.required && (
//                                         <div className="h-[24px] w-[24px] text-red-600">
//                                           <ImportantIcon />
//                                         </div>
//                                       )}
//                                     </div>
//                                     <div className="">
//                                       <PresetQuillEditor
//                                         initialValue={
//                                           selector[field[ch.key]]?.value
//                                         }
//                                         onChange={(id: any) => {
//                                           dispatch(
//                                             setKeyValue({
//                                               [field[ch.key]]: {
//                                                 value: id,
//                                               },
//                                             })
//                                           );
//                                         }}
//                                       />
//                                     </div>
//                                     {/* </div> */}
//                                   </Grid>
//                                 </Grid>
//                               )}
//                               {ch.formType !== "select" &&
//                                 ch.formType !== "select2" &&
//                                 ch.formType !== "select3" &&
//                                 ch.formType !== "image" &&
//                                 ch.formType !== "obj" &&
//                                 ch.formType !== "toggle" &&
//                                 ch.formType !== "textarea1" &&
//                                 ch.formType !== "textarea2" &&
//                                 ch.formType !== "array" && (
//                                   <Grid
//                                     item
//                                     xs={12}
//                                     sm={12}
//                                     lg={6}
//                                     md={12}
//                                     xl={6}
//                                     className="lg:px-6 sm:px-2 xl:px-6 md:px-2"
//                                   >
//                                     <Input
//                                       props={{
//                                         inputType: {
//                                           type: ch.formType,
//                                           name: field[ch.key],
//                                           disabled: ch.disabled ?? false,

//                                           value: selector[field[ch.key]]?.value,
//                                           placeholder: ch.placeholder,

//                                           classN: "w-[100%]",
//                                           label: "text",
//                                           required: ch.required,
//                                           onChange: (e: any) => {
//                                             handleFormChange({
//                                               event: e,
//                                               dispatch,
//                                             });
//                                             regexCheckFormFields({
//                                               event: e,
//                                               dispatch,
//                                               selector,
//                                             });
//                                           },
//                                         },

//                                         prefix: ch.prefixIcons && {
//                                           element: (
//                                             <div className="w-6 h-6 text-[var(--dark-2)]">
//                                               {" "}
//                                               {ch.prefixIcons}
//                                             </div>
//                                           ),
//                                         },
//                                         label: ch.name,
//                                         err: !selector[field[ch.key]]?.isValid,
//                                         helper: selector[field[ch.key]]?.isValid
//                                           ? selector[field[ch.key]]
//                                               ?.validMessage
//                                           : selector[field[ch.key]]
//                                               ?.errorMessage,
//                                         showHelper:
//                                           selector[field[ch.key]]?.showMessage,
//                                       }}
//                                     />
//                                   </Grid>
//                                 )}
//                             </>
//                           );
//                         })}
//                   </>
//                 ))}

//               {data.headings
//                 .filter((hd) => hd.formType === "array" && hd.child)
//                 .sort((a, b) => {
//                   // Sort by isToggle, with true values coming first
//                   if (a.isToggle && !b.isToggle) {
//                     return -1; // true comes first
//                   } else if (!a.isToggle && b.isToggle) {
//                     return 1; // true comes first
//                   } else {
//                     return 0; // No change in order
//                   }
//                 })
//                 .map((hd) => (
//                   <>
//                     <>
//                       {
//                         <div className="hidden">
//                           <Input props={{
//                             inputType: {
//                               type: "text",
//                               name: field[hd.key],
//                               value: JSON.stringify(arrayValfield),
//                               placeholder: hd.placeholder,
//                               classN: "w-[100%]",
//                               label: "text",
                          
//                               onChange: (e: any) => {
//                                 handleFormChange({
//                                   event: e,
//                                   dispatch,
//                                 });
//                                 regexCheckFormFields({
//                                   event: e,
//                                   dispatch,
//                                   selector,
//                                 });
//                               },
//                             },
//                             prefix: hd.prefixIcons && {
//                               element: (
//                                 <div className="w-6 h-6 text-[var(--dark-2)]">
//                                   {" "}
//                                   {hd.prefixIcons}
//                                 </div>
//                               ),
//                             },
//                             label: hd.name,
//                             err: !selector[field[hd.key]]?.isValid,
//                             helper: selector[field[hd.key]]?.isValid
//                               ? selector[field[hd.key]]?.validMessage
//                               : selector[field[hd.key]]?.errorMessage,
//                             showHelper: selector[field[hd.key]]?.showMessage,
//                           }} />
//                         </div>
//                       }
//                       {hd.formType === "array" &&
//                         hd.child &&
//                         hd.child?.length > 0 &&
//                         hd.child
//                           .filter(
//                             (ch) =>
//                               ch.category === category.key && ch.show !== false
//                           )
//                           .map((ch) => {
//                             return (
//                               <>
//                                 {ch.formType === "select" && (
//                                   <Grid
//                                     item
//                                     xs={12}
//                                     sm={12}
//                                     lg={6}
//                                     md={12}
//                                     xl={6}
//                                     className="lg:px-6 sm:px-2 xl:px-6 md:px-2"
//                                   >
//                                     <SelectInput
//                                       props={{
//                                         prefix: {
//                                           element: (
//                                             <div className="w-6 h-6 text-[var(--dark-2)]">
//                                               {" "}
//                                               {ch.prefixIcons}
//                                             </div>
//                                           ),
//                                         },
//                                         label: ch.name,

//                                         placeholder: ch.placeholder,
//                                         err: !selector[field[ch.key]]?.isValid,
//                                         helper: selector[field[ch.key]]?.isValid
//                                           ? selector[field[ch.key]]
//                                               ?.validMessage
//                                           : selector[field[ch.key]]
//                                               ?.errorMessage,
//                                         showHelper:
//                                           selector[field[ch.key]]?.showMessage,
//                                         inputType: {
//                                           name: field[ch.key],

//                                           value: selector[field[ch.key]]?.value,
//                                           className: "",
//                                           required: ch.required,
//                                           disabled: ch.disabled ?? false,

//                                           onChange: (e: any) => {
//                                             handleFormChange({
//                                               event: e,
//                                               dispatch,
//                                             });
//                                             regexCheckFormFields({
//                                               event: e,
//                                               dispatch,
//                                               selector,
//                                             });

 

//                                           },
//                                         },
//                                         kv: ch.kv ? ch.kv : {},
//                                       }}
//                                     />
//                                   </Grid>
//                                 )}
//                                 {ch.formType === "select2" && (
//                                   <Grid
//                                     item
//                                     xs={12}
//                                     sm={12}
//                                     lg={6}
//                                     md={12}
//                                     xl={6}
//                                     className="lg:px-6 sm:px-2 xl:px-6 md:px-2"
//                                   >
//                                     <SelectInput2
//                                       props={{
//                                         prefix: {
//                                           element: (
//                                             <div className="w-6 h-6 text-[var(--dark-2)]">
//                                               {" "}
//                                               {ch.prefixIcons}
//                                             </div>
//                                           ),
//                                         },
//                                         label: ch.name,

//                                         placeholder: ch.placeholder,
//                                         err: !selector[field[ch.key]]?.isValid,
//                                         helper: selector[field[ch.key]]?.isValid
//                                           ? selector[field[ch.key]]
//                                               ?.validMessage
//                                           : selector[field[ch.key]]
//                                               ?.errorMessage,
//                                         showHelper:
//                                           selector[field[ch.key]]?.showMessage,
//                                         inputType: {
//                                           name: field[ch.key],

//                                           value: selector[field[ch.key]]?.value,
//                                           className: "",
//                                           required: ch.required,
//                                           disabled: ch.disabled ?? false,

//                                           onChange: (e: any) => {
//                                             handleFormChange({
//                                               event: e,
//                                               dispatch,
//                                             });
//                                             regexCheckFormFields({
//                                               event: e,
//                                               dispatch,
//                                               selector,
//                                             });
//                                           },
//                                         },
//                                         kv: ch.kv ? ch.kv : {},
//                                       }}
//                                     />
//                                   </Grid>
//                                 )}
//                                 {ch.formType === "toggle" && (
//                                   <Grid
//                                     item
//                                     xs={12}
//                                     sm={12}
//                                     lg={6}
//                                     md={12}
//                                     xl={6}
//                                     className="lg:px-6 sm:px-2 xl:px-6 md:px-2"
//                                   >
//                                     <Grid
//                                       item
//                                       xs={12}
//                                       className="flex flex-row align-middle items-center"
//                                     >
//                                       {" "}
//                                       <Typography
//                                         sx={{
//                                           display: "flex",
//                                           justifyContent: "start",
//                                           placeItems: "center",
//                                           fontWeight: "500",
//                                           fontSize: "20px",
//                                         }}
//                                         className="px-8 text-[var(--primary-dark)]"
//                                       >
//                                         {ch.name}
//                                       </Typography>{" "}
//                                       <div className="">
//                                         <StyledToggle
//                                           disabled={ch.disabled ?? false}
//                                           checked={Boolean(
//                                             selector[field[ch.key]]?.value
//                                           )}
//                                           onClick={() =>
//                                             dispatch(
//                                               setKeyValue({
//                                                 [field[ch.key]]: {
//                                                   value:
//                                                     !selector[field[ch.key]]
//                                                       ?.value 
//                                                 },
//                                               })
//                                             )
//                                           }
//                                         />
//                                       </div>
//                                     </Grid>
//                                   </Grid>
//                                 )}{" "}
//                                 {ch.formType === "textarea1" && (
//                                   <Grid
//                                     xs={10}
//                                     sm={10}
//                                     lg={5}
//                                     md={10}
//                                     xl={5}
//                                     className="lg:px-6 sm:px-2 xl:px-6 md:px-2"
//                                   >
//                                     <Grid
//                                       xs={12}
//                                       item
//                                       className="flex flex-col align-bottom place-items-baseline py-[6px]   justify-between   transition-colors rounded-lg w-full  px-2 text-gray-800 leading-tight mt-7 "
//                                     >
//                                       {" "}
//                                       {/* <div className="flex flex-row align-bottom items-stretch justify-between mt-4 "> */}
//                                       <div className="flex flex-row relative left-[-24px]">
//                                         <div
//                                           className={mergeCssClass(
//                                             `text-[16px] capitalize  sm:pl-[16px] md:pl-[20px] xl:pl-[32px] lg:pl-[32px] `
//                                           )}
//                                         >
//                                           {ch.name}
//                                         </div>{" "}
//                                         {ch.required && (
//                                           <div className="h-[24px] w-[24px] text-red-600">
//                                             <ImportantIcon />
//                                           </div>
//                                         )}
//                                       </div>
//                                       <div className="">
//                                         <StyledTextarea
//                                           value={selector[field[ch.key]]?.value}
//                                           onChange={() => {
//                                             dispatch(
//                                               setKeyValue({
//                                                 [field[ch.key]]: {
//                                                   value:
//                                                     !selector[field[ch.key]]
//                                                       ?.value,
//                                                 },
//                                               })
//                                             );
//                                           }}
//                                         />
//                                       </div>
//                                       {/* </div> */}
//                                     </Grid>
//                                   </Grid>
//                                 )}
//                                 {ch.formType === "textarea2" && (
//                                   <Grid
//                                     item
//                                     xs={12}
//                                     sm={12}
//                                     lg={6}
//                                     md={12}
//                                     xl={6}
//                                     className="lg:px-6 sm:px-2 xl:px-6 md:px-2"
//                                   >
//                                     <Grid
//                                       xs={12}
//                                       item
//                                       className="flex flex-col align-bottom place-items-baseline py-[6px]   justify-between   transition-colors rounded-lg w-full  px-2 text-gray-800 leading-tight mt-7 "
//                                     >
//                                       {" "}
//                                       {/* <div className="flex flex-row align-bottom items-stretch justify-between mt-4 "> */}
//                                       <div className="flex flex-row relative left-[-24px]">
//                                         <div
//                                           className={mergeCssClass(
//                                             `text-[16px] capitalize  sm:pl-[16px] md:pl-[20px] xl:pl-[32px] lg:pl-[32px] `
//                                           )}
//                                         >
//                                           {ch.name}
//                                         </div>{" "}
//                                         {ch.required && (
//                                           <div className="h-[24px] w-[24px] text-red-600">
//                                             <ImportantIcon />
//                                           </div>
//                                         )}
//                                       </div>
//                                       <div className="">
//                                         <PresetQuillEditor
//                                           initialValue={
//                                             selector[field[ch.key]]?.value
//                                           }
//                                           onChange={(id: any) => {
//                                             dispatch(
//                                               setKeyValue({
//                                                 [field[ch.key]]: {
//                                                   value: id,
//                                                 },
//                                               })
//                                             );
//                                           }}
//                                         />
//                                       </div>
//                                       {/* </div> */}
//                                     </Grid>
//                                   </Grid>
//                                 )}
//                                 {ch.formType !== "select" &&
//                                   ch.formType !== "select2" &&
//                                   ch.formType !== "select3" &&
//                                   ch.formType !== "image" &&
//                                   ch.formType !== "obj" &&
//                                   ch.formType !== "toggle" &&
//                                   ch.formType !== "textarea1" &&
//                                   ch.formType !== "textarea2" &&
//                                   ch.formType !== "array" && (
//                                     <Grid
//                                       item
//                                       xs={12}
//                                       sm={12}
//                                       lg={6}
//                                       md={12}
//                                       xl={6}
//                                       className="lg:px-6 sm:px-2 xl:px-6 md:px-2"
//                                     >
//                                       <Input
//                                         props={{
//                                           inputType: {
//                                             type: ch.formType,
//                                             name: field[ch.key],
//                                             disabled: ch.disabled ?? false,

//                                             value:
//                                               selector[field[ch.key]]?.value,
//                                             placeholder: ch.placeholder,

//                                             classN: "w-[100%]",
//                                             label: "text",
//                                             required: ch.required,
//                                             onChange: (e: any) => {
//                                               handleFormChange({
//                                                 event: e,
//                                                 dispatch,
//                                               });
//                                               regexCheckFormFields({
//                                                 event: e,
//                                                 dispatch,
//                                                 selector,
//                                               });
//                                             },
//                                           },

//                                           prefix: ch.prefixIcons && {
//                                             element: (
//                                               <div className="w-6 h-6 text-[var(--dark-2)]">
//                                                 {" "}
//                                                 {ch.prefixIcons}
//                                               </div>
//                                             ),
//                                           },
//                                           label: ch.name,
//                                           err: !selector[field[ch.key]]
//                                             ?.isValid,
//                                           helper: selector[field[ch.key]]
//                                             ?.isValid
//                                             ? selector[field[ch.key]]
//                                                 ?.validMessage
//                                             : selector[field[ch.key]]
//                                                 ?.errorMessage,
//                                           showHelper:
//                                             selector[field[ch.key]]
//                                               ?.showMessage,
//                                         }}
//                                       />
//                                     </Grid>
//                                   )}
//                               </>
//                             );
//                           })}
//                     </>
//                     <Grid
//                       container
//                       xs={12}
//                       sm={12}
//                       lg={12}
//                       md={12}
//                       xl={12}
//                       className="w-full custom-submerged-paper my-2"
//                     >
//                       {hd.formType === "array" &&
//                         category.key === hd.category &&
//                         arrayfield && arrayfield.map((hx, index) => {
                        
//                           return (
//                             <Grid
//                               item
//                               xs={12}
//                               sm={12}
//                               lg={6}
//                               md={12}
//                               xl={6}
//                               className="flex flex-row w-full gap-2 border-[0.5px] align-middle  justify-around place-items-center lg:px-6 sm:px-2 xl:px-6 md:px-2 "
//                             >
//                               {hx.map((d) => {
//                                 return (
//                                   <div>
//                                     <ArrayDetails data={d} />{" "}
//                                   </div>
//                                 );
//                               })}

//                               {arrayfield && arrayfield.length >= 1 && (
//                                 <div className=" custom-submerged-paper rounded-full p-2 cursor-pointer">
//                                   <div
//                                     onClick={() =>{ 
                                      
//                                       deleteArrayBlock(index, hd)
//                                     }}
//                                     className=" text-red-500 h-8 w-8 "
//                                   >
//                                     <myIcons.TrashIcon />
//                                   </div>
//                                 </div>
//                               )}
//                             </Grid>
//                           );
//                         })}
//                     </Grid>
//                     {hd.formType === "array" &&
//                       category.key === hd.category &&
//                       hd.child && (
//                         <div className="mt-2 cursor-pointer flex flex-row align-middle place-items-center custom-elevated-paper px-1">
//                           <div className="w-8 h-8 custom-submerged-paper rounded-full ">
//                             <myIcons.PlusIcon />
//                           </div>
//                           <div
//                             className=" p-4 pointer"
//                             onClick={() => {
//                               if (hd.child) {
//                                 addToArray(hd)
                               
//                               }
//                             }}
//                           >
//                             add {hd.name}
//                           </div>
//                         </div>
//                       )}
//                   </>
//                 ))}
//             </Grid>
//           </div>
//         );
//       })}
//     </>
//   );
// }





// /* eslint-disable @typescript-eslint/no-explicit-any */


// export function ArrayDetails({ data }: { data: CRUHeadingI&{
//   data:any
// } }) {
  
 

//                   const isRawHtml = data?.isRawHtml ? data.isRawHtml : false;


//   return (
//     <>
//       {data ? (
//         <div className={"w-full "}>
//           {data.formType === "image" && (
//             <div className="flex flex-row sm:pl-2 xl:pl-8 2xl:8  lg:pl-8 align-middle items-center my-2">
//               <div className={"h-6 w-6 mx-1 text-[hsla(27,73%,70%,0.4)] "}>
//                 {data.prefixIcons}
//               </div>
//               <div>
//                 {" "}
//                 <ImageAvatar
//                   height={40}
//                   imageUrl={data.data[data.key]}
//                   round={false}
//                   showView={true}
//                 />
//                 <div className="flex flex-row align-bottom text-[12px] font-normal text-[var(--primary-dark)]">
//                   {data.name}
//                 </div>
//               </div>
//             </div>
//           )}
//           {data.isToggle && (
//             <div className="flex flex-row align-middle justify-between pl-2 items-start my-2  mx-1 py-2 rounded-lg border-2 ">
//               {" "}
//               <Typography
//                 sx={{
//                   display: "flex",
//                   justifyContent: "start",
//                   placeItems: "center",
//                   fontWeight: "500",
//                   fontSize: "14px",
//                 }}
//                 className="px-8 text-[var(--primary-dark)]"
//               >
//                 {data.name}
//               </Typography>{" "}
//               <div className="">
//                 <StyledToggle checked={Boolean(data.data)} />
//               </div>
//             </div>
//           )}
//           {data.formType !== "image" &&
//             data.formType !== "obj" &&
//             data.formType !== "select" &&
//             data.formType !== "date" &&
//             !data.isToggle && (
//               <div className="flex flex-row sm:pl-2 xl:pl-8 2xl:8  lg:pl-8 align-middle items-center my-2">
//                 <div className={"h-6 w-6 mx-1 text-[hsla(27,73%,70%,0.4)] "}>
//                   {data.prefixIcons}
//                 </div>
//                 <div>
//                   <div className="text-[14px] text-[var(--primary-darkest)]  font-semibold">
//                     {" "}
//                     {isRawHtml ? (
//                       <RenderHtml
//                         jsonData={parseNotification(String(data.data))}
//                       />
//                     ) : (
//                       capitalize({
//                         text: String(data.data) ?? "",
//                       })
//                     )}
//                   </div>
//                   <div className="flex flex-row align-bottom text-[12px] font-normal text-[var(--primary-dark)]">
//                     <div>{data.name}</div>
//                   </div>{" "}
//                 </div>
//               </div>
//             )}
//           {data.formType === "select" && (
//             <div className="flex flex-row sm:pl-2 xl:pl-8 2xl:8  lg:pl-8 align-middle items-center my-2">
//               <div className={"h-6 w-6 mx-1 text-[hsla(27,73%,70%,0.4)] "}>
//                 {data.prefixIcons}
//               </div>
//               <div>
//                 <div className="text-[14px] text-[var(--primary-darkest)]  font-semibold">
//                   {" "}
//                   {isRawHtml ? (
//                     <RenderHtml
//                       jsonData={parseNotification(
//                         String(
//                           data.kv
//                             ? findKeyByValue(data.kv, data.data)
//                             : data.data
//                         )??''
//                       )}
//                     />
//                   ) : (
//                     capitalize({
//                       text:
//                         String(
//                           data.kv
//                             ? findKeyByValue(data.kv, data.data)
//                             : data.data
//                         ) ?? "",
//                     })
//                   )}
//                 </div>
//                 <div className="flex flex-row align-bottom text-[12px] font-normal text-[var(--primary-dark)]">
//                   <div>{data.name}</div>
//                 </div>{" "}
//               </div>
//             </div>
//           )}
//           {data.formType === "date" && (
//             <div className="flex flex-row sm:pl-2 xl:pl-8 2xl:8  lg:pl-8 align-middle items-center my-2">
//               <div className={"h-6 w-6 mx-1 text-[hsla(27,73%,70%,0.4)] "}>
//                 {data.prefixIcons}
//               </div>
//               <div>
//                 <div className="text-[14px] text-[var(--primary-darkest)]  font-semibold">
//                   {convertDateFormat(String(data.data))}
//                 </div>
//                 <div className="flex flex-row align-bottom text-[12px] font-normal text-[var(--primary-dark)]">
//                   <div>{data.name}</div>
//                 </div>{" "}
//               </div>
//             </div>
//           )}
//         </div>
//       ) : (
//         <></>
//       )}
//     </>
//   );   
// }

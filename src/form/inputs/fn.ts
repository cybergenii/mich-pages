/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * The `filterInputProps` function filters out undefined values from an object and returns a new object
 * with only the defined values.
 * @param {T} obj - The `obj` parameter is a generic type `T` that extends `Record<string, any>`. This
 * means that `obj` is an object that can have any number of properties with any value types.
 * @returns The function `filterInputProps` returns a new object that contains only the properties from
 * the input object `obj` that have a defined value.
 */
export const filterInputProps = <T extends Record<string, any>>(
  obj: T
): Partial<T & Record<any, any>> => {
  return Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(obj).filter(([_key, value]) => value !== undefined)
  );
};

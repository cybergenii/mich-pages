/**
 * The function `deleteEmptyKeysAndValues` removes keys with empty values from an object in TypeScript.
 * @param {T} data - The `data` parameter in the `deleteEmptyKeysAndValues` function is an object of
 * type `T`, where `T` represents the type of the input data. The function filters out any keys with
 * empty values (undefined, empty string, or null) from the input object and returns a
 * @returns The `deleteEmptyKeysAndValues` function returns a new object that contains only the
 * non-empty keys and values from the input object `data`.
 */
export function deleteEmptyKeysAndValues<T>(data: T): Partial<T> {
  const filteredData: Partial<T> = {};

  for (const key in data) {
    if (data[key] !== undefined && data[key] !== "" && data[key] !== null) {
      filteredData[key] = data[key];
    }
  }

  return filteredData;
}

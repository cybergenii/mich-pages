export function isMyProperty<T extends object>(
  key: string,
  obj: T
): key is Extract<keyof T, string> {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

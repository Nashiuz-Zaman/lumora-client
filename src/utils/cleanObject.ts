import pickBy from "lodash/pickBy";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cleanObject = <T extends Record<string, any>>(
  obj: T
): Partial<T> => {
  return pickBy(
    obj,
    (value) => value !== undefined && value !== null && value !== ""
  ) as Partial<T>;
};

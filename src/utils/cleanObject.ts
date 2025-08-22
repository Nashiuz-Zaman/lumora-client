import pickBy from "lodash/pickBy";

export const cleanObject = <T extends Record<string, unknown>>(
  obj: T
): Partial<T> => {
  return pickBy(
    obj,
    (value) => value !== undefined && value !== null && value !== ""
  ) as Partial<T>;
};

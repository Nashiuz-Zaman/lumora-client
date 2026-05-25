import pickBy from "lodash/pickBy";
import isEmpty from "lodash/isEmpty";

export const cleanObject = <T extends Record<string, any>>(
  obj: T
): Partial<T> => {
  return pickBy(
    obj,
    (value) =>
      value !== undefined &&
      value !== null &&
      value !== "" &&
      !(typeof value === "object" && isEmpty(value))
  ) as Partial<T>;
};

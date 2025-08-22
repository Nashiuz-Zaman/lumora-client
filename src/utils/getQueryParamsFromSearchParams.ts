export const getQueryParamsFromSearchParams = (
  searchParams: URLSearchParams,
  keys: string[]
): Record<string, string | number | boolean> => {
  const result: Record<string, string | number | boolean> = {};

  for (const key of keys) {
    const value = searchParams.get(key);

    if (value === "true") {
      result[key] = true;
    } else if (value === "false") {
      result[key] = false;
    } else if (value !== null && value !== "" && !isNaN(Number(value))) {
      result[key] = Number(value);
    } else {
      result[key] = value ?? "";
    }
  }

  return result;
};

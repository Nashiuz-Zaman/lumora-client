export const buildUrlWithParams = (
  basePath: string,
  queryParams: Record<string, string | number | boolean | null | undefined>
): string => {
  const params = new URLSearchParams();

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value != null && value !== "") {
      params.set(key, String(value));
    }
  });

  return `${basePath}?${params.toString()}`;
};

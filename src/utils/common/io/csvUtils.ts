/**
 * Convert a comma-separated string into a Record<string, boolean>
 */
export const csvToBooleanRecord = (csv?: string): Record<string, boolean> => {
  if (!csv) return {};
  return csv.split(",").reduce<Record<string, boolean>>((acc, id) => {
    acc[id] = true;
    return acc;
  }, {});
};

/**
 * Convert Record<string, boolean> into a comma-separated string
 */
export const booleanRecordToCsv = (
  record?: Record<string, boolean>
): string => {
  if (!record) return "";
  return Object.entries(record)
    .filter(([, v]) => v) // only include truthy
    .map(([k]) => k) // take keys
    .join(",");
};

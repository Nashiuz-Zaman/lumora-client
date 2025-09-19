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

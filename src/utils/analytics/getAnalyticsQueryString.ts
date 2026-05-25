export const getAnalyticsQueryParams = ({
  month,
  year,
}: {
  month?: string;
  year?: string;
}): Record<string, string> => {
  // If both are missing, treat as "All Time"
  if (!month && !year) return {};

  const params: Record<string, string> = {};
  if (month) params.month = month;
  if (year) params.year = year;

  return params;
};

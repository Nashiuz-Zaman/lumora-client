import { IAnalyticDateParams } from "@/types";

export const generateChartTitle = (
  label: string,
  dateRange?: IAnalyticDateParams
): string => {
  if (!dateRange) return `${label} overview`;

  const { month, year } = dateRange;
  const currentYear = new Date().getFullYear();

  const monthNames = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthLabel = month ? monthNames[month] : null;
  const yearLabel = year ?? (monthLabel ? currentYear : null);

  const suffix = monthLabel
    ? `${monthLabel} ${yearLabel}`
    : yearLabel
    ? `${yearLabel}`
    : "All Time";

  return `${label} (${suffix})`;
};

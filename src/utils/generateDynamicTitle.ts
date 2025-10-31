import { IAnalyticDateParams } from "@/types";

export const generateDynamicTitle = (
  label: string,
  filter?: IAnalyticDateParams
): string => {
  if (!filter) return `${label} Overview`;

  const currentYear = new Date().getFullYear();
  const { month, year } = filter;

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

  const resolvedMonth = month && monthNames[month] ? monthNames[month] : null;

  if (resolvedMonth && year !== undefined) {
    return `${label} in ${resolvedMonth} ${year}`;
  }

  if (resolvedMonth && year === undefined) {
    return `${label} in ${resolvedMonth}, ${currentYear}`;
  }

  if (!resolvedMonth && year !== undefined) {
    return `${label} in ${year}`;
  }

  return `${label} Overview`;
};

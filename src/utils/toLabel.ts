/**
 * Converts camelCase or lowercase field keys to human-friendly labels.
 * - sku -> SKU
 * - discountPercentage -> Discount Percentage
 */
export function toLabel(key: string): string {
  // Special known abbreviations (extend as needed)
  const specialCases: Record<string, string> = {
    sku: "SKU",
    id: "ID",
    url: "URL",
  };

  if (specialCases[key.toLowerCase()]) {
    return specialCases[key.toLowerCase()];
  }

  // Insert spaces before capital letters, then capitalize first letter
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

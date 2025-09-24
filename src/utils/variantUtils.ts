export interface IVariant {
  _id?: string;
  sku: string;
  stock: number;
  price: number;
  oldPrice?: number;
  discountPercentage?: number;
  [key: string]: unknown;
}

const fixedKeys = [
  "_id",
  "id",
  "sku",
  "stock",
  "price",
  "oldPrice",
  "discountPercentage",
];

export const getVariantOptionKeys = (variants: IVariant[]): string[] => {
  if (!variants.length) return [];
  return Object.keys(variants[0]).filter((key) => !fixedKeys.includes(key));
};

export const getVariantOptionValues = (
  variants: IVariant[],
  optionKeys: string[]
): Record<string, string[]> => {
  const values: Record<string, string[]> = {};
  optionKeys.forEach((key) => {
    const set = new Set<string>();
    variants.forEach((variant) => {
      if (variant[key]) set.add(String(variant[key]));
    });
    values[key] = Array.from(set);
  });
  return values;
};

export const findMatchedVariant = (
  variants: IVariant[],
  optionKeys: string[],
  selectedOptions: Record<string, string>
): IVariant | undefined => {
  return variants.find((variant) =>
    optionKeys.every(
      (key) => selectedOptions[key] && variant[key] === selectedOptions[key]
    )
  );
};

export const buildVariantLabel = (
  selectedOptions: Record<string, string>,
  optionKeys: string[]
): string => {
  if (Object.keys(selectedOptions).length === 0) return "";
  return optionKeys.map((key) => `${selectedOptions[key] ?? "?"}`).join(" + ");
};

export type TSortOptions<T extends Record<string, any>> = Readonly<
  {
    label: string;
    value: keyof T;
  }[]
>;

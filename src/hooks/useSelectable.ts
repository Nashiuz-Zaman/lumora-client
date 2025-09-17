"use client";

import isEqual from "lodash/isEqual";
import { useState, useMemo, useEffect } from "react";

export const useSelectable = <T extends Record<string, any>, K extends keyof T>(
  data: T[] = [],
  keyField: K
) => {
  const [selected, setSelected] = useState<T[K][]>([]);
  const [single, setSingle] = useState<T[K] | null>(null);

  const dataKeys = useMemo(
    () => data.map((item) => item[keyField]),
    [data, keyField]
  );

  const newSelected = selected.filter((id) => dataKeys.includes(id));

  // Remove any selected IDs that are not in current data
  useEffect(() => {
    if (!isEqual(selected, newSelected)) {
      setSelected(newSelected);
    }
  }, [dataKeys, selected, newSelected]);

  const checkIfSelected = (item: T) => selected.includes(item[keyField]);

  const isAllSelected =
    selected.length > 0 && selected.length === dataKeys.length;

  const toggleSelectOne = (item: T) => {
    const id = item[keyField];
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelected((prev) => (prev.length === dataKeys.length ? [] : dataKeys));
  };

  const removeSingle = () => setSingle(null);

  const selectedData = useMemo(
    () => data.filter((item) => selected.includes(item[keyField])),
    [data, selected, keyField]
  );

  return {
    selected,
    setSelected,
    selectedData,
    toggleSelectOne,
    toggleSelectAll,
    checkIfSelected,
    isAllSelected,
    single,
    setSingle,
    removeSingle,
  };
};

// Export the hook’s return type for reuse
export type TUseSelectableReturn<
  T extends Record<string, any>,
  K extends keyof T
> = ReturnType<typeof useSelectable<T, K>>;

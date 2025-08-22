"use client";

import isEqual from "lodash/isEqual";
import { useState, useMemo, useEffect } from "react";

//  Type for keyfield such as "_id"
type KeyField<T> = keyof T & string;

export const useSelectable = <T extends Record<string, unknown>>(
  data: T[] = [],
  keyField: KeyField<T> = "_id" as KeyField<T>
) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [single, setSingle] = useState<string | null>(null);

  const dataKeys = useMemo(
    () => data.map((item) => String(item[keyField])),
    [data, keyField]
  );

  const newSelected = selected.filter((id) => dataKeys.includes(id));

  // Remove any selected IDs that are not in current data
  useEffect(() => {
    if (!isEqual(selected, newSelected)) {
      setSelected(newSelected);
    }
  }, [dataKeys, selected, newSelected]);

  const checkIfSelected = (item: T, customKey: KeyField<T> = keyField) => {
    const id = String(item?.[customKey]);
    return selected.includes(id);
  };

  const isAllSelected =
    selected.length > 0 && selected.length === dataKeys.length;

  const toggleSelectOne = (item: T, customKey: KeyField<T> = keyField) => {
    const id = String(item?.[customKey]);
    if (!id) return;
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelected((prev) => (prev.length === dataKeys.length ? [] : dataKeys));
  };

  const removeSingle = () => setSingle(null);

  const selectedData = useMemo(
    () => data.filter((item) => selected.includes(String(item[keyField]))),
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

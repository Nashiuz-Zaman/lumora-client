"use client";

import { useState, useCallback, useEffect, use } from "react";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { useLazySearchInSearchbarQuery } from "@/libs/redux/apiSlices/product/productApiSlice";
import { useClickOutside } from "./useClickOutside";

export const useSearchbar = (
  delay: number = 300,
  modalClassName: string = ""
) => {
  const [searchText, setSearchText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  useClickOutside(isResultModalOpen, (e) => {
    if (modalClassName) {
      const target = e.target as HTMLElement | null;
      if (!target?.closest("." + modalClassName)) {
        setResults([]);
        setIsResultModalOpen(false);
      }
    }
  });

  const [trigger, { data, isFetching, isError }] =
    useLazySearchInSearchbarQuery();

  // Debounced API call
  const [debouncedSearch, cancelDebounce] = useDebouncedCallback(
    (text: string) => {
      trigger(text);
    },
    delay
  );
  const [changeDebouncedText, cancelDebouncedText] = useDebouncedCallback(
    (text: string) => {
      setDebouncedText(text);
    },
    delay
  );

  // Handle input change (instant display)
  const handleChange = useCallback((text: string) => {
    setSearchText(text); // update input immediately
  }, []);

  useEffect(() => {
    if (searchText.trim().length === 0) {
      cancelDebouncedText();
    }

    changeDebouncedText(searchText);
  }, [searchText, cancelDebouncedText, changeDebouncedText]);

  useEffect(() => {
    console.log(debouncedText);
  }, [debouncedText]);

  // Update results when API returns
  useEffect(() => {
    if (!isFetching && data?.data?.products) {
      const products = data.data.products;
      setResults(products);
      setIsResultModalOpen(products.length > 0);
    }
  }, [data, isFetching]);

  return {
    searchText,
    debouncedText,
    handleChange,
    results,
    setResults,
    queryMeta: data?.data?.queryMeta,
    isFetching,
    isError,
    isResultModalOpen,
    setIsResultModalOpen,
  };
};

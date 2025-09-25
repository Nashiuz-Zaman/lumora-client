"use client";

import { useState, useEffect, useCallback, useRef, FormEvent } from "react";
import { ButtonBtnTrans } from "./buttons";
import { SearchIcon } from "./icons";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { useClickOutside } from "@/hooks/useClickOutside";

interface ISearchbarProps<T> {
  className?: string;
  showIcon?: boolean;
  modalClassName?: string;
  debounceDelay?: number;
  onSubmit?: (text: string) => void;
  onChange?: (text: string) => void;
  trigger?: (text: string) => void; // RTK query trigger function
  results?: T[];
  renderResult?: (
    item: T,
    index: number,
    onClick: () => void
  ) => React.ReactNode;
}

export const Searchbar = <T,>({
  className = "",
  showIcon = true,
  modalClassName = "",
  onSubmit = () => {},
  onChange = () => {},
  debounceDelay = 350,
  trigger,
  results: parentResults,
  renderResult,
}: ISearchbarProps<T>) => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<T[]>(parentResults || []);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close modal
  useClickOutside(isResultModalOpen, (e) => {
    if (!containerRef.current?.contains(e.target as Node)) {
      setIsResultModalOpen(false);
    }
  });

  // Debounced API call
  const [debouncedTrigger, cancelDebounced] = useDebouncedCallback(
    (text: string) => {
      trigger?.(text);
    },
    debounceDelay
  );

  // Input change handler
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchText(value);

      if (value.trim().length <= 2) {
        setIsResultModalOpen(false);
        setResults([]);
        return;
      }

      onChange?.(value);
      setIsResultModalOpen(true);
      debouncedTrigger(value);
    },
    [debouncedTrigger, onChange]
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const searchText = (
      form.elements.namedItem("searchText") as HTMLInputElement
    ).value;

    onSubmit?.(searchText);
  };

  // Sync with parent results if provided
  useEffect(() => {
    if (parentResults) setResults(parentResults);
  }, [parentResults]);

  useEffect(() => {
    if (searchText.length <= 2) {
      cancelDebounced();
      setIsResultModalOpen(false);
      setResults([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full sm:max-w-[20rem] xl:max-w-[24rem] 2xl:max-w-[35rem] 4xl:max-w-[50rem] ${className}`}
    >
      <form
        onSubmit={handleSubmit}
        className="flex w-full rounded overflow-hidden border border-white/30 bg-white/10 backdrop-blur items-center"
      >
        <input
          type="text"
          name="searchText"
          value={searchText}
          placeholder="Search for products"
          onChange={handleChange}
          className="w-full px-3 py-2 sm:py-2.5 md:py-3 text-white placeholder-white/70 bg-transparent focus:outline-none focus:ring-2 focus:ring-white/50 text-sm md:text-base"
        />

        {showIcon && (
          <ButtonBtnTrans type="submit">
            <SearchIcon className="px-3 text-white 2md:text-2xl" />
          </ButtonBtnTrans>
        )}
      </form>

      {isResultModalOpen && results && results.length > 0 && renderResult && (
        <div
          className={`absolute left-0 right-0 mt-1 bg-white shadow-lg border border-neutral-200 z-500 ${modalClassName}`}
        >
          <ul className="divide-y divide-neutral-100">
            {results.map((item, i) => (
              <li key={`key-${i}`}>
                {renderResult(item, i, () => {
                  setIsResultModalOpen(false);
                  setResults([]);
                })}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

"use client";

import { Icon } from "@iconify/react";

export const SearchBox = () => {
  return (
    <form
      // TODO: add onSubmit logic later
      className="w-full flex items-center gap-2 bg-white border border-neutral-200 rounded-xl px-4 py-3 lg:w-[50%]"
    >
      <Icon icon="mdi:magnify" className="text-neutral-500 text-xl shrink-0" />

      <input
        type="text"
        placeholder="Search orders..."
        className="w-full bg-transparent outline-none text-neutral-700 placeholder:text-neutral-400"
        // TODO: add onChange debounce logic here
      />
    </form>
  );
};

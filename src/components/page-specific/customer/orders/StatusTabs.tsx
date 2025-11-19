"use client";

import { useState } from "react";

interface IStatusTabsProps {
  statuses: string[];
}

export const StatusTabs = ({ statuses }: IStatusTabsProps) => {
  const [active, setActive] = useState("All");

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      {statuses.map((status) => (
        <button
          key={status}
          type="button"
          onClick={() => {
            setActive(status);
            // TODO: trigger API fetch for selected tab
          }}
          className={`px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition
            ${
              active === status
                ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-100"
            }
          `}
        >
          {status}
        </button>
      ))}
    </div>
  );
};

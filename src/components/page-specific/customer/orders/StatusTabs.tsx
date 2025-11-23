"use client";

interface IStatusTabsProps {
  statuses: string[];
  activeStatus: string; // controlled active status
  onStatusChange: (status: string) => void; // callback when a tab is clicked
}

export const StatusTabs = ({
  statuses,
  activeStatus,
  onStatusChange,
}: IStatusTabsProps) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      {statuses.map((status) => (
        <button
          key={status}
          type="button"
          onClick={() => onStatusChange(status)}
          className={`px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition
            ${
              activeStatus === status
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

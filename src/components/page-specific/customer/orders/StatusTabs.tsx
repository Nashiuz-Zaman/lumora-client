"use client";

export type TStatusOptions<T extends Record<string, any>> = {
  label: string;
  value: "all" | T[keyof T];
}[];

interface IStatusTabsProps<K extends Record<string, any>> {
  statuses: TStatusOptions<K>;
  activeStatus: TStatusOptions<K>[number]["value"];
  onStatusChange: (value: TStatusOptions<K>[number]["value"]) => void;
}

export const StatusTabs = <K extends Record<string, any>>({
  statuses,
  activeStatus,
  onStatusChange,
}: IStatusTabsProps<K>) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      {statuses.map(({ label, value }) => {
        const isActive = activeStatus === value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => onStatusChange(value)}
            className={`px-4 cursor-pointer py-2 rounded-full border text-sm font-medium whitespace-nowrap transition
              ${
                isActive
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-100"
              }
            `}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

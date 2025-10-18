"use client";

import { MouseEvent, ReactNode, useEffect, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { NoData } from "./NoData";
import { InputCheckbox } from "./InputCheckbox";
import { TUseSelectableReturn } from "@/hooks";

interface IClassNameObj {
  containerDiv?: string;
  headingRow?: string;
  heading?: string;
  dataRow?: string;
  tableBody?: string;
  mainTable?: string;
  noData?: string;
}

export type TRenderTableRowProps<T> = {
  data: T;
  isLastEl: boolean;
  [key: string]: unknown;
};

export type TTableColumn = {
  columnTitle: string;
  width: string; // Tailwind col size
};

interface ITabularDataProps<T extends Record<string, any>> {
  columns: TTableColumn[];
  data: T[];
  classNameObj?: IClassNameObj;
  renderRow: (props: TRenderTableRowProps<T>) => ReactNode;
  skip?: number;
  dataLoading?: boolean;
  onRowClick?: (e: MouseEvent<HTMLTableRowElement>, id: string) => void;
  noDataText?: string;
  toggleSelectAll?: TUseSelectableReturn<T, keyof T>["toggleSelectAll"];
  isAllSelected?: boolean;
  dataKey?: string;
  [key: string]: any;
}

export const TabularData = <T extends Record<string, any>>({
  columns,
  data = [],
  classNameObj = {},
  renderRow,
  dataLoading = false,
  onRowClick,
  noDataText,
  toggleSelectAll,
  isAllSelected,
  dataKey = "_id",
  ...props
}: ITabularDataProps<T>) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div
      {...props}
      className={`overflow-auto w-full h-full bg-white relative ${
        classNameObj.containerDiv || ""
      }`}
    >
      <table
        style={{
          display: "grid",
          gridTemplateColumns: columns.map((col) => col.width).join(" "),
        }}
        className={`min-w-[80rem] w-full ${classNameObj.mainTable || ""}`}
      >
        {/* table head */}
        <thead className="contents">
          <tr
            className={`contents w-full text-base 2xl:text-lg ${
              classNameObj.headingRow || ""
            }`}
          >
            {columns.map((col, i) =>
              col?.columnTitle?.toLowerCase() === "checkbox" ? (
                <th
                  key={i}
                  className={`text-left first:pl-4 sticky top-0 capitalize border-y bg-neutral-100  border-neutral-200 pl-4 pr-2 h-14 flex items-center justify-start ${
                    classNameObj.heading || ""
                  }`}
                >
                  <InputCheckbox
                    onChange={toggleSelectAll}
                    checked={!!isAllSelected}
                  />
                </th>
              ) : (
                <th
                  key={i}
                  className={`text-left sticky top-0 h-14 flex items-center bg-neutral-100  border-neutral-200 px-4 capitalize font-semibold border-y ${
                    classNameObj.heading || ""
                  }`}
                >
                  {col.columnTitle}
                </th>
              )
            )}
          </tr>
        </thead>

        {/* table body */}
        <tbody className={`contents`}>
          {/* Data rows */}
          {data?.length > 0 &&
            !dataLoading &&
            data.map((rowData, i, arr) => {
              const isLastEl = i === arr.length - 1;
              return (
                <tr
                  key={i}
                  onClick={(e) => {
                    if ((e.target as HTMLInputElement)?.type !== "checkbox") {
                      onRowClick?.(e, String(rowData[dataKey]));
                    }
                  }}
                  className={`contents ${
                    onRowClick ? "cursor-pointer" : ""
                  } group ${classNameObj.dataRow || ""}`}
                >
                  {renderRow &&
                    rowData &&
                    renderRow({ data: rowData, isLastEl })}
                </tr>
              );
            })}
        </tbody>
      </table>

      {data?.length < 1 && !dataLoading && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <NoData centered={true} text={noDataText} />
        </div>
      )}

      {dataLoading && (
        <div className="absolute inset-0 z-10 pointer-events-none bg-white/70">
          <LoadingSpinner centered />
        </div>
      )}
    </div>
  );
};

"use client";

import { MouseEvent, ReactNode, useEffect, useState } from "react";
import { DataLoadingSpinner } from "./DataLoadingSpinner";
import { NoData } from "./NoData";
import { InputCheckbox } from "./InputCheckbox";

interface IClassNameObj {
  containerDiv?: string;
  headingRow?: string;
  heading?: string;
  dataRow?: string;
  tableBody?: string;
  mainTable?: string;
  noData?: string;
}

interface IRenderRowProps<T> {
  data: T;
  serial: number;
  [key: string]: unknown;
}

interface ITabularDataProps<T> {
  headings: string[];
  data: T[];
  rowClassesForBoth?: string;
  classNameObj?: IClassNameObj;
  renderRow?: (props: IRenderRowProps<T>) => ReactNode;
  skip?: number;
  dataLoading?: boolean;
  onRowClick?: (e: MouseEvent<HTMLTableRowElement>, id: string) => void;
  noDataText?: string;
  toggleSelectAll?: () => void;
  isAllSelected?: boolean;
  bordered?: "full" | "divider" | "none";
  dataKey?: string;
}

export const TabularData = <T extends Record<string, unknown>>({
  headings,
  data,
  rowClassesForBoth = "",
  classNameObj = {},
  renderRow,
  skip = 0,
  dataLoading = false,
  onRowClick,
  noDataText,
  toggleSelectAll,
  isAllSelected,
  bordered = "full",
  dataKey = "_id",
}: ITabularDataProps<T>) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div
      className={`w-full overflow-x-auto flex flex-col grow bg-white border-b border-neutral-200 ${
        classNameObj.containerDiv || ""
      }`}
    >
      <table
        className={`min-w-[80rem] max-w-full grow flex flex-col ${
          classNameObj.mainTable || ""
        }`}
      >
        <thead className="w-full">
          <tr
            className={`
              bg-neutral-100 w-full text-base 2xl:text-lg 
              grid
              ${
                bordered === "full" || bordered === "divider"
                  ? "border border-neutral-200"
                  : ""
              }
              ${rowClassesForBoth} ${classNameObj.headingRow || ""}
              px-2 sm:px-3 md:px-4 lg:px-5 py-3 lg:py-4
            `}
          >
            {headings.map((heading, i) =>
              heading?.toLowerCase() === "checkbox" ? (
                <th
                  key={i}
                  className={`text-left block w-6 ${
                    classNameObj.heading || ""
                  }`}
                >
                  <InputCheckbox
                    onChange={toggleSelectAll}
                    checked={isAllSelected}
                  />
                </th>
              ) : (
                <th
                  key={i}
                  className={`text-left block capitalize font-semibold ${
                    classNameObj.heading || ""
                  }`}
                >
                  {heading}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody
          className={`
            w-full grow flex flex-col
            ${
              bordered === "divider" && data?.length > 0
                ? "divide-y divide-neutral-200"
                : ""
            }
            ${classNameObj.tableBody || ""}
          `}
        >
          {/* No data */}
          {data?.length < 1 && !dataLoading && (
            <tr className="grow flex flex-col">
              <td className="flex flex-col gap-2 w-full text-center items-center justify-center grow">
                <NoData text={noDataText} className={classNameObj.noData} />
              </td>
            </tr>
          )}

          {/* Loading */}
          {dataLoading && (
            <tr className="grow flex flex-col w-full">
              <td className="grow grid place-content-center w-full">
                <DataLoadingSpinner className="!static !py-20" />
              </td>
            </tr>
          )}

          {/* Render Data Rows */}
          {data?.length > 0 &&
            !dataLoading &&
            data.map((rowData, i) => {
              const serialNumber = skip + i + 1;

              return (
                <tr
                  onClick={(e) => {
                    if ((e.target as HTMLInputElement)?.type !== "checkbox") {
                      onRowClick?.(e, String(rowData[dataKey]));
                    }
                  }}
                  key={i}
                  className={`
                    w-full grid text-xs sm:text-sm md:text-base lg:text-lg
                    px-2 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 lg:py-2.5
                    ${onRowClick ? "cursor-pointer" : ""}
                    ${
                      bordered === "full"
                        ? "!border-x !border-b border-neutral-200"
                        : ""
                    }
                    ${rowClassesForBoth} ${classNameObj.dataRow || ""}
                  `}
                >
                  {renderRow &&
                    rowData &&
                    renderRow({ data: rowData, serial: serialNumber })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

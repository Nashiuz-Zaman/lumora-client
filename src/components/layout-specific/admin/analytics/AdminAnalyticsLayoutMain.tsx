"use client";

import { TopPanel } from "@/components/page-specific";
import { SelectField } from "@/components/shared";
import {
  setMonth,
  setYear,
} from "@/libs/redux/features/analytics/analyticsSlice";
import { TRootState } from "@/libs/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { TotalRevenue } from "./TotalRevenue";
import { TotalCustomers } from "./TotalCustomers";
import { TotalProductsSold } from "./TotalProductsSold";
import { AverageOrderTotal } from "./AverageOrderTotal";

interface ISelectOption {
  text: string;
  value: string;
}

const months: ISelectOption[] = [
  { text: "All", value: "all" },
  { text: "January", value: "1" },
  { text: "February", value: "2" },
  { text: "March", value: "3" },
  { text: "April", value: "4" },
  { text: "May", value: "5" },
  { text: "June", value: "6" },
  { text: "July", value: "7" },
  { text: "August", value: "8" },
  { text: "September", value: "9" },
  { text: "October", value: "10" },
  { text: "November", value: "11" },
  { text: "December", value: "12" },
];

const currentYear = new Date().getFullYear();

const years: ISelectOption[] = Array.from({ length: 10 }, (_, i) => {
  const y = currentYear - i;
  return { text: `${y}`, value: `${y}` };
});

years.unshift({ text: "All", value: "all" });

export const AdminAnalyticsLayoutMain = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useDispatch();
  const { month, year } = useSelector((state: TRootState) => state.analytics);

  return (
    <div className="h-full flex flex-col">
      {/*  TopPanel */}
      <TopPanel
        className="border-neutral-200"
        actions={
          <div className="flex items-center gap-4">
            <SelectField
              className="!w-[12rem]"
              selectClassName="!rounded-lg"
              placeholder="Select Month"
              value={month}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                dispatch(setMonth(e.target.value))
              }
              options={months}
            />
            <SelectField
              className="!w-[12rem]"
              selectClassName="!rounded-lg"
              placeholder="Select Year"
              value={year}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                dispatch(setYear(e.target.value))
              }
              options={years}
            />
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-6 border-b border-neutral-200 sm:flex items-center p-4 sm:gap-6 lg:gap-10">
        <TotalRevenue />
        <AverageOrderTotal />
        <TotalCustomers />
        <TotalProductsSold />
      </div>

      {/* Main content */}
      <div className="grow flex flex-col overflow-y-auto">{children}</div>
    </div>
  );
};

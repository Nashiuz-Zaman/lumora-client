"use client";

import { AnalyticsHeading } from "../shared/AnalyticsHeading";
import { OrderStats } from "./OrderStats";
import { OrderCombinedTrendsChart } from "./OrderCombinedTrendsChart";
import { PaymentStats } from "./PaymentStats";
import { RevenueTrendsChart } from "./RevenueTrendsChart";
import { CustomerTrendsChart } from "./CustomerGrowthChart";
import { useSelector } from "react-redux";
import { TRootState } from "@/libs/redux/store";
import { useMemo } from "react";
import { IAnalyticDateParams } from "@/types";
import { useRefState, useSetElementText } from "@/hooks";
import { TopCategorySalesPercentageChart } from "./TopCategorySalesPercentageChart";
import { generateChartTitle } from "@/utils";

export const AnalyticsOverviewMain = () => {
  const { refs } = useRefState();
  useSetElementText(refs?.titleRef?.current, "Analytics Overview");
  const { month, year } = useSelector((store: TRootState) => store.analytics);

  const sanitizedMonth = month !== "all" ? Number(month) : undefined;
  const sanitizedYear = year !== "all" ? Number(year) : undefined;

  const dateParams = useMemo(() => {
    if (sanitizedMonth === undefined && sanitizedYear === undefined) return {};

    const params: IAnalyticDateParams = {};

    if (sanitizedMonth) params.month = sanitizedMonth;
    if (sanitizedYear) params.year = sanitizedYear;

    return params;
  }, [sanitizedMonth, sanitizedYear]);

  return (
    <div className="grow px-4 pt-7 pb-12 bg-neutral-50 space-y-16 overflow-x-hidden">
      {/* Order Stats */}
      <section className="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-5 items-stretch">
        <div>
          <AnalyticsHeading text={generateChartTitle("Orders ", dateParams)} />
          <OrderStats dateParams={dateParams} />
        </div>

        <div className="flex flex-col h-full lg:h-[340px] 2xl:h-full">
          <AnalyticsHeading
            text={generateChartTitle("Sales by Product Categories", dateParams)}
          />

          <TopCategorySalesPercentageChart dateParams={dateParams} />
        </div>
      </section>

      <section>
        <AnalyticsHeading
          text={generateChartTitle("Order Placed vs Cancelled ", dateParams)}
        />
        <OrderCombinedTrendsChart dateParams={dateParams} />
      </section>

      {/* Payments stats */}
      <section className="grid lg:grid-cols-[1.25fr_2fr] gap-5  items-start">
        <div>
          <AnalyticsHeading
            text={generateChartTitle("Transactions ", dateParams)}
          />
          <PaymentStats dateParams={dateParams} />
        </div>

        <div className="flex flex-col h-full">
          <AnalyticsHeading text={generateChartTitle("Rev. Growth", dateParams)} />
          <RevenueTrendsChart
            className="h-[350px] !grow border border-neutral-200"
            dateParams={dateParams}
          />
        </div>
      </section>

      {/* Customer Stats */}
      <section className="flex flex-col h-[350px]">
        <AnalyticsHeading text={generateChartTitle("Customer Growth ", dateParams)}/>
        <CustomerTrendsChart dateParams={dateParams} />
      </section>
    </div>
  );
};

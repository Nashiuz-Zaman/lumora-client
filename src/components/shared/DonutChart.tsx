"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { ApexOptions } from "apexcharts";
import { LoadingSpinner } from "./LoadingSpinner";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface IDonutChartProps {
  title?: string;
  data: number[];
  labels: string[];
  colors?: string[];
  tooltipUnit?: string;
  isLoading?: boolean;
  className?: string;
  showLegend?: boolean;
}

export const DonutChart = ({
  title,
  data,
  labels = [],
  colors = [
    "#2563EB", // blue
    "#10B981", // green
    "#F59E0B", // amber
    "#EF4444", // red
    "#0EA5E9", // sky
    "#F472B6", // pink
    "#8B5CF6", // purple
    "#EAB308", // yellow
  ],
  tooltipUnit = "",
  isLoading = false,
  className = "",
  showLegend = true,
}: IDonutChartProps) => {
  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "donut",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 400,
        },
      },
      colors,
      labels,
      legend: {
        show: showLegend,
        position: "left",
        fontSize: "12px",
        itemMargin: { vertical: 3 },
        fontFamily: "inherit",
        offsetY: 20,
      },
      dataLabels: {
        enabled: true,
        style: { fontFamily: "inherit" },
        formatter: (val: number) => `${val.toFixed(1)}%`,
      },
      tooltip: {
        y: {
          formatter: (val: number) => `${val}${tooltipUnit}`,
        },
      },
      stroke: {
        show: true,
        width: 4,
        colors: ["#fff"],
      },
      title: {
        text: title,
        align: "left",
        style: {
          fontSize: "16px",
          fontWeight: "bold",
        },
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: { width: "100%" },
            legend: { position: "bottom" },
          },
        },
      ],
    }),
    [labels, colors, title, tooltipUnit, showLegend]
  );

  return (
    <div className={`bg-white p-3 rounded-xl relative h-[330px] ${className}`}>
      {isLoading && <LoadingSpinner centered />}

      {!isLoading && (
        <ReactApexChart
          options={options}
          series={data}
          type="donut"
          height="100%"
        />
      )}

      {!isLoading && !data && (
        <div className="absolute y-center left-[55%] flex flex-col items-center justify-center text-neutral-400">
          <span className="text-sm font-medium">No data available</span>
        </div>
      )}
    </div>
  );
};

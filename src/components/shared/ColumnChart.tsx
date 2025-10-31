"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import { ApexOptions } from "apexcharts";
import { LoadingSpinner } from "./LoadingSpinner";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface IColumnChartProps {
  title?: string;
  data: number[];
  labels: string[];
  colors?: string[];
  tooltipUnit?: string;
  isLoading?: boolean;
  className?: string;
  showXAxisLabels?: boolean;
}

export const ColumnChart = ({
  title,
  data,
  labels,
  showXAxisLabels = true,
  colors = ["#2563EB"], // Tailwind blue-600
  tooltipUnit = "",
  isLoading = false,
  className = "",
}: IColumnChartProps) => {
  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "bar",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
        },
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          horizontal: false,
          columnWidth: "70%",
          distributed: true,
        },
      },
      dataLabels: { enabled: false },
      colors,
      xaxis: {
        categories: labels,
        labels: { show: showXAxisLabels, style: { fontSize: "11px" } },
      },
      yaxis: {
        labels: {
          formatter: (val: number) => val.toFixed(0),
          style: { fontSize: "12px" },
        },
      },
      tooltip: {
        y: {
          formatter: (val: number) => `${val}${tooltipUnit}`,
        },
      },
      grid: {
        borderColor: "#E5E7EB",
        strokeDashArray: 4,
      },
      title: {
        text: title,
        align: "left",
        style: { fontSize: "16px", fontWeight: "bold" },
      },
    }),
    [labels, colors, title, tooltipUnit, showXAxisLabels]
  );

  const series = useMemo(
    () => [
      {
        name: title || "Value",
        data,
      },
    ],
    [title, data]
  );

  return (
    <div className={`bg-white p-3 rounded-xl relative h-[330px] ${className}`}>
      {isLoading && <LoadingSpinner centered />}

      {!isLoading && options && series && (
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height="100%"
        />
      )}
    </div>
  );
};

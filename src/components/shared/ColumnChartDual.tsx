"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { ApexOptions } from "apexcharts";
import { LoadingSpinner } from "./LoadingSpinner";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface IColumnChartDualProps {
  title?: string;
  labels: string[];
  series: {
    name: string;
    data: number[];
  }[];
  colors?: string[];
  tooltipUnit?: string;
  isLoading?: boolean;
  className?: string;
  showXAxisLabels?: boolean;
}

export const ColumnChartDual = ({
  title,
  labels,
  series,
  colors = ["#2563EB", "#DC2626"], // blue-600 and red-600
  tooltipUnit = "",
  isLoading = false,
  className = "",
  showXAxisLabels = true,
}: IColumnChartDualProps) => {
  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "bar",
        stacked: false,
        toolbar: { show: false },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 0,
        },
      },
      dataLabels: { enabled: false },
      stroke: {
        show: true,
        width: 3,
        colors: ["transparent"],
      },
      colors,
      xaxis: {
        categories: labels,
        labels: {
          show: showXAxisLabels,
          style: { fontSize: "11px" },
        },
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
      legend: {
        position: "top",
        markers: {
          size: 8,
          shape: "square", // or 'square'
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

  return (
    <div className={`bg-white p-3 rounded-xl relative h-[330px] ${className}`}>
      {isLoading && <LoadingSpinner centered />}

      {!isLoading && (
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

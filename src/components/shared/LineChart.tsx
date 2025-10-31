"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ILineChartProps {
  title?: string;
  data: number[];
  categories: string[];
  color?: string;
  tooltipUnit?: string;
  className?: string;
  isLoading?: boolean;
  seriesName?: string;
}

export const LineChart = ({
  title,
  data,
  categories,
  color = "#3B82F6",
  tooltipUnit = "",
  className = "",
  isLoading = false,
  seriesName = "Series",
}: ILineChartProps) => {
  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "line",
        zoom: { enabled: false },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
        },
        toolbar: { show: false },
      },
      stroke: {
        curve: "straight",
        width: 2,
      },
      colors: [color],
      xaxis: {
        categories,
        labels: { style: { fontSize: "12px" } },
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
      markers: {
        size: 4,
        hover: { sizeOffset: 4 },
      },
      grid: {
        borderColor: "#E5E7EB",
        strokeDashArray: 4,
      },
      dataLabels: {
        enabled: false,
      },
      title: {
        text: title,
        align: "left" as const,
        style: {
          fontSize: "16px",
          fontWeight: "bold",
        },
      },
    }),
    [categories, color, title, tooltipUnit]
  );

  const series = useMemo(
    () => [
      {
        name: seriesName,
        data,
      },
    ],
    [seriesName, data]
  );

  return (
    <div className={`bg-white p-3 rounded-xl relative ${className}`}>
      {isLoading && <LoadingSpinner centered />}

      {!isLoading && options && series && (
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height="100%"
        />
      )}
    </div>
  );
};

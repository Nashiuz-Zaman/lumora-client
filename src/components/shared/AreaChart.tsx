"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface IAreaChartProps {
  title?: string;
  data: number[];
  categories: string[];
  color?: string;
  tooltipUnit?: string;
  seriesName: string;
  className?: string;
  isLoading?: boolean;
}

export const AreaChart = ({
  title,
  data,
  categories,
  color = "#3B82F6",
  tooltipUnit = "",
  seriesName,
  isLoading = false,
  className = "",
}: IAreaChartProps) => {
  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "area",
        zoom: { enabled: false },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
        },
        toolbar: { show: false },
      },
      stroke: {
        curve: "smooth",
        width: 0,
      },
      fill: {
        type: "solid",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 90, 100],
        },
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
        size: 0,
        hover: { sizeOffset: 4 },
      },
      grid: {
        borderColor: "#E5E7EB",
        strokeDashArray: 4,
      },
      dataLabels: { enabled: false },
      title: {
        text: title,
        align: "left",
        style: { fontSize: "16px", fontWeight: "bold" },
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
          type="area"
          height={320}
        />
      )}
    </div>
  );
};

"use client";

import React from "react";

// core
import {
  TabularData,
  TRenderTableRowProps,
  TTableColumn,
} from "@/components/shared";
import { TrackOrderTableProductRow } from "./TrackOrderTableProductRow";
import { TPopulatedCartItem } from "@/types";

interface ICurProductsProps {
  data: TPopulatedCartItem[];
}

const columns: TTableColumn[] = [
  { columnTitle: "Products", width: "3fr" },
  { columnTitle: "Price", width: "1fr" },
  { columnTitle: "Quantity", width: "1fr" },
  { columnTitle: "Subtotal", width: "1fr" },
];

const renderRow = ({
  data,
  isLastEl,
}: TRenderTableRowProps<TPopulatedCartItem>) => (
  <TrackOrderTableProductRow data={data} isLastEl={isLastEl} />
);

export const CurProducts = ({ data }: ICurProductsProps) => {
  return (
    <div className="md:border-b border-neutral-200 mb-12 pt-5 pb-10">
      <h2 className="md:px-3 lg:!px-6 text-sm lg:text-lg !leading-[1.5rem] font-medium mb-5 ml-5">
        Product{" "}
        <span className="font-normal text-neutral-500">({data?.length})</span>
      </h2>

      <TabularData<TPopulatedCartItem>
        columns={columns}
        data={data}
        renderRow={renderRow}
      />
    </div>
  );
};



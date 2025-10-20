"use client";

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
    <div className="md:border-b border-neutral-200 mb-12">
      <TabularData
        classNameObj={{
          heading:
            "first:!pl-4 first:md:!pl-6 first:lg:!pl-8 last:!pr-4 last:md:!pr-6 last:lg:!pr-8",
        }}
        columns={columns}
        data={data}
        renderRow={renderRow}
      />
    </div>
  );
};

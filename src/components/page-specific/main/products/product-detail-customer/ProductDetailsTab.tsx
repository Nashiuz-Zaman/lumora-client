"use client";

import { useState } from "react";
import SpecificationsTable from "./ProductDetailsTab/SpecificationsTable";
import { IProduct, IVideo } from "@/types";
import { ProductVideos } from "./ProductDetailsTab/ProductVideos";
import { WarrantyDetails } from "./ProductDetailsTab/WarrantyDetails";

export const ProductDetailsTabs = ({ product }: { product: IProduct }) => {
  const [activeTab, setActiveTab] = useState<
    "specifications" | "warranty" | "videos"
  >("specifications");

  const tabs = [
    { id: "specifications", label: "Specifications" },
    { id: "warranty", label: "Warranty & Support" },
    { id: "videos", label: "Videos" },
  ];

  return (
    <div className="w-full mb-20 min-h-[10rem] flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-neutral-200 rounded-t-lg overflow-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-5 py-2 text-sm font-medium transition-colors rounded-t-lg cursor-pointer -mb-[1px]
              ${
                activeTab === tab.id
                  ? "bg-primary border-x border-t border-neutral-200 text-white"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg- pt-5 grow flex flex-col">
        {activeTab === "specifications" && (
          <SpecificationsTable data={product.specifications} />
        )}
        {activeTab === "warranty" && (
          <WarrantyDetails data={product.warrantyAndSupport} />
        )}
        {activeTab === "videos" && (
          <ProductVideos data={product.videos as IVideo[]} />
        )}
      </div>
    </div>
  );
};

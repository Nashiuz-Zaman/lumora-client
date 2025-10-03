"use client";

import { useRouter } from "next/navigation";
import { ProductSortOptions } from "@/constants/product";

import ProductsTopParamsForm from "../shared/ProductsTopParamsForm";
import ProductRow from "./ProductRow";
import {
  TrashcanIcon,
  ButtonBtnTrans,
  TabularData,
  Pagination,
} from "@/components/shared";
import { ConfirmationModal } from "@/components/modals";

import { useBulkDeleteProductsMutation } from "@/libs/redux/apiSlices/product/productApiSlice";

import { showToast, catchAsyncGeneral, getHeight } from "@/utils";
import {
  useSelectable,
  useModal,
  useProductsQueries,
  IProductQueriesParams,
  useRefState,
  useSetElementText,
  useResizeObserver,
  useScreenSize,
} from "@/hooks";
import { MouseEvent, useEffect, useState } from "react";
import { IProduct } from "@/types";

export const productsTableHeadings: string[] = [
  "checkbox",
  "Product",
  "Status",
  "Brand",
  "Price",
  "Variants",
  "Inventory",
  "Last modified",
  "Actions",
];

export const productsTableRowClasses =
  "grid grid-cols-[auto_3.5fr_0.5fr_1fr_0.7fr_0.5fr_1fr_1.5fr_0.5fr]";

export const AllProductsMain = () => {
  const router = useRouter();
  const [tableHeight, setTableHeight] = useState<number | null>(null);
  const { height } = useScreenSize();

  // set the page heading below
  const { refs } = useRefState();
  useSetElementText(refs?.titleRef?.current, "All Products");

  const paramsFilterFormEntry = useResizeObserver<HTMLFormElement>(
    refs.paramsFilterForm
  );
  const topPanelEntry = useResizeObserver<HTMLDivElement>(refs.topPanelRef);
  const adminHeaderEntry = useResizeObserver<HTMLElement>(refs.adminHeader);

  // calculate dynamic height for table
  useEffect(() => {
    if (height && paramsFilterFormEntry && adminHeaderEntry && topPanelEntry) {
      const paramsHeight = getHeight(paramsFilterFormEntry);
      const headerHeight = getHeight(adminHeaderEntry);
      const topPanelHeight = getHeight(topPanelEntry);

      setTableHeight(
        height - paramsHeight - headerHeight - topPanelHeight - 50 - 56
      );
    }
  }, [paramsFilterFormEntry, adminHeaderEntry, height, topPanelEntry]);

  const {
    queryMeta,
    changePage,
    products,
    handleSubmit,
    formParams,
    setFormParams,
    isFetching,
    refetch,
  } = useProductsQueries();

  const {
    selected,
    toggleSelectOne,
    toggleSelectAll,
    checkIfSelected,
    isAllSelected,
    setSelected,
  } = useSelectable(products, "_id");

  const { isModalOpen, openModal, closeModal } = useModal();
  const [bulkDeleteProducts] = useBulkDeleteProductsMutation();

  const handleRowClick = (_: MouseEvent<HTMLTableRowElement>, id: string) => {
    router.push(`/admin/products/edit/${id}`);
  };

  const renderRow = ({
    data,
    isLastEl,
  }: {
    data: IProduct;
    isLastEl: boolean;
  }) => (
    <ProductRow
      isLastEl={isLastEl}
      productData={data}
      isSelected={checkIfSelected(data)}
      toggleSelectOne={toggleSelectOne}
    />
  );

  const handleConfirmDelete = catchAsyncGeneral(async () => {
    const res = await bulkDeleteProducts(selected as string[]).unwrap();

    if (res?.success) {
      showToast({ message: res.message });
      setSelected([]);
      closeModal();
      refetch();
    }
  });

  return (
    <div className="grow flex flex-col">
      {/* Top params form */}
      <ProductsTopParamsForm<IProductQueriesParams>
        sortOptions={[...ProductSortOptions]}
        params={formParams}
        onSubmit={handleSubmit}
        setParams={setFormParams}
        showStatusFilter={true}
      />

      {/* Delete action button */}
      <ButtonBtnTrans
        onClick={openModal}
        className="text-red-600 font-inherit ml-auto px-4 !h-[50px] shrink-0"
        isDisabled={selected.length < 1}
      >
        <TrashcanIcon />
        Delete Selected
      </ButtonBtnTrans>

      {/* Products table */}
      {products && (
        <TabularData
          style={{ height: `${tableHeight}px` }}
          gridClasses={productsTableRowClasses}
          classNameObj={{
            containerDiv: `overflow-y-auto`,
            dataRow: "hover:cursor-pointer",
          }}
          toggleSelectAll={toggleSelectAll}
          isAllSelected={isAllSelected}
          headings={productsTableHeadings}
          data={products}
          onRowClick={handleRowClick}
          renderRow={renderRow}
          dataLoading={isFetching}
          noDataText="No products"
        />
      )}

      {/* Pagination */}
      {queryMeta?.totalPages > 0 && (
        <div className="!h-[56px] !shrink-0 border-t border-neutral-200 mt-auto flex items-center justify-center">
          <Pagination
            totalPages={queryMeta?.totalPages}
            currentPage={queryMeta?.page}
            setCurrentPage={changePage}
          />
        </div>
      )}

      {/* Delete confirmation modal */}
      <ConfirmationModal
        show={isModalOpen}
        message={`Are you sure you want to delete ${selected.length} product(s)?`}
        onConfirm={handleConfirmDelete}
        onCancel={closeModal}
      />
    </div>
  );
};

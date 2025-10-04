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
  TRenderTableRowProps,
  TTableColumn,
} from "@/components/shared";
import { ConfirmationModal } from "@/components/modals";

import { useBulkDeleteProductsMutation } from "@/libs/redux/apiSlices/product/productApiSlice";

import { showToast, catchAsyncGeneral } from "@/utils";
import {
  useSelectable,
  useModal,
  useProductsQueries,
  IProductQueriesParams,
  useRefState,
  useSetElementText,
} from "@/hooks";
import { MouseEvent } from "react";
import { IProduct } from "@/types";
import { useDynamicHeight } from "@/hooks/useDynamicHeight";

const productsTableColumns: TTableColumn[] = [
  { columnTitle: "checkbox", width: "auto" },
  { columnTitle: "Product", width: "3fr" },
  { columnTitle: "Status", width: "0.5fr" },
  { columnTitle: "Brand", width: "1fr" },
  { columnTitle: "Price", width: "0.7fr" },
  { columnTitle: "Variants", width: "0.5fr" },
  { columnTitle: "Inventory", width: "1fr" },
  { columnTitle: "Last modified", width: "1.5fr" },
  { columnTitle: "Actions", width: "1fr" },
];

export const AllProductsMain = () => {
  const router = useRouter();

  // set the page heading below
  const { refs } = useRefState();
  useSetElementText(refs?.titleRef?.current, "All Products");

  const height = useDynamicHeight({
    refElements: [refs.paramsFilterForm, refs.topPanelRef, refs.adminHeader],
    fixedHeights: [50, 56],
  });

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

  const renderRow = ({ data, isLastEl }: TRenderTableRowProps<IProduct>) => (
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
      <TabularData
        style={{ height: `${height}px` }}
        classNameObj={{
          containerDiv: `overflow-y-auto`,
        }}
        toggleSelectAll={toggleSelectAll}
        isAllSelected={isAllSelected}
        columns={productsTableColumns}
        data={products}
        onRowClick={handleRowClick}
        renderRow={renderRow}
        dataLoading={isFetching}
        noDataText="No products"
      />

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

"use client";

import { useRouter } from "next/navigation";
import { ProductSortOptions } from "@/constants/product";

import ProductsTopParamsForm from "../shared/ProductsTopParamsForm";
import ProductRow from "../shared/ProductRow";
import {
  TrashcanIcon,
  ButtonBtnTrans,
  TabularData,
  Pagination,
} from "@/components/shared";
import { ConfirmationModal } from "@/components/modals";

import { useBulkDeleteProductsMutation } from "@/libs/redux/apiSlices/product/productApiSlice";

import { showToast, catchAsyncGeneral } from "@/utils";
import {
  useSelectable,
  useModal,
  useProductsQueries,
  IProductQueriesParams,
} from "@/hooks";
import { MouseEvent } from "react";
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
  "grid grid-cols-[auto_0.3fr_0.1fr_0.1fr_0.15fr_0.1fr_0.1fr_0.2fr_0.15fr] gap-4 !px-4 items-center";

export const AllProductsMain = () => {
  const router = useRouter();

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

  const renderRow = ({ data }: { data: IProduct }) => (
    <ProductRow
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
        className="text-red-600 font-inherit my-1 xl:my-4 ml-auto px-4"
        isDisabled={selected.length < 1}
      >
        <TrashcanIcon />
        Delete Selected
      </ButtonBtnTrans>

      {/* Products table */}
      {products && (
        <TabularData
          rowClassesForBoth={productsTableRowClasses}
          classNameObj={{
            containerDiv: "!grow-0 !min-h-[50vh]",
            headingRow: "bg-white border-y border-x-0 border-neutral-200",
            dataRow: "hover:bg-neutral-100 hover:cursor-pointer",
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
        <Pagination
          className="mt-auto pt-10 mb-10"
          totalPages={queryMeta?.totalPages}
          currentPage={queryMeta?.page}
          setCurrentPage={changePage}
        />
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

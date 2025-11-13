"use client";

import { createPortal } from "react-dom";
import {
  useModal,
  useProductCollectionModalQueries,
  useSelectable,
} from "@/hooks";
import { BaseModal } from "./BaseModal";
import {
  ButtonBtn,
  ButtonBtnTrans,
  LoadingSpinner,
  InputField,
  NoData,
  Pagination,
} from "../shared";
import { catchAsyncGeneral, showToast } from "@/utils";
import { IProduct } from "@/types";
import AdminProductCard from "../page-specific/admin/products/shared/AdminProductCard";
import { useAddProductsToProductCollectionMutation } from "@/libs/redux/apiSlices/productCollection/productCollectionApiSlice";

interface IAddToProductCollectionModalProps {
  slug: string;
  target: HTMLElement | null; // where the trigger button will render
}

const AddToProductCollectionModal = ({
  slug,
  target,
}: IAddToProductCollectionModalProps) => {
  // Local open/close state
  const { closeModal, isModalOpen, openModal } = useModal();

  const topCategorySlug = slug.replace(/-[^-]+$/, "");

  const {
    handleSearchChange,
    products,
    queryMeta,
    isFetching,
    params,
    changePage,
  } = useProductCollectionModalQueries(isModalOpen, topCategorySlug);

  const {
    selected,
    toggleSelectOne,
    checkIfSelected,
    toggleSelectAll,
    isAllSelected,
  } = useSelectable(products, "_id");

  const [addProductsToCollection, { isLoading: isAdding }] =
    useAddProductsToProductCollectionMutation();

  const handleAddToCollection = catchAsyncGeneral(async () => {
    const res = await addProductsToCollection({
      slug,
      productIds: selected as string[],
    }).unwrap();

    if (res?.success) showToast({ message: res?.message });
  });

  return (
    <>
      {/* Portal trigger button */}
      {target &&
        createPortal(
          <ButtonBtn
            className="!primaryClasses !rounded-full !py-2 !px-5"
            onClick={openModal}
          >
            + Add To Collection
          </ButtonBtn>,
          target
        )}

      {/* The actual modal */}
      <BaseModal
        className=" lg:max-w-[80%] 2xl:max-w-[80rem] h-full lg:h-[80%] flex flex-col !w-full bg-white rounded-xl p-6 shadow-xl"
        condition={isModalOpen}
        allowCloseOnOutsideClick={false}
        closeFunction={closeModal}
      >
        {/* Search bar */}
        <InputField
          placeholder="Search products by title or SKU"
          icon="material-symbols:search"
          name="search"
          type="text"
          iconClassName="text-xl"
          inputClassName="!rounded-lg"
          labelTextClassName="text-lg"
          value={params.search}
          onChange={handleSearchChange}
          required={false}
          className="mb-4"
          labelText="Search"
        />

        {/* Select all toggle */}
        {products.length > 0 && (
          <div>
            <ButtonBtnTrans
              className="underline ml-auto font-medium mb-4"
              onClick={toggleSelectAll}
            >
              {isAllSelected ? "Deselect All" : "Select All"}
            </ButtonBtnTrans>
          </div>
        )}

        {/* Products container */}
        <div className="w-full grow overflow-y-auto relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 py-7 px-5 gap-4 bg-neutral-100">
          {isFetching ? (
            <LoadingSpinner centered={true} />
          ) : products.length === 0 ? (
            <NoData centered={true} text="No products found" />
          ) : (
            products.map((product: IProduct) => (
              <AdminProductCard
                key={product._id}
                product={product}
                isSelected={checkIfSelected(product)}
                toggleSelectOne={toggleSelectOne}
              />
            ))
          )}
        </div>

        {/* Pagination and Action */}
        <div className="flex flex-col 2md:flex-row items-center mt-auto pt-10">
          {!!products?.length && (
            <Pagination
              totalPages={queryMeta?.totalPages}
              currentPage={queryMeta?.page}
              setCurrentPage={changePage}
              className="mb-4"
            />
          )}

          <ButtonBtn
            isLoading={isAdding}
            onClick={handleAddToCollection}
            className="mx-auto sm:mr-0 sm:ml-auto !primaryClasses"
            isDisabled={selected.length === 0}
          >
            Add to Collection
          </ButtonBtn>
        </div>
      </BaseModal>
    </>
  );
};

export default AddToProductCollectionModal;

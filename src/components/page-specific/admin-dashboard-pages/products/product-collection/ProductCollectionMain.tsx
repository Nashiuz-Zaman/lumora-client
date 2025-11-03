"use client";

import {
  TrashcanIcon,
  ButtonBtnTrans,
  Pagination,
  InnerContainer,
} from "@/components/shared";
import { ConfirmationModal } from "@/components/modals";
import AdminProductCard from "../shared/AdminProductCard";
import { useSelectable, useModal, useCollectionProductsQueries } from "@/hooks";

import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { NoData } from "@/components/shared/NoData";
import { useRemoveProductsFromProductCollectionMutation } from "@/libs/redux/apiSlices/productCollection/productCollectionApiSlice";
import { catchAsyncGeneral, showToast } from "@/utils";

export const ProductCollectionMain = ({
  productCollectionSlug,
}: {
  productCollectionSlug: string;
}) => {
  const { queryMeta, changePage, collectionProducts, isFetching, refetch } =
    useCollectionProductsQueries(productCollectionSlug);

  const productsWithoutSerial = collectionProducts?.map(
    (product) => product?.product
  );

  const {
    selected,
    toggleSelectOne,
    toggleSelectAll,
    checkIfSelected,
    isAllSelected,
  } = useSelectable(productsWithoutSerial, "_id");

  const { isModalOpen, openModal, closeModal } = useModal();

  const [removeProducts, { isLoading: isRemoving }] =
    useRemoveProductsFromProductCollectionMutation();

  const handleRemove = catchAsyncGeneral(async () => {
    if (!selected.length) return;

    const res = await removeProducts({
      slug: productCollectionSlug,
      productIds: selected as string[],
    }).unwrap();

    if (res.success) {
      showToast({ message: res.message });
      closeModal();
      await refetch?.();
    }
  });

  return (
    <div className="flex flex-col grow bg-white relative">
      {/* Overlay spinner */}
      {(isFetching || isRemoving) && <LoadingSpinner centered={true} />}

      <InnerContainer className="mt-4 mb-10 grow">
        {/* Action buttons */}
        <div className="flex justify-center gap-4 mb-4 sm:justify-end">
          <ButtonBtnTrans
            isDisabled={collectionProducts.length === 0}
            onClick={() => toggleSelectAll()}
            className="font-inherit text-lg"
          >
            {isAllSelected ? "Deselect All" : "Select All"}
          </ButtonBtnTrans>

          <ButtonBtnTrans
            onClick={openModal}
            className="text-red-600 font-inherit text-lg !gap-1"
            isDisabled={selected.length < 1}
          >
            <TrashcanIcon className="mr-1" />
            Remove Selected
          </ButtonBtnTrans>
        </div>

        {/* Product grid OR No data */}
        {collectionProducts?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2md:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4">
            {collectionProducts.map((p) => (
              <AdminProductCard
                key={p.serial}
                product={p.product}
                toggleSelectOne={toggleSelectOne}
                isSelected={checkIfSelected(p.product)}
              />
            ))}
          </div>
        ) : (
          !isFetching && <NoData centered text="No products" />
        )}

        {/* Pagination */}
        {!!collectionProducts?.length && (
          <Pagination
            className="mt-auto pt-10"
            totalPages={queryMeta?.totalPages}
            currentPage={queryMeta?.page}
            setCurrentPage={changePage}
          />
        )}
      </InnerContainer>

      {/* Delete confirmation modal */}
      <ConfirmationModal
        show={isModalOpen}
        message={`Are you sure you want to remove ${selected.length} product(s) from this collection?`}
        onConfirm={handleRemove}
        onCancel={closeModal}
      />
    </div>
  );
};

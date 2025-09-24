"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { BaseModal } from "./BaseModal";
import {
  ButtonBtn,
  ButtonBtnTrans,
  CartIcon,
  ErrorMessage,
  LoadingSpinner,
} from "@/components/shared";
import { useLazyGetProductForCustomerQuery } from "@/libs/redux/apiSlices/product/productApiSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsModalOpen,
  setQuickViewModalData,
} from "@/libs/redux/features/productQuickView/productQuickViewSlice";
import { TRootState } from "@/libs/redux/store";
import { setBackdropOpen } from "@/libs/redux/features/backdrop/backdropSlice";
import { useEffect, useRef, useState } from "react";

import { VariantSelector } from "@/components/shared";
import { IVariant } from "@/utils/variantUtils";

export const ProductQuickViewModal = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { quickViewModalData, isModalOpen } = useSelector(
    (state: TRootState) => state.productQuickView
  );

  const slugRef = useRef<string>("");
  const [fetchProduct, { data, isFetching, isError }] =
    useLazyGetProductForCustomerQuery();

  const [selectedVariant, setSelectedVariant] = useState<
    IVariant | undefined
  >();

  // trigger fetch when modal opens
  useEffect(() => {
    if (isModalOpen && quickViewModalData?.slug) {
      slugRef.current = quickViewModalData.slug;
      fetchProduct({
        slug: quickViewModalData.slug,
        reviewStats: false,
        limitFields: "variants",
      });
    }
  }, [isModalOpen, quickViewModalData?.slug, fetchProduct]);

  // update redux state once data arrives
  useEffect(() => {
    if (data?.success) {
      dispatch(
        setQuickViewModalData({
          ...quickViewModalData,
          variants: data.data?.product?.variants,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dispatch]);

  const closeModal = () => {
    dispatch(setBackdropOpen(false));
    dispatch(setIsModalOpen(false));

    setTimeout(() => {
      dispatch(setQuickViewModalData({}));
      setSelectedVariant(undefined);
    }, 500);
  };

  const handleViewDetails = () => {
    closeModal();
    if (slugRef.current) {
      router.push(`/products/${slugRef.current}`);
    }
  };

  const handleAddToCart = () => {
    if (!quickViewModalData?.slug || !selectedVariant) return;

    closeModal();
    // dispatch(addToCart({ slug: quickViewModalData.slug, variant: selectedVariant }))
    console.log("Add to cart:", {
      slug: quickViewModalData.slug,
      variant: selectedVariant,
    });
  };

  return (
    <BaseModal
      condition={isModalOpen}
      closeFunction={closeModal}
      className="!w-full max-w-[22rem] xs:max-w-[30rem] sm:max-w-[40rem] md:max-w-[48rem] min-h-[25rem] max-h-[80vh] bg-white rounded-xl shadow-lg overflow-hidden z-500 p-4 flex flex-col"
    >
      {isFetching && (
        <div className="relative w-full grow">
          <LoadingSpinner />
        </div>
      )}

      {isError && !isFetching && (
        <div className="py-10 text-center">
          <ErrorMessage text="Failed to load product. Please try again." />
        </div>
      )}

      {quickViewModalData?.variants && !isFetching && (
        <div className="grid sm:grid-cols-2 pt-2 gap-6 grow">
          {/* Product Image */}
          <div className="w-3/4 mx-auto aspect-square overflow-hidden">
            <Image
              src={quickViewModalData.defaultImage as string}
              alt={quickViewModalData.title!}
              width={600}
              height={600}
              className="object-contain w-full h-full"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h2
              title={quickViewModalData.title}
              className="line-clamp-3 text-xl font-semibold mb-4"
            >
              {quickViewModalData.title}
            </h2>

            {/* Variants with selector */}
            {quickViewModalData.variants.length > 0 && (
              <div className="mb-4">
                <VariantSelector
                  variants={quickViewModalData.variants}
                  onVariantSelect={setSelectedVariant}
                />
              </div>
            )}

            {/* CTA Buttons */}
            <div className="mt-auto pt-4 flex gap-3 sm:gap-4 items-center justify-between">
              <ButtonBtnTrans
                onClick={handleViewDetails}
                className="text-sm sm:text-base underline"
              >
                View Details
              </ButtonBtnTrans>

              <ButtonBtn
                onClick={handleAddToCart}
                isDisabled={!selectedVariant}
                className="!successClasses !rounded-full !px-5 !py-2 !gap-1"
              >
                <CartIcon />
                Add to Cart
              </ButtonBtn>
            </div>
          </div>
        </div>
      )}
    </BaseModal>
  );
};

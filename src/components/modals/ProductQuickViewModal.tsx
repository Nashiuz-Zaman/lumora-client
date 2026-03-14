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
  PriceDisplay,
  VariantSelector,
  QuantitySelector,
} from "@/components/shared";
import { useLazyGetProductForCustomerQuery } from "@/libs/redux/apiSlices/product.api.slice";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsModalOpen,
  setQuickViewModalData,
} from "@/libs/redux/features/productQuickView/productQuickViewSlice";
import { TRootState } from "@/libs/redux/store";
import { setBackdropOpen } from "@/libs/redux/features/backdrop/backdropSlice";
import { useEffect, useRef, useState } from "react";

import { IVariant } from "@/utils";
import { IAddItemToCartRequest } from "@/libs/redux/apiSlices/cart.api.slice";
import { useCartState } from "@/hooks/useCartState";

export const ProductQuickViewModal = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { quickViewModalData, isModalOpen } = useSelector(
    (state: TRootState) => state.productQuickView,
  );
  const slugRef = useRef<string>("");
  const [fetchProduct, { data, isFetching, isError }] =
    useLazyGetProductForCustomerQuery();

  const [curProductVariant, setCurProductVariant] = useState<
    IVariant | undefined
  >();
  const { addProductToCart, isCartBusy } = useCartState();

  const [quantity, setQuantity] = useState<number>(1);

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
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dispatch]);

  const closeModal = () => {
    dispatch(setBackdropOpen(false));
    dispatch(setIsModalOpen(false));

    setTimeout(() => {
      dispatch(setQuickViewModalData({}));
      setCurProductVariant(undefined);
      setQuantity(1);
    }, 500);
  };

  const handleViewDetails = () => {
    closeModal();
    if (slugRef.current) {
      router.push(`/products/${slugRef.current}`);
    }
  };

  const handleAddToCart = () => {
    if (!curProductVariant) return;

    const cartPayload: IAddItemToCartRequest = {
      productId: quickViewModalData?._id as string,
      variantId: curProductVariant?._id as string,
      quantity,
    };

    addProductToCart({ data: cartPayload });
  };

  const handleIncrease = () => {
    if (!curProductVariant) return;
    setQuantity((prev) => prev + 1);
  };
  const handleDecrease = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <BaseModal
      condition={isModalOpen}
      closeFunction={closeModal}
      className="w-full! max-w-88 xs:max-w-120 sm:max-w-160 md:max-w-3xl min-h-100 max-h-[90vh] bg-white rounded-xl shadow-lg overflow-hidden z-500 p-4 flex flex-col overflow-y-auto"
    >
      {isFetching && (
        <div className="relative w-full grow">
          <LoadingSpinner />
        </div>
      )}

      {!isFetching && isError && (
        <div className="py-10 text-center">
          <ErrorMessage text="Failed to load product. Please try again." />
        </div>
      )}

      {!isFetching && quickViewModalData?.variants && (
        <div className="grid md:grid-cols-2 pt-2 gap-4 md:gap-6 grow">
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
              className="line-clamp-3 text-xl font-semibold mb-2 md:mb-4"
            >
              {quickViewModalData.title}
            </h2>

            {/* Price */}
            <PriceDisplay
              price={
                curProductVariant
                  ? curProductVariant.price
                  : (quickViewModalData.defaultPrice as number)
              }
              oldPrice={curProductVariant?.oldPrice}
              discountPercentage={curProductVariant?.discountPercentage}
              className="mb-1 md:mb-3"
            />

            {/* Variants with selector */}
            {quickViewModalData.variants.length > 0 && (
              <div className="mb-1.5 md:mb-4">
                <VariantSelector
                  variants={quickViewModalData.variants}
                  onVariantSelect={setCurProductVariant}
                />
              </div>
            )}

            <div className="mt-auto pt-2 md:pt-4">
              <ButtonBtnTrans
                onClick={handleViewDetails}
                className="block! text-sm sm:text-base w-max underline mr-auto! mb-3"
              >
                View Details
              </ButtonBtnTrans>

              {/* CTA Section */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <QuantitySelector
                  quantity={quantity}
                  min={1}
                  max={curProductVariant?.stock}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                />
                
                <ButtonBtn
                  onClick={handleAddToCart}
                  isLoading={isCartBusy}
                  disabled={!curProductVariant}
                  className="successClasses! rounded-full! px-5! py-2! gap-2!"
                >
                  <CartIcon className="text-2xl" />
                  Add to Cart
                </ButtonBtn>
              </div>
            </div>
          </div>
        </div>
      )}
    </BaseModal>
  );
};

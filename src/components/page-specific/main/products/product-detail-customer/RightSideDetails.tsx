"use client";

import { useState, useCallback } from "react";

import {
  AccordionVertical,
  CartIcon,
  ButtonBtn,
  RatingStars,
} from "@/components/shared";
import { AboutProduct } from "./AboutProduct";

// types
import { IVariant, IProductWithReviewsAndStats } from "@/types/product";
import { VariantSelector } from "./VariantSelector";
import { ICartAction } from "@/types/cart";
import { useCartActions } from "@/hooks";

interface IRightSideDetailsProps {
  data: IProductWithReviewsAndStats;
  isAddToCartDisabled?: boolean;
}

export const RightSideDetails = ({
  data,
  isAddToCartDisabled = false,
}: IRightSideDetailsProps) => {
  const [curProductVariant, setCurProductVariant] = useState<
    IVariant | undefined
  >();
  const [expanded, setExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addRemoveProductToCart, isCartUpdating } = useCartActions();

  const handleVariantUpdate = useCallback((variant?: IVariant) => {
    setCurProductVariant(variant);
    setQuantity(1);
  }, []);

  const { product, reviewStats } = data;

  const handleAddToCart = () => {
    if (!curProductVariant) return;

    const cartPayload: ICartAction = {
      action: "add",
      productId: data.product._id!,
      variantId: curProductVariant?._id as string,
      quantity,
    };

    addRemoveProductToCart({ data: cartPayload });
  };

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    if (!curProductVariant) return;
    setQuantity((prev) => Math.min(curProductVariant.stock, prev + 1));
  };

  return (
    <section className="flex flex-col gap-3">
      {/* Title and subtitle */}
      <div>
        <h2 className="text-2xl font-semibold leading-snug">{product.title}</h2>
        {product.subtitle && (
          <p className="text-sm text-neutral-500">{product.subtitle}</p>
        )}
      </div>

      {/* Ratings */}
      <div className="flex items-center gap-2 text-lg 2xl:text-xl">
        <RatingStars rating={reviewStats?.averageRating ?? 0} />
        <span className="text-base 2xl:text-lg text-neutral-600">
          {reviewStats?.totalReviews ?? 0} ratings
        </span>
      </div>

      {/* Variant selector */}
      {product?.variants?.length > 0 && (
        <VariantSelector
          variants={product.variants}
          onVariantSelect={handleVariantUpdate}
        />
      )}

      {/* About Product */}
      {product.aboutProduct && (
        <>
          <AccordionVertical
            expanded={expanded}
            animate
            duration="300ms"
            previewHeight="8rem"
            className="mt-6 text-sm sm:text-base leading-relaxed"
          >
            <AboutProduct data={product.aboutProduct} />
          </AccordionVertical>

          <button
            className="mt-2 w-max underline font-semibold"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Show Less" : "Read More..."}
          </button>
        </>
      )}

      <div className="mt-auto pt-6 flex items-center gap-4">
        {/* Quantity Selector */}
        <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={handleDecrease}
            className="px-3 py-2 text-lg font-medium hover:bg-neutral-100 disabled:opacity-50 cursor-pointer"
            disabled={quantity <= 1}
          >
            –
          </button>
          <span className="px-4 py-2 text-sm font-semibold">{quantity}</span>
          <button
            type="button"
            onClick={handleIncrease}
            className="px-3 py-2 text-lg font-medium hover:bg-neutral-100 disabled:opacity-50 cursor-pointer"
            disabled={!curProductVariant || quantity >= curProductVariant.stock}
          >
            +
          </button>
        </div>

        {/* Add to Cart */}
        <ButtonBtn
          onClick={handleAddToCart}
          isLoading={isCartUpdating}
          isDisabled={isAddToCartDisabled || !curProductVariant}
          className="primaryClasses"
        >
          <CartIcon className="text-2xl" /> Add to cart
        </ButtonBtn>
      </div>
    </section>
  );
};

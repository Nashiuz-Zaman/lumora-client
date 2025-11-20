"use client";

import { useState, useCallback, useEffect } from "react";

import {
  AccordionVertical,
  CartIcon,
  ButtonBtn,
  RatingStars,
  QuantitySelector,
} from "@/components/shared";
import { AboutProduct } from "./AboutProduct";

// types
import { IVariant, IProductWithFullReviewsStats } from "@/types/product";
import { VariantSelector } from "./VariantSelector";
import { ICartAction } from "@/types/cart";
import { useCartActions } from "@/hooks";

interface IRightSideDetailsProps {
  data: IProductWithFullReviewsStats;
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
  const [isClient, setIsClient] = useState(false);

  const { addRemoveProductToCart, isCartLoading } = useCartActions();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleVariantUpdate = useCallback((variant?: IVariant) => {
    setCurProductVariant(variant);
    setQuantity(1);
  }, []);

  const { product, reviewStats } = data;

  const handleAddToCart = () => {
    if (!curProductVariant) return;

    const cartPayload: ICartAction = {
      action: "add",
      product: data.product._id!,
      variant: curProductVariant?._id as string,
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

  if (!isClient) return null;

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
            duration="250ms"
            previewHeight="8rem"
            className="mt-6 text-sm sm:text-base leading-relaxed"
          >
            <AboutProduct data={product.aboutProduct} />
          </AccordionVertical>

          <button
            className="mt-2 w-max underline cursor-pointer font-semibold"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Show Less" : "Read More..."}
          </button>
        </>
      )}

      <div className="mt-auto pt-6 flex items-center gap-4">
        {/* Quantity Selector */}
        <QuantitySelector
          quantity={quantity}
          min={1}
          max={curProductVariant?.stock}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />

        {/* Add to Cart */}
        <ButtonBtn
          onClick={handleAddToCart}
          isLoading={isCartLoading}
          disabled={isAddToCartDisabled || !curProductVariant}
          className="successClasses !py-2.5 !rounded-full !gap-2"
        >
          <CartIcon className="text-2xl" /> Add to cart
        </ButtonBtn>
      </div>
    </section>
  );
};

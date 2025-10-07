"use client";

import { InnerContainer } from "@/components/shared";
import { ProductForm } from "../shared/ProductForm";
import { IProduct } from "@/types";
import { useRefState, useSetElementText } from "@/hooks";

export const CloneProductMain = ({ product }: { product?: IProduct }) => {
  // set the page heading below
  const { refs } = useRefState();
  useSetElementText(refs?.titleRef?.current, "Clone Product");

  return (
    <InnerContainer className="grow">
      <section className="py-10">
        <ProductForm product={product} />
      </section>
    </InnerContainer>
  );
};

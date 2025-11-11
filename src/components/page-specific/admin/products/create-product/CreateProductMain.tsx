"use client";

import { InnerContainer } from "@/components/shared";
import { ProductForm } from "../shared/ProductForm";
import { useRefState, useSetElementText } from "@/hooks";

export const CreateProductMain = () => {
  // set the page heading below
  const { refs } = useRefState();
  useSetElementText(refs?.titleRef?.current, "Create Product");

  return (
    <InnerContainer className="grow">
      <section className="py-10">
        <ProductForm />
      </section>
    </InnerContainer>
  );
};

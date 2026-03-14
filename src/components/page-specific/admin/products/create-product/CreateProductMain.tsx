"use client";

import { InnerContainer } from "@containers/InnerContainer";
import { ProductForm } from "../shared/ProductForm";
import { useRefState } from "@/hooks/useRefState";
import { useSetElementText } from "@/hooks/useSetElementText";

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

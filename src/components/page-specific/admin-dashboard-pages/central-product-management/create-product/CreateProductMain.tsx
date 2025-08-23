import { DashboardPageHeading, InnerContainer } from "@/components/shared";
import { ProductForm } from "../shared/ProductForm";
import { IProduct } from "@/types";

export const CreateProductMain = ({ product }: { product?: IProduct }) => {
  return (
    <InnerContainer className="grow">
      <section className="py-10">
        <DashboardPageHeading text="Create Product" className="mb-6" />

        <ProductForm product={product} />
      </section>
    </InnerContainer>
  );
};

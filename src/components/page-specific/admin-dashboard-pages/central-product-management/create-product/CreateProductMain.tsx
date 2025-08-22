import { DashboardPageHeading, InnerContainer } from "@/components/shared";
import { ProductForm } from "../shared/ProductForm";

export const CreateProductMain = () => {
  return (
    <InnerContainer className="grow">
      <section className="py-10">
        <DashboardPageHeading text="Create Product" className="mb-6" />

        <ProductForm />
      </section>
    </InnerContainer>
  );
};

import {
  DashboardPageHeading,
  InnerContainer,
  LinkBtn,
} from "@/components/shared";
import { ProductForm } from "../shared/ProductForm";
import { IProduct } from "@/types";
import ColorBadge from "@/components/shared/ColorBadge";
import { ProductStatus } from "@/constants";

export const EditProductMain = ({ product }: { product: IProduct }) => {
  // Determine badge content and styling
  const isActive = product.status === ProductStatus.Active;
  const badgeText = isActive ? "Published" : "Draft";
  const badgeClass = isActive ? "!bg-green-500" : "!bg-yellow-500";

  return (
    <InnerContainer className="grow">
      <section className="py-10">
        <div className="flex items-center justify-between mb-6 2md:max-w-[49%]">
          <DashboardPageHeading text="Edit Product" />

          <ColorBadge className={badgeClass + ' ml-2 mr-auto'}>{badgeText}</ColorBadge>

          <LinkBtn
            className="!primaryClasses !px-3 !py-2"
            href={`/admin/products/clone?productId=${product._id}`}
          >
            Create Clone
          </LinkBtn>
        </div>

        <ProductForm mode="edit" product={product} />
      </section>
    </InnerContainer>
  );
};

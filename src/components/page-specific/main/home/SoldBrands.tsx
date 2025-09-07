// components
import { InnerContainer } from "@/components/shared";
import { BrandsMarquee } from "./BrandsMarquee";

export const SoldBrands = () => {
  return (
    <section className="mb-10 md:mb-16 lg:mb-24">
      <InnerContainer className="mb-8 md:mb-12 lg:mb-16 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-3">
          Top Brands
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-500">
          We sell products from over <span className="font-semibold">100+</span>{" "}
          brands
        </p>
      </InnerContainer>

      <BrandsMarquee />
    </section>
  );
};

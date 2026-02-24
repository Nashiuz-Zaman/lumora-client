"use client";

import Image from "next/image";
import { InnerContainer } from "@/components/shared";
import LogoSocials from "./LogoSocials";
import { useGetCategoryTreeQuery } from "@/libs/redux/apiSlices/category/categoryApiSlice";

import { socialMediaLinks } from "@/static-data/footerData";
import { useProductSearchParamsManagement } from "@/hooks";
import NavAddress from "./NavAddress";

const Footer = () => {
  const curYear = new Date().getFullYear();
  const { data: categoryTree, isLoading, isError } = useGetCategoryTreeQuery();
  const { handleCategoryClick } = useProductSearchParamsManagement();

  return (
    <footer className="bg-linear-to-br from-primary-dark-2 via-primary to-primary-light-2 text-white mt-auto">
      <InnerContainer>
        <div className="grid grid-cols-1 gap-8 py-8 lg:pt-14 lg:pb-6 xl:grid-cols-[1fr_1.3fr]">
          {/* Logo + socials */}
          <div className="flex flex-col gap-10 mb-12">
            <LogoSocials socialMediaLinks={socialMediaLinks} />

            <NavAddress />
          </div>

          {/* Category navigation */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
            {isLoading && <p>Loading categories...</p>}
            {isError && <p>Failed to load categories</p>}
            {categoryTree &&
              categoryTree.map((item) => (
                <div key={item.topCategory._id}>
                  <h4 className="font-semibold mb-2">
                    {item.topCategory.title}
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {item.subCategories.map((sub) => (
                      <li key={sub._id}>
                        <button
                          onClick={() => {
                            handleCategoryClick({
                              type: "subs",
                              subSlugs: [sub.slug],
                            });
                          }}
                          className="hover:underline cursor-pointer"
                        >
                          {sub.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>

        {/* Payment methods */}
        <div className="flex justify-center">
          <Image
            src="/logos/payment-portal/payment.webp"
            alt="Payment options"
            width={598}
            height={63}
            className="w-48 sm:w-56 md:w-[18rem] lg:w-[24rem] xl:w-lg 2xl:w-148 h-auto my-6 lg:my-10"
          />
        </div>

        {/* Copyright */}
        <small className="block text-center mb-6 text-xs sm:text-sm text-white px-4">
          © {curYear} | Developed by Nashiuz Zaman
        </small>
      </InnerContainer>
    </footer>
  );
};

export default Footer;

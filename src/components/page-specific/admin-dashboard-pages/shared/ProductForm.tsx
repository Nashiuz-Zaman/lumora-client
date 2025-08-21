"use client";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { IProduct, IProductFormProps } from "@/types";
import { ProductBasicInfo } from "./ProductBasicInfo";
import { Variants } from "./Variants";
import { ImageUploader } from "./ImageUploader";
import ProductVideosInput from "./ProductVideosInput";
import SpecsCreator from "./SpecsCreator";
import SEOManager from "./SEOManager";
import { ProductStatus } from "@/constants/product";
import { ProductOptionsAndBrandVendor } from "./ProductOptionsAndBrandVendor";
import { useLazyGetSignedUrlQuery } from "@/libs/redux/apiSlices/cloudinary/cloudinaryApiSlice";
import axios from "axios";
import { uploadFileWithSignedUrl } from "@/utils/uploadFileWithSignedUrls";

const defaultVariant = {
  sku: "",
  stock: 0,
  price: 0,
  oldPrice: 0,
  discountPercentage: 0,
};

export const ProductForm = ({
  mode = "create",
  product: existingProduct,
}: IProductFormProps) => {
  const methods = useForm<IProduct>({
    defaultValues: existingProduct || {
      title: "",
      subtitle: "",
      defaultPrice: 0,
      defaultImage: "",
      brand: "",
      variants: [{ ...defaultVariant }],
      videos: [],
      images: [],
      status: ProductStatus.Draft,
      warrantyAndSupport: "",
      aboutProduct: "",
      specifications: [],
      // SEO fields
      seoTitle: "",
      seoDescription: "",
      metaKeywords: "",
      tags: "",
      canonicalUrl: "",
      topCategory: "",
      subCategory: "",
    },
  });
  const [getSignedUrl] = useLazyGetSignedUrlQuery();

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<IProduct> = (data) => {
    const images = data.images || [];
    const newImages: string[] = [];

    images.forEach((image) => {
      if (image instanceof File) {
        const uploadImage = async () => {
          const url = await uploadFileWithSignedUrl(image, getSignedUrl);
          if (url) newImages.push(url);
        };

        uploadImage();
      } else {
        newImages.push(image);
      }
    });

    const newData = { ...data, images: newImages };

    console.log(newData);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-[1.25fr_1fr] gap-5 max-w-full lg:max-w-[90%]">
          <div className="space-y-6">
            {/* No props needed anymore */}
            <ProductBasicInfo />
            <Variants defaultVariant={defaultVariant} />
            <ImageUploader />
            <ProductVideosInput />
            <SpecsCreator />
          </div>

          <div className="space-y-6">
            <ProductOptionsAndBrandVendor />
            <SEOManager />
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded"
        >
          {mode === "create" ? "Create Product" : "Update Product"}
        </button>
      </form>
    </FormProvider>
  );
};

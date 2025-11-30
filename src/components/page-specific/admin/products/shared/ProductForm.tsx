"use client";

import { useForm, FormProvider } from "react-hook-form";
import { IApiResponse, IProduct, IProductFormProps } from "@/types";
import { ProductBasicInfo } from "./ProductBasicInfo";
import { Variants } from "./Variants";
import { ImageUploader } from "./ImageUploader";
import ProductVideosInput from "./ProductVideosInput";
import SpecsCreator from "./SpecsCreator";
import SEOManager from "./SEOManager";
import { ProductStatus } from "@/constants/product";
import { ProductOptionsAndBrandVendor } from "./ProductOptionsAndBrandVendor";
import { useLazyGetSignedUrlQuery } from "@/libs/redux/apiSlices/cloudinary/cloudinaryApiSlice";
import { uploadFileWithSignedUrl } from "@/utils/uploadFileWithSignedUrls";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/libs/redux/apiSlices/product/productApiSlice";
import { catchAsyncGeneral, showToast } from "@/utils";
import { ButtonBtn } from "@/components/shared";
import cloneDeep from "lodash/cloneDeep";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const router = useRouter();
  const formInstance = useForm<Partial<IProduct>>({
    defaultValues: existingProduct
      ? cloneDeep(existingProduct)
      : {
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
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const { handleSubmit, reset } = formInstance;
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = catchAsyncGeneral(
    async (args) => {
      setIsLoading(true);
      const data = args?.data as Partial<IProduct>;
      const images = data?.images || [];
      const processedImages: string[] = [];

      for (const image of images) {
        if (image instanceof File) {
          const url = await uploadFileWithSignedUrl(image, getSignedUrl);
          if (url) processedImages.push(url);
        } else {
          processedImages.push(image);
        }
      }

      const isMultiVariants: boolean =
        Object.keys(data?.variants![0])?.length >
        Object.keys(defaultVariant).length;

      if (!isMultiVariants) {
        data.variants = [cloneDeep(data?.variants![0])];
      }

      const newData = {
        ...data,
        images: processedImages,
      };

      let res: IApiResponse;

      if (mode === "create") {
        res = await createProduct(newData).unwrap();
      } else if (mode === "edit") {
        res = await updateProduct({
          id: newData._id as string,
          data: newData,
        }).unwrap();
      } else return;

      if (res?.success) {
        showToast({ message: res?.message });

        if (mode === "create") {
          reset();

          if (existingProduct) {
            router.push("/admin/products/all-products");
          }
        } else if (mode === "edit") {
          router.refresh();
        }
      }
    },
    {
      onFinally() {
        setIsLoading(false);
      },
      handleError: "toast",
    }
  );

  return (
    <FormProvider {...formInstance}>
      <form
        onSubmit={handleSubmit(async (data) => await onSubmit({ data }))}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 2md:grid-cols-[1.25fr_1fr] gap-5 max-w-full lg:max-w-[90%]">
          <div className="space-y-6">
            {/* No props needed anymore */}
            <ProductBasicInfo />
            <Variants
              defaultVariant={defaultVariant}
              existingVariant={existingProduct?.variants?.[0]}
            />
            <ImageUploader />
            <ProductVideosInput />
            <SpecsCreator />
          </div>

          <div className="space-y-6">
            <ProductOptionsAndBrandVendor />
            <SEOManager />
          </div>
        </div>

        <ButtonBtn
          isLoading={isLoading}
          type="submit"
          className="successClasses!"
        >
          {mode === "create" ? "Create Product" : "Update Product"}
        </ButtonBtn>
      </form>
    </FormProvider>
  );
};

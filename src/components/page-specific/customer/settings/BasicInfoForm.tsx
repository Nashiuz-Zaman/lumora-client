"use client";

import { useForm } from "react-hook-form";
import {
  ButtonBtn,
  InputField,
  ProfilePhotoChanger,
} from "@/components/shared";
import { catchAsyncGeneral, showToast, uploadFileWithSignedUrl } from "@/utils";
import { Heading } from "./Heading";
import { ICustomerProfile, TImage } from "@/types";
import { useUpdateCustomerBasicInfoMutation } from "@/libs/redux/apiSlices/customer/customerApiSlice";
import { useLazyGetSignedUrlQuery } from "@/libs/redux/apiSlices/cloudinary/cloudinaryApiSlice";
import { useState } from "react";

interface IBasicInfoFormProps {
  data: ICustomerProfile;
  className?: string;
}

export type TBasicInfoFormValues = {
  name: ICustomerProfile["name"];
  email: ICustomerProfile["email"];
  phone: ICustomerProfile["phone"];
  image: TImage;
};

export const BasicInfoForm = ({ data, className }: IBasicInfoFormProps) => {
  const [updateCustomerBasicInfo] = useUpdateCustomerBasicInfoMutation();
  const [getSignedUrl] = useLazyGetSignedUrlQuery();
  const [isLoading, setIsloading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TBasicInfoFormValues>({
    defaultValues: {
      name: data?.name || "",
      email: data?.email || "",
      phone: data?.phone || "",
      image: data?.image || "",
    },
  });

  const onSubmit = catchAsyncGeneral(
    async (args) => {
      setIsloading(true);
      const data = args?.data as TBasicInfoFormValues;

      if (data?.image instanceof File) {
        const url = await uploadFileWithSignedUrl(data?.image, getSignedUrl);
        if (url) data.image = url;
      }

      const result = await updateCustomerBasicInfo(data).unwrap();
      if (result?.success) {
        showToast({ message: "Profile updated successfully!" });
      }
    },
    {
      onFinally() {
        setIsloading(false);
      },
    }
  );

  if (!data) return null;

  return (
    <div
      className={`max-w-3xl shadow-md rounded-2xl border border-neutral-100 p-6 md:p-8 ${
        className || ""
      }`}
    >
      <div className="flex items-center gap-2 mb-6">
        <Heading text="Basic Information" className="!pl-0" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-5">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center gap-4 rounded-2xl p-6 bg-white/60">
          <ProfilePhotoChanger
            initialImage={data.image}
            buttonText="Change Photo"
            wrapperClasses="flex flex-col items-center"
            buttonClasses="!text-sm mt-3"
            imageClasses="rounded-full shadow-sm border border-neutral-100"
            onFileSelect={(file: File) => setValue("image", file)}
          />
          <p className="text-sm text-neutral-500 text-center leading-relaxed">
            Profile photo helps personalize your account.
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit((data) => onSubmit({ data }))}
          className="flex flex-col justify-between space-y-6"
        >
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            <InputField
              labelText="Name"
              labelTextClassName="text-sm font-medium text-neutral-700 mb-1"
              inputClassName="rounded-md border border-neutral-200 bg-neutral-50/70 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-neutral-400 px-4 py-2.5 text-sm transition-all duration-150"
              placeholder="Kevin Gilbert"
              {...register("name", { required: "Full name is required" })}
              error={errors.name?.message}
            />

            <InputField
              labelText="Email Address"
              type="email"
              labelTextClassName="text-sm font-medium text-neutral-700 mb-1"
              inputClassName="rounded-md border border-neutral-200 bg-neutral-50/70 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-neutral-400 px-4 py-2.5 text-sm transition-all duration-150"
              placeholder="kevin.gilbert@gmail.com"
              {...register("email", { required: "Email is required" })}
              error={errors.email?.message}
            />

            <InputField
              labelText="Phone Number"
              labelTextClassName="text-sm font-medium text-neutral-700 mb-1"
              inputClassName="rounded-md border border-neutral-200 bg-neutral-50/70 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-neutral-400 px-4 py-2.5 text-sm transition-all duration-150"
              placeholder="+1-202-555-0118"
              {...register("phone")}
              error={errors.phone?.message}
            />
          </div>

          <ButtonBtn
            type="submit"
            isLoading={isLoading}
            className="w-full md:w-auto !text-sm tracking-wide bg-primary !rounded-full text-neutral-50 hover:bg-primary/90 px-6 py-2.5 transition-all duration-200 uppercase"
          >
            Save Changes
          </ButtonBtn>
        </form>
      </div>
    </div>
  );
};

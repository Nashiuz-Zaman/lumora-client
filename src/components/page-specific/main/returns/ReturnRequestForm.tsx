"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Inputfield,
  SelectField,
  ButtonBtn,
  TextArea,
  ErrorMessage,
  FileUploadField,
} from "@/components/shared";
import { showToast, uploadFileWithSignedUrl } from "@/utils";
import { ReturnReasons } from "@/constants/returnRequest";
import { useLazyGetSignedUrlQuery } from "@/libs/redux/apiSlices/cloudinary/cloudinaryApiSlice";
import { useCreateReturnRequestMutation } from "@/libs/redux/apiSlices/returnRequest/returnRequestApiSlice";

type TFormValues = {
  orderId: string;
  reason: string;
  description: string;
  invoice: FileList;
  files?: FileList;
};

export const ReturnRequestForm = () => {
  const [submitReturnRequest, { isLoading }] = useCreateReturnRequestMutation();
  const [getSignedUrl] = useLazyGetSignedUrlQuery();
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors },
  } = useForm<TFormValues>();

  const invoiceFile = watch("invoice");
  const imageFiles = watch("files");

  const onSubmit: SubmitHandler<TFormValues> = async (data) => {
    try {
      setIsUploading(true);

      const {
        orderId,
        reason,
        description,
        invoice: invoiceFile,
        files: imageFiles,
      } = data;
      const invoice = invoiceFile?.[0];

      if (!invoice) {
        setError("invoice", { message: "Invoice file is required" });
        return;
      }

      // Upload invoice first
      const invoiceUrl = await uploadFileWithSignedUrl(invoice, getSignedUrl);

      // Upload optional images (if any)
      let photoUrls: string[] = [];
      if (imageFiles && imageFiles.length > 0) {
        const uploads = await Promise.allSettled(
          Array.from(imageFiles).map((f) =>
            uploadFileWithSignedUrl(f, getSignedUrl)
          )
        );
        photoUrls = uploads
          .filter(
            (r): r is PromiseFulfilledResult<string> => r.status === "fulfilled"
          )
          .map((r) => r.value);
      }

      const payload = {
        orderId,
        reason,
        description,
        invoiceUrl,
        photoUrls,
      };

      const res = await submitReturnRequest(payload).unwrap();
      if (res.success) {
        showToast({ message: res.message });
        reset();
      }
    } catch (err: any) {
      setError("root", {
        message:
          err?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Global Error */}
      {errors.root?.message && <ErrorMessage text={errors.root.message} />}

      {/* Order ID */}
      <Inputfield
        labelText="Order ID"
        labelTextClassName="font-semibold"
        placeholder="Enter your order ID"
        {...register("orderId", { required: "Order ID is required" })}
        error={errors.orderId?.message}
      />

      {/* Return Reason */}
      <SelectField
        labelText="Return Reason"
        labelTextClassName="font-semibold"
        placeholder="Select a reason"
        options={ReturnReasons.map((el) => ({ text: el, value: el }))}
        {...register("reason", { required: "Return reason is required" })}
        error={errors.reason?.message}
      />

      {/* Description */}
      <TextArea
        labelText="Issue Description"
        labelTextClassName="font-semibold"
        placeholder="Briefly describe the issue"
        {...register("description", { required: "Description is required" })}
        error={errors.description?.message}
      />

      {/* Invoice File */}
      <FileUploadField
        label="Upload Invoice"
        text="Choose File"
        icon="mdi:paperclip"
        accept=".pdf,.jpg,.png,.jpeg"
        register={register("invoice", {
          required: "Invoice file is required",
          validate: (files) =>
            files?.[0]?.size < 5 * 1024 * 1024 ||
            "File must be smaller than 5MB",
        })}
        files={invoiceFile}
        error={errors.invoice}
      />

      {/* Optional Photos */}
      <FileUploadField
        label="Upload Photos (optional)"
        text="Choose Images"
        icon="mdi:image-multiple-outline"
        accept="image/*"
        multiple
        register={register("files")}
        files={imageFiles}
        error={errors.files}
        className="!mb-10"
      />

      <ButtonBtn
        type="submit"
        isLoading={isLoading || isUploading}
        className="!primaryClasses ml-auto"
      >
        Submit Return Request
      </ButtonBtn>
    </form>
  );
};

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Inputfield,
  SelectField,
  ButtonBtn,
  TextArea,
  ErrorMessage,
  FileUploadField,
} from "@/components/shared";
import { catchAsyncGeneral, showToast, uploadFileWithSignedUrl } from "@/utils";
import { ReturnReasons } from "@/constants/returnRequest";
import { useLazyGetSignedUrlQuery } from "@/libs/redux/apiSlices/cloudinary/cloudinaryApiSlice";
import { useCreateReturnRequestMutation } from "@/libs/redux/apiSlices/returnRequest/returnRequestApiSlice";

type TFormValues = {
  orderId: string;
  reason: string;
  description: string;
  invoiceFile: FileList;
  proofFiles?: FileList;
};

export const ReturnRequestForm = () => {
  const [submitReturnRequest] = useCreateReturnRequestMutation();
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

  const invoiceFile = watch("invoiceFile");
  const imageFiles = watch("proofFiles");

  const onSubmit = catchAsyncGeneral(
    async (args) => {
      const data = args?.data as TFormValues;
      setIsUploading(true);

      const { orderId, reason, description, invoiceFile, proofFiles } = data;
      const invoice = invoiceFile?.[0];

      if (!invoice) {
        setError("invoiceFile", { message: "Invoice file is required" });
        return;
      }

      // Upload invoice first
      const invoiceUrl = await uploadFileWithSignedUrl(invoice, getSignedUrl);

      // Upload optional images (if any)
      let proofFileUrls: string[] = [];

      if (proofFiles && proofFiles?.length > 0) {
        const uploads = await Promise.all(
          Array.from(proofFiles).map(
            async (f) => await uploadFileWithSignedUrl(f, getSignedUrl)
          )
        );

        proofFileUrls = uploads as string[];
      }

      const payload = {
        orderId,
        reason,
        description,
        invoice: invoiceUrl,
        files: proofFileUrls,
      };

      const res = await submitReturnRequest(payload).unwrap();
      if (res.success) {
        showToast({ message: res.message });
        reset();
      }
    },
    {
      handleError: "function",
      onError(_error, _args, message) {
        setError("root", { message });
      },
      onFinally() {
        setIsUploading(false);
      },
    }
  );

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit({ data }))}
      className="space-y-6"
    >
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
        labelText="Upload Invoice"
        buttonText="Choose File"
        icon="mdi:paperclip"
        accept=".pdf,.jpg,.png,.jpeg"
        {...register("invoiceFile", {
          required: "Invoice file is required",
          validate: (files) =>
            files?.[0]?.size < 5 * 1024 * 1024 ||
            "File must be smaller than 5MB",
        })}
        files={invoiceFile}
        error={errors.invoiceFile}
      />

      {/* Optional Photos */}
      <FileUploadField
        labelText="Upload Photos (optional)"
        buttonText="Choose Images"
        icon="mdi:image-multiple-outline"
        accept="image/*"
        multiple
        {...register("proofFiles")}
        files={imageFiles}
        error={errors.proofFiles}
        className="!mb-10"
      />

      <ButtonBtn
        type="submit"
        isLoading={isUploading}
        className="!primaryClasses ml-auto"
      >
        Submit Return Request
      </ButtonBtn>
    </form>
  );
};

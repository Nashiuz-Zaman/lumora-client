"use client";

import { useFormContext } from "react-hook-form";

import { IProduct } from "@/types";
import { InputField, TextArea, FormSectionHeading } from "@/components/shared";

type TSEOManagerProps = {
  heading?: string;
  className?: string;
};

const SEOManager = ({ heading = "SEO", className = "" }: TSEOManagerProps) => {
  const { register } = useFormContext<IProduct>();

  return (
    <div className={`bg-white rounded-md p-5 mb-8 border border-neutral-200 ${className}`}>
      <FormSectionHeading tag="h4" text={heading} />
      <div className="space-y-4">
        {/* SEO Title */}
        <InputField
          {...register("seoTitle")}
          labelText="Title"
          labelTextClassName="font-medium"
          inputClassName="!rounded-md"
          placeholder=""
        />

        {/* SEO Description */}
        <TextArea
          {...register("seoDescription")}
          labelText="Description"
          labelTextClassName="font-medium mb-2"
          inputClassName="p-3 rounded-md !bg-white"
          placeholder="SEO Description"
        />

        {/* Meta Keywords */}
        <TextArea
          {...register("metaKeywords")}
          labelText="Meta Keywords (Comma separated)"
          labelTextClassName="!font-medium mb-2"
          inputClassName="p-3 rounded-md !bg-white"
          placeholder="Meta Keywords"
        />

        {/* Tags */}
        <InputField
          {...register("tags")}
          labelText="Tags (Comma separated)"
          labelTextClassName="font-medium"
          inputClassName="!rounded-md"
          placeholder=""
        />

        {/* Canonical URL */}
        <InputField
          {...register("canonicalUrl")}
          labelText="Canonical URL"
          labelTextClassName="font-medium"
          inputClassName="!rounded-md"
          placeholder=""
        />
      </div>
    </div>
  );
};

export default SEOManager;

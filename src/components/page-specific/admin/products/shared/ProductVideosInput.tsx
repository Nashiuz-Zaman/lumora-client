"use client";

import {
  ButtonBtnTrans,
  InputField,
  NoData,
  PlusIcon,
  TrashcanIcon,
} from "@/components/shared";

import { useFormContext, useFieldArray } from "react-hook-form";
import { IProduct } from "@/types";
import { ElementType } from "react";

type TProductVideosInputProps = {
  heading?: string;
  headingTag?: ElementType;
  videoSetsAllowed?: number;
  className?: string;
};

const ProductVideosInput = ({
  heading = "Product Videos",
  headingTag: HeadingTag = "h3",
  videoSetsAllowed = 10,
  className,
}: TProductVideosInputProps) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<IProduct>();

  // useFieldArray for "videos"
  const { fields, append, remove } = useFieldArray({
    control,
    name: "videos",
  });

  return (
    <div className={`p-5 bg-white border border-neutral-200 rounded-xl ${className}`}>
      {/* Heading and Add Button */}
      <div className="flex items-center justify-between mb-2">
        <HeadingTag className="font-semibold text-xl">{heading}</HeadingTag>
        {fields.length < videoSetsAllowed && (
          <ButtonBtnTrans
            className="!text-primary"
            type="button"
            onClick={() => append({ url: "" })}
          >
            <PlusIcon /> Add a video
          </ButtonBtnTrans>
        )}
      </div>

      <p className="text-sm text-neutral-400 mb-5">
        Add product video links (YouTube, Vimeo, etc.)
      </p>

      {/* Empty State */}
      {fields.length < 1 && (
        <div className="min-h-[15rem] relative">
          <NoData centered={true} text="No videos" />
        </div>
      )}

      {/* Video Inputs */}
      {fields.length > 0 && (
        <div className="space-y-2 min-h-[15rem]">
          {fields.map((field, i) => (
            <div key={field.id} className="flex items-center gap-4">
              <button
                title="Delete Video"
                type="button"
                onClick={() => remove(i)}
                className="text-red-600"
              >
                <TrashcanIcon />
              </button>

              <InputField
                {...register(`videos.${i}.url` as const, {
                  required: "Video URL is required",
                  pattern: {
                    value: /^(https?:\/\/)([\w.-]+)(:[0-9]+)?(\/[^\s]*)?$/i,
                    message: "Enter a valid URL",
                  },
                })}
                error={errors.videos?.[i]?.url?.message as string}
                inputClassName="rounded-md"
                placeholder="Video URL"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductVideosInput;

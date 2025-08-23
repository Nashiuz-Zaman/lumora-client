"use client";

import React, { useEffect, useRef, useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import Image from "next/image";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Droppable, Draggable, ButtonBtn, IcfyIcon } from "@/components/shared";
import { IProduct } from "@/types";
import { generateImagePreviews, isObjectURL } from "@/utils";

type TImageUploaderProps = {
  heading?: string;
  buttonText?: string;
  multiple?: boolean;
  className?: string;
  containerClassName?: string;
  buttonClassName?: string;
};

export const ImageUploader = ({
  heading = "Images",
  buttonText = "Browse Files",
  multiple = true,
  className = "",
  containerClassName = "",
  buttonClassName = "",
}: TImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { control, setValue } = useFormContext<IProduct>();
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150, //  hold before drag
        tolerance: 5,
      },
    })
  );
  const [activeId, setActiveId] = useState<number | null>(null);

  const watchedImages = useWatch<IProduct, "images">({
    control,
    name: "images",
  });

  const rawImages = useMemo(() => watchedImages, [watchedImages]);

  const previews = useMemo(
    () => generateImagePreviews(rawImages!),
    [rawImages]
  );

  useEffect(() => {
    return () => {
      previews.forEach((url) => {
        if (isObjectURL(url)) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previews]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setValue("images", multiple ? [...rawImages!, ...files] : files, {
      shouldValidate: true,
    });

    e.target.value = "";
  };

  const handleButtonClick = () => fileInputRef.current?.click();

  const handleRemoveImage = (index: number) => {
    const newImages = [...rawImages!];
    newImages.splice(index, 1);
    setValue("images", newImages, { shouldValidate: true });
  };

  const handleClearAll = () => setValue("images", [], { shouldValidate: true });

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    setActiveId(null); // clear after drop
    if (!active || !over) return;
    const temp = [...rawImages!];
    const [moved] = temp.splice(Number(active.id), 1);
    temp.splice(Number(over.id), 0, moved);
    setValue("images", temp, { shouldValidate: true });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    if (!files.length) return;

    setValue("images", multiple ? [...rawImages!, ...files] : files, {
      shouldValidate: true,
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  return (
    <div
      className={`space-y-4 bg-white p-5 rounded-xl border border-neutral-200 ${className}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg text-gray-800">{heading}</p>
        <ButtonBtn
          type="button"
          onClick={handleButtonClick}
          className={`!primaryClasses !py-1 !px-4 ${buttonClassName}`}
        >
          {buttonText}
        </ButtonBtn>
      </div>

      {/* Images Grid with DragOverlay */}
      <DndContext
        sensors={sensors}
        onDragStart={({ active }) => setActiveId(Number(active.id))}
        onDragEnd={handleDragEnd}
      >
        <div
          className={`min-h-[20rem] bg-white border-2 border-dashed border-gray-300 rounded-xl p-4 grid transition-colors duration-200 ${
            previews.length > 0
              ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
              : "place-content-center"
          } ${containerClassName}`}
        >
          {previews.length < 1 && (
            <div className="flex flex-col items-center text-gray-400">
              <IcfyIcon
                className="text-[3rem] mb-2"
                icon="fluent:image-add-32-filled"
              />
              <p className="text-sm">Drag & drop or click browse</p>
            </div>
          )}

          {previews.map((src, i) => (
            <Droppable key={i} id={i}>
              <div className="relative group overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <IcfyIcon
                    className="w-4 h-4"
                    icon="material-symbols:close-rounded"
                  />
                </button>
                <Draggable id={i}>
                  <Image
                    src={src}
                    alt={`Uploaded ${i}`}
                    width={300}
                    height={300}
                    className="object-contain w-full h-32 sm:h-40"
                  />
                </Draggable>
              </div>
            </Droppable>
          ))}
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeId !== null ? (
            <div className="overflow-hidden">
              <Image
                src={previews[activeId]}
                alt={`Dragged ${activeId}`}
                width={300}
                height={300}
                className="object-contain w-32 h-32 sm:w-40 sm:h-40"
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Clear all button */}
      {previews.length > 0 && (
        <button
          type="button"
          className="text-sm text-red-500 hover:underline ml-auto block"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      )}
    </div>
  );
};

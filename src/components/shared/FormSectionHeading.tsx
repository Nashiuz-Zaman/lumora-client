"use client";

import { ElementType } from "react";

type TFormSectionHeadingProps = {
  text: string;
  tag?: ElementType;
};

export const FormSectionHeading = ({
  text,
  tag: Tag = "h3",
}: TFormSectionHeadingProps) => {
  return (
    <Tag className="font-semibold text-lg mb-2 underline [color:inherit]">
      {text}
    </Tag>
  );
};

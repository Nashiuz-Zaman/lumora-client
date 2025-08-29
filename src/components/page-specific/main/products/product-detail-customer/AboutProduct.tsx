"use client";

import { sanitizeHtml } from "@/utils/safeHtml";

type AboutProductProps = {
  data: string;
};

export const AboutProduct = ({ data }: AboutProductProps) => {
  const sanitizedHtml = sanitizeHtml(data);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      className="
        max-w-full overflow-x-auto
        [&>h1]:mb-4
        [&>h2]:mb-3
        [&>h3]:mb-2
        [&>p]:mb-4 [&>p]:leading-relaxed
        [&>ul]:mb-4 [&>ul]:pl-5 [&>ul>li]:list-disc [&>ul>li]:mb-2
        [&>ol]:mb-4 [&>ol]:pl-5 [&>ol>li]:list-decimal [&>ol>li]:mb-2
        [&>img]:my-4 [&>img]:mx-auto [&>img]:max-w-full [&>img]:h-auto
      "
    />
  );
};


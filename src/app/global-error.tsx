"use client";

import { ButtonBtn } from "@/components/shared";

export default function GlobalError({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="h-screen w-full flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md border border-neutral-100 p-4">
          <h2 className="mb-5 text-3xl font-semibold">Something went wrong!</h2>

          <ButtonBtn onClick={() => reset()} className="primaryClasses !py-2 mx-auto">
            Try Again
          </ButtonBtn>
        </div>
      </body>
    </html>
  );
}

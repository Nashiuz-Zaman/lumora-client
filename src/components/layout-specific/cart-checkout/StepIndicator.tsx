"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const StepIndicator = () => {
  const pathname = usePathname();

  const steps = [
    { number: 1, label: "Cart", path: "/cart", isLink: false },
    { number: 2, label: "Checkout", path: "/checkout", isLink: false },
    { number: 3, label: "Payment", path: "/payment-result", isLink: false },
  ];

  return (
    <div className="flex items-center space-x-4 text-sm">
      {steps.map((step, i) => {
        const isActive = pathname.startsWith(step.path);

        const circle = (
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-colors ${
              isActive
                ? "bg-primary text-neutral-50"
                : "bg-neutral-200 text-neutral-500"
            }`}
          >
            {step.number}
          </div>
        );

        return (
          <div key={step.number} className="flex items-center">
            {step.isLink ? (
              <Link href={step.path} aria-label={`Go to ${step.label}`}>
                {circle}
              </Link>
            ) : (
              circle
            )}
            <span
              className={`ml-2 font-medium ${
                isActive ? "text-primary" : "text-neutral-500"
              }`}
            >
              {step.label}
            </span>

            {/* connector line */}
            {i < steps.length - 1 && (
              <div className="w-8 h-px bg-neutral-300 mx-4"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;

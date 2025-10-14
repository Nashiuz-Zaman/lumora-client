"use client";

import { Icon } from "@iconify/react";

const steps = [
  {
    title: "Request",
    description: "Submit your return request with details and images.",
    icon: "mdi:file-document-edit-outline",
  },
  {
    title: "Investigate",
    description: "Our team reviews the request and investigates the issue.",
    icon: "mdi:magnify",
  },
  {
    title: "Accept",
    description: "If valid, your return request is approved.",
    icon: "mdi:check-decagram",
  },
  {
    title: "Refund",
    description: "You'll receive your refund via the original payment method.",
    icon: "mdi:cash-refund",
  },
];

export const ReturnProcessSteps = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-semibold text-center mb-10">
        How Returns Work
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white rounded-2xl p-6 transition border border-neutral-200"
          >
            <div className="bg-blue-100 text-blue-500 rounded-full p-4 mb-4">
              <Icon icon={step.icon} width="32" height="32" />
            </div>
            <h3 className="text-lg font-medium mb-2">{step.title}</h3>
            <p className="text-sm text-neutral-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

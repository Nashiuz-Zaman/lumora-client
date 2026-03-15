"use client";

import { FormEvent, useState } from "react";
import { InputField } from "@shared/InputField";
import { showToast } from "@/utils/showToast";

const FooterNewsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    showToast({ message: "Subscribed to newsletter" });

    setEmail("");
  };

  return (
    <div className="border-t border-white/5 py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
      {/* Text */}
      <div>
        <h3 className="text-white text-lg font-semibold mb-2">
          Join our newsletter
        </h3>

        <p className="text-sm text-neutral-400">
          Get exclusive deals and product launches.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex w-full max-w-md">
        <InputField
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          className="flex-1"
          inputClassName="bg-primary-dark-3! border border-white/10! rounded-l-lg border-r-0 text-sm"
          placeholderClassName="text-neutral-400"
        />

        <button
          type="submit"
          className="px-6 py-3 bg-primary hover:bg-primary-dark text-white text-sm rounded-r-lg transition-colors"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default FooterNewsletter;

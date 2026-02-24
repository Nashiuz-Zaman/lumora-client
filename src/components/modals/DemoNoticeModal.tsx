"use client";

import { useEffect } from "react";
import { BaseModal } from "./BaseModal";
import { ButtonBtn } from "../shared";
import { useModal } from "@/hooks";

export const DemoNoticeModal = () => {
  const { isModalOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    const hasSeenMessage = localStorage.getItem("demo_notice_shown");
    if (!hasSeenMessage) openModal();
  }, [openModal]);

  const handleClose = () => {
    localStorage.setItem("demo_notice_shown", "true");
    closeModal();
  };

  return (
    <BaseModal
      condition={isModalOpen}
      closeFunction={handleClose}
      allowCloseOnOutsideClick={false}
      noCloseBtn
      className="bg-white rounded-2xl shadow-lg max-w-lg w-[90vw] p-8 text-center flex flex-col gap-6 !z-400"
    >
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Important Notice</h2>
        <p className="text-neutral-600 leading-relaxed mb-3">
          Please note this is a <strong>demo project</strong>. Product data displayed here
          is <strong>entirely fictional</strong> except for the{" "}
          <strong>product names</strong> and <strong>images</strong>. Products
          within the same top or subcategory may share similar variant labels
          and options, only with different placeholder values. Other details
          such as <strong>videos</strong>, <strong>descriptions</strong>, and{" "}
          <strong>specifications</strong> follow the same pattern and do not
          represent real information.
        </p>

        <p>
          <strong className="text-blue-500">Note:</strong> Through the demo admin account, product data can
          be edited to test and explore the functionality of the platform.
        </p>
      </div>

      <div className="pt-4">
        <ButtonBtn
          onClick={handleClose}
          className="blackClasses text-neutral-50 font-medium  mx-auto !rounded-full"
        >
          Ok, I understand
        </ButtonBtn>
      </div>
    </BaseModal>
  );
};

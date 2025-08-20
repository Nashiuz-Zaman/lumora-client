"use client";

// Core / Third-party
import { FormEvent, useState } from "react";
import { createPortal } from "react-dom";

// Components
import {
  ButtonBtn,
  Inputfield,
  TextArea,
  InputCheckbox,
  DatabaseIcon,
} from "../shared";

import { BaseModal } from "./BaseModal";

// Utils / Hooks
import { showToast, catchAsyncGeneral } from "@/utils";
import { useModal } from "@/hooks/useModal";

export const CreateCollectionModal = ({
  portalTarget,
}: {
  portalTarget: HTMLElement | null;
}) => {
  const { openModal, closeModal, isModalOpen } = useModal();
  const [slug, setSlug] = useState("");

  // const [createCollection] = useCreateCollectionMutation();

  const createSlug = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.split(" ").join("-").toLowerCase();
    setSlug(value);
  };

  const handleSubmit = catchAsyncGeneral(
    async (args) => {
      if (!args?.e) return;
      const formData = new FormData(
        (args.e as FormEvent<HTMLFormElement>)?.currentTarget
      );

      // const data = await createCollection(formData).unwrap();
      // if (data.status === "success") {
      //   showToast({ message: "Collection Created", position: "top-center" });
      //   closeModal();
      //   setSlug("");
      // }
    },
    {
      onError: () => showToast({ message: "Network Error", type: "error" }),
    }
  );

  const portalButton = (
    <ButtonBtn
      type="button"
      onClick={openModal}
      className="!secondaryClasses !py-2 !px-4 ml-4"
    >
      <DatabaseIcon className="text-lg" />
      <span>Create Collection</span>
    </ButtonBtn>
  );

  return (
    <>
      {/* Portal button */}
      {portalTarget && createPortal(portalButton, portalTarget)}

      {/* Modal */}
      {isModalOpen && (
        <BaseModal
          condition={isModalOpen}
          closeFunction={closeModal}
          className="bg-white rounded-xl shadow-lg p-8 w-[90%] md:w-[28rem] lg:w-[40rem] text-sm xl:text-base"
        >
          <form onSubmit={(e) => handleSubmit({ e })}>
            <h3 className="font-semibold text-2xl mb-6">Create a Collection</h3>

            <div className="flex items-center gap-4 mb-4">
              <Inputfield
                labelText="Collection Name"
                name="name"
                inputModifyClasses="!rounded-md"
                placeholder=""
                onChange={createSlug}
              />

              <Inputfield
                labelText="Slug"
                name="slug"
                value={slug}
                inputModifyClasses="!rounded-md"
                placeholder="Auto-Generated"
                readOnly
              />
            </div>

            <TextArea
              name="description"
              modifyClasses="mb-5"
              labelText="Description"
              inputModifyClasses="!p-4 !rounded-md"
              placeholder="Collection Description"
            />

            <InputCheckbox
              name="isActive"
              labelText="Collection Is Active"
              invertIconPosition
            />

            <ButtonBtn className="!successClasses ml-auto !px-4 !py-2">
              Create
            </ButtonBtn>
          </form>
        </BaseModal>
      )}
    </>
  );
};

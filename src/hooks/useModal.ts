"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@/libs/redux/store";
import { setBackdropOpen } from "@/libs/redux/features/nav/backdropSlice";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const openModal = (): void => {
    dispatch(setBackdropOpen(true));
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    dispatch(setBackdropOpen(false));
    setIsModalOpen(false);
  };

  //  Stop background scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isModalOpen]);

  return { openModal, closeModal, isModalOpen };
};

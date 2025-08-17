"use client";

import { useState } from "react";
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

  return { openModal, closeModal, isModalOpen };
};



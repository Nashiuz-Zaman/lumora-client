"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { TAppDispatch } from "@/libs/redux/store";
import { setBackdropOpen } from "@/libs/redux/features/backdrop/backdropSlice";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch<TAppDispatch>();

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

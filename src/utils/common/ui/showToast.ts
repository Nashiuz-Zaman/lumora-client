// toastify.ts
import { toast, ToastPosition, TypeOptions } from "react-toastify";

interface IShowToastProps {
  message?: string;
  type?: TypeOptions; // 'success' | 'info' | 'warning' | 'error' | 'default'
  position?: ToastPosition; // 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left'
  autoClose?: number; // in milliseconds
  className?: string;
}

export const showToast = ({
  message,
  type = "success",
  position = "top-center",
  autoClose = 2500,
  className = "",
}: IShowToastProps) => {
  toast(message ?? "No message provided", {
    position,
    autoClose,
    type,
    className,
  });
};

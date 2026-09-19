import React from "react";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  ReduxProvider,
  AuthStateProvider,
  CartStateProvider,
  RefsProvider,
} from "@/providers";
import { Backdrop } from "@shared/Backdrop";
import { DemoNoticeModal } from "@modals/DemoNoticeModal";
import { ProductQuickViewModal } from "@modals/ProductQuickViewModal";
import { ICategoryTreeItem } from "@/types";

interface AppProvidersProps {
  children: React.ReactNode;
  categoryTree: ICategoryTreeItem[];
}

export function AppProviders({ children, categoryTree }: AppProvidersProps) {
  return (
    <ReduxProvider initialCategoryTree={categoryTree}>
      <AuthStateProvider>
        <CartStateProvider>
          <RefsProvider>
            <ToastContainer
              position="top-center"
              autoClose={2000}
              transition={Zoom}
              hideProgressBar
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />

            <Backdrop />
            <DemoNoticeModal />
            <ProductQuickViewModal />

            {children}
          </RefsProvider>
        </CartStateProvider>
      </AuthStateProvider>
    </ReduxProvider>
  );
}

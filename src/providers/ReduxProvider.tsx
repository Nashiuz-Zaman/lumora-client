"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/libs/redux/store";
import { ICategoryTreeItem } from "@/types";

export const ReduxProvider = ({
  children,
  initialCategoryTree,
}: {
  children: React.ReactNode;
  initialCategoryTree: ICategoryTreeItem[];
}) => {
  const storeRef = useRef<AppStore>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore(initialCategoryTree);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

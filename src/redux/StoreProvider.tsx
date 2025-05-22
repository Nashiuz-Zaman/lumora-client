"use client";

import React from "react";
// redux
import { store } from "./store";
import { Provider } from "react-redux";

const StoreProvider = ({ children }: ChildrenProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;

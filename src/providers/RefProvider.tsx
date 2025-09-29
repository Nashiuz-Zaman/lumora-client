"use client";

import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  RefObject,
} from "react";

export type TRefs = Record<string, RefObject<any> | null>;

export interface IRefsContext {
  refs: TRefs;
  setRefs: Dispatch<SetStateAction<TRefs>>;
}

export const RefsContext = createContext<IRefsContext | undefined>(undefined);

export interface IRefsProviderProps {
  children: ReactNode;
  initialValue?: TRefs;
}

const RefsProvider = ({ children, initialValue = {} }: IRefsProviderProps) => {
  const [refs, setRefs] = useState<TRefs>(initialValue);

  const value: IRefsContext = {
    refs,
    setRefs,
  };

  return <RefsContext value={value}>{children}</RefsContext>;
};

export default RefsProvider;

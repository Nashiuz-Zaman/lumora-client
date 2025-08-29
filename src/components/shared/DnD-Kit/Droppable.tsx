"use client";

import { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";

interface IDroppableProps {
  id: string | number;
  children: ReactNode;
}

export const Droppable = ({ children, id }: IDroppableProps) => {
  const { setNodeRef } = useDroppable({ id });

  return <div ref={setNodeRef}>{children}</div>;
};



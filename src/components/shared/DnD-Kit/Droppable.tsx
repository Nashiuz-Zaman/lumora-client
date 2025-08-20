"use client";

import { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableProps {
  id: string | number;
  children: ReactNode;
}

export const Droppable = ({ children, id }: DroppableProps) => {
  const { setNodeRef } = useDroppable({ id });

  return <div ref={setNodeRef}>{children}</div>;
};



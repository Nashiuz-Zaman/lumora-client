"use client";

import { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";

interface DraggableProps {
  id: string | number;
  children: ReactNode;
}

export const Draggable = ({ children, id }: DraggableProps) => {
  const { attributes, transform, setNodeRef, listeners } = useDraggable({
    id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

"use client";

import { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";

interface IDraggableProps {
  id: string | number;
  children: ReactNode;
}

export const Draggable = ({ children, id }: IDraggableProps) => {
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

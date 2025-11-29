"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ButtonBtnTrans } from "./buttons";
import { CloseIcon, SearchIcon } from "./icons";
import { HeaderProductsSearchbar } from "./HeaderProductsSearchbar";
import { AccordionHorizontal } from "./AccordionHorizontal";
import { AccordionVertical } from "./AccordionVertical";

interface IExpandableSearchPortalProps<T> {
  portalTargetId?: string;
  verticalAccordionClasses?: string;
  horizontalAccordionClasses?: string;
  buttonClasses?: string;
  searchbarClasses?: string;
  accordionDuration?: string;
  trigger?: (text: string) => void;
  results?: T[];
  renderResult?: (
    item: T,
    index: number,
    onClick: () => void
  ) => React.ReactNode;
  modalClassName?: string;
}

export const ExpandableSearchPortal = <T,>({
  portalTargetId = "searchbar-portal-root",
  verticalAccordionClasses = "",
  horizontalAccordionClasses = "",
  buttonClasses = "",
  searchbarClasses = "",
  accordionDuration = "250ms",
  results,
  renderResult,
  modalClassName = "",
  trigger,
}: IExpandableSearchPortalProps<T>) => {
  const [showVertical, setShowVertical] = useState(false);
  const [showHorizontal, setShowHorizontal] = useState(false);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el =
      typeof window !== "undefined"
        ? document.getElementById(portalTargetId)
        : null;

    if (el) setPortalContainer(el);
  }, [portalTargetId]);

  const handleOpen = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowVertical(true);

    timeoutRef.current = setTimeout(() => {
      setShowHorizontal(true);
    }, parseInt(accordionDuration));
  };

  const handleClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowHorizontal(false);

    timeoutRef.current = setTimeout(() => {
      setShowVertical(false);
    }, parseInt(accordionDuration));
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const isOpen = showVertical && showHorizontal;

  return (
    <>
      {/* Toggle Button */}
      <ButtonBtnTrans
        onClick={showVertical ? handleClose : handleOpen}
        className={`text-primary ${buttonClasses}`}
        aria-label="Toggle Search"
        title="Toggle Search"
      >
        {isOpen ? (
          <CloseIcon className="[font-size:inherit]" />
        ) : (
          <SearchIcon className="[font-size:inherit]" />
        )}
      </ButtonBtnTrans>

      {/* Searchbar through portal */}
      {portalContainer &&
        createPortal(
          <AccordionVertical
            expanded={showVertical}
            animate
            duration={accordionDuration}
            className={verticalAccordionClasses}
          >
            <AccordionHorizontal
              expanded={showHorizontal}
              animate
              duration={accordionDuration}
              className={horizontalAccordionClasses}
            >
              <HeaderProductsSearchbar<T>
                className={searchbarClasses}
                results={results}
                renderResult={renderResult}
                trigger={trigger}
                showIcon
                modalClassName={modalClassName}
              />
            </AccordionHorizontal>
          </AccordionVertical>,
          portalContainer
        )}
    </>
  );
};

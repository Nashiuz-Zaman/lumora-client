"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Drawer from "@/components/shared/Drawer";
import { CustomerSideNavbar } from "./CustomerSideNavbar";
import { MobileMenuBtn } from "@/components/shared";
import { useClickOutside, useDrawer, useRefState } from "@/hooks";

export const MobileCustomerSideNavbar = () => {
  const { openDrawer, closeDrawer, showDrawer } = useDrawer();
  const { refs } = useRefState();
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    if (refs?.mobileBtnPlaceholder?.current)
      setPortalContainer(refs?.mobileBtnPlaceholder?.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refs?.mobileBtnPlaceholder?.current]);

  useClickOutside(showDrawer, (e: MouseEvent) => {
    // Type-safe event handling
    const target = e.target as HTMLElement;
    if (target.closest(".mobile-nav-link")) {
      closeDrawer();
    }
  });

  return (
    <>
      <Drawer
        animationDuration={300}
        show={showDrawer}
        attachedToViewPort={false}
        className="h-full w-full xs:w-max z-1000 shadow-2xl"
      >
        <CustomerSideNavbar className="w-full" />
      </Drawer>

      {/* Portal-rendered hamburger button */}
      {portalContainer &&
        createPortal(
          <MobileMenuBtn
            isMenuOpen={showDrawer}
            onClick={showDrawer ? closeDrawer : openDrawer}
          />,
          portalContainer
        )}
    </>
  );
};

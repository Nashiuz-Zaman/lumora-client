"use client";

// Core / Third-party
import Link from "next/link";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Components
import { ButtonBtn, InnerContainer, LinkBtn } from "@/components/shared";
import BackIcon from "@/components/shared/icons/BackIcon";
import DatabaseIcon from "@/components/shared/icons/DatabaseIcon";
import ProductIcon from "@/components/shared/icons/ProductIcon";

// Redux slices
import { setBackdropOpen } from "@/lib/redux/features/backdrop/backdropSlice";
import { setShowCreateCollectionModal } from "@/lib/redux/features/modals/modalsSlice";

// Hooks
import { useBackRoute } from "@/hooks/useBackRoute";

const TopPanelProducts = () => {
  const dispatch = useDispatch();
  const path = usePathname();
  const productsRootPageRegex = /^\/admin\/database\/products$/;

  const [isClient, setIsClient] = useState<boolean>(false);
  const { backRouteUrl, setBackRouteManually } = useBackRoute();

  useEffect(() => {
    setIsClient(true);
  }, []); 

  // Opens create collection modal and backdrop
  const openCreateCollectionModal = () => {
    dispatch(setBackdropOpen(true));
    dispatch(setShowCreateCollectionModal(true));
  };

  const goToAddProductUrl = `${path}/all-products/create`;

  if (!isClient) return null;

  return (
    <div className="bg-neutral-50 h-20 border-b border-neutral-200 flex items-center">
      <InnerContainer className="flex items-center h-full">
        {/* Back button */}
        {backRouteUrl && (
          <Link
            href={backRouteUrl}
            className="flex items-center gap-2 text-neutral-500 hover:text-neutral-950 transition-colors"
          >
            <BackIcon />
            <span>Back</span>
          </Link>
        )}

        {/* Create Product button */}
        {productsRootPageRegex.test(path) && (
          <LinkBtn
            onClick={() => setBackRouteManually(`${path}`)}
            href={goToAddProductUrl}
            modifyClasses="!successClasses !rounded-full !py-2 !px-4 ml-auto"
          >
            <ProductIcon className="text-lg" />
            <span>Create Product</span>
          </LinkBtn>
        )}

        {/* Create Collection button */}
        {productsRootPageRegex.test(path) && (
          <ButtonBtn
            onClick={openCreateCollectionModal}
            modifyClasses="!successClasses !rounded-full !py-2 !px-4 ml-4"
          >
            <DatabaseIcon className="text-lg" />
            <span>Create Collection</span>
          </ButtonBtn>
        )}
      </InnerContainer>
    </div>
  );
};

export default TopPanelProducts;

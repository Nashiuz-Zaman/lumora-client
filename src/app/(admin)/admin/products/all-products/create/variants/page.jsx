'use client';

import { calculateDiscountPercentage } from '@/utils/calculateDiscountPercentage';
import { InnerContainer } from '@/components/containers';
import { selectProductVariantData } from '@/lib/redux/features/admin/productManage/productManageSelector';
import { setProductVariantData } from '@/lib/redux/features/admin/productManage/productManageSlice';
import cloneDeep from 'lodash/cloneDeep';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VariantsManager from '@/components/page-specific/admin-dashboard-pages/database/products/shared/VariantsManager';

const VariantsPage = () => {
   const productVariantData = useSelector(selectProductVariantData);
   const dispatch = useDispatch();

   const handleUpdate = useCallback(
      (productVariantsData, productVariantIndex, key, e) => {
         const temp = cloneDeep(productVariantsData);

         temp[productVariantIndex][key] = e.target.value;

         // Recalculate discountPercentage if price or oldPrice changed
         if (key === 'price' || key === 'oldPrice') {
            const variant = temp[productVariantIndex];
            variant.discountPercentage = calculateDiscountPercentage(
               variant.price,
               variant.oldPrice
            );
         }

         dispatch(setProductVariantData(temp));
      },
      [dispatch]
   );

   return (
      <InnerContainer modifyClasses='flex flex-col h-full'>
         <VariantsManager
            productVariantData={productVariantData}
            handleUpdate={handleUpdate}
            descriptionText='Edit your variant specific SKU, Prices & Discounts etc. here'
            variantListBg='bg-neutral-100'
            variantDetailBg='bg-white'
            maxDetailWidth='max-w-[40rem]'
         />
      </InnerContainer>
   );
};

export default VariantsPage;

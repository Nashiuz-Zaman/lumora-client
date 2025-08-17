'use client';

import { InnerContainer } from '@/components/containers';

import {
   setProduct,
   setProductVariantData,
} from '@/lib/redux/features/admin/productManage/productManageSlice';
import cloneDeep from 'lodash/cloneDeep';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'next/navigation';
import { selectProductVariantData } from '@/lib/redux/features/admin/productManage/productManageSelector';
import { useGetOneProductAdminQuery } from '@/lib/redux/apiSlices/admin/products/productsAdminSlice';
import { calculateDiscountPercentage } from '@/utils/calculateDiscountPercentage';
import VariantsManager from '@/components/page-specific/admin-dashboard-pages/database/products/shared/VariantsManager';

const VariantsPage = () => {
   const params = useParams();
   const _id = params['product-id'];
   const { data } = useGetOneProductAdminQuery(_id, {
      skip: !_id,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
   });
   const productVariantData = useSelector(selectProductVariantData);

   const dispatch = useDispatch();

   useEffect(() => {
      if (data?.success) {
         const product = data?.data;
         dispatch(setProduct(product));

         const variants = product?.variants;
         if (Array.isArray(variants)) {
            if (variants.length > 1) {
               if (productVariantData === null) {
                  dispatch(setProductVariantData(variants));
               }
            }
         }
      }
   }, [data, dispatch, productVariantData]);

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

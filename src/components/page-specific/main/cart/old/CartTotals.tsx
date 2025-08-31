'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

import { ButtonBtn, ButtonBtnTrans } from '@/components/buttons';
import { Inputfield } from '@/components/shared';
import TextArea from '@/components/shared/TextArea';
import useAppState from '@/hooks/useAppState';
import useCartState from '@/hooks/useCartState';
import { usePlaceOrderMutation } from '@/lib/redux/apiSlices/orders/orderApiSlice';
import { useApplyCouponMutation } from '@/lib/redux/apiSlices/coupon/couponApiSlice';
import { catchAsyncGeneral } from '@/utils/catchAsyncGeneral';
import { formatPrice } from '@/utils/formatPrice';
import { showToast } from '@/utils/toastify';

const CartTotals = () => {
   const { user } = useAppState();
   const [isClient, setIsClient] = useState(false);
   const { cart, setCart } = useCartState();
   const total = (cart?.cartTotal || 0) - (cart?.discount || 0);

   const [placeOrder, { isLoading: isPlaceOrderLoading }] =
      usePlaceOrderMutation();
   const [applyCoupon, { isLoading: isApplyingCoupon }] =
      useApplyCouponMutation();

   const [couponCode, setCouponCode] = useState('');
   const [couponError, setCouponError] = useState('');

   useEffect(() => setIsClient(true), []);

   const handlePlaceOrder = catchAsyncGeneral(async ({ e }) => {
      e.preventDefault();
      const form = e.target;

      if (cart?.items?.length < 1) {
         showToast({ message: "Order Can't Be Empty", type: 'error' });
         return;
      }

      const order = {
         name: user ? user?.name : 'guest',
         email: user ? user?.email : form?.email?.value,
         deliveryAddress: form?.deliveryAddress?.value,
         items: cart?.items,
         cartTotal: cart?.cartTotal,
         discount: cart?.discount,
         couponCode: cart?.couponCode,
         cartId: cart._id,
         customerNotes: form?.customerNotes?.value,
      };

      const res = await placeOrder({
         order,
         isUser: Boolean(user),
      }).unwrap();

      if (res?.success) {
         showToast({ message: res?.message, position: 'top-center' });
         setCart({ items: [] });
         form.reset();
      }
   });

   const handleApplyCoupon = catchAsyncGeneral(
      async () => {
         setCouponError('');
         const code = couponCode.trim();

         if (!code) {
            setCouponError('Please enter a coupon code.');
            return;
         }

         const res = await applyCoupon({
            code,
            cartTotal: cart?.cartTotal || 0,
         }).unwrap();

         if (res?.success) {
            showToast({
               message: res.message || 'Coupon applied!',
            });

            setCart({
               ...cart,
               discount: res.data,
               couponCode,
            });

            setCouponCode('');
         } else {
            setCouponError(res?.message || 'Invalid or expired coupon.');
         }
      },
      {
         handleError: 'function',
         onError: error => setCouponError(error?.data?.message),
      }
   );

   if (!isClient) return null;

   return (
      <div>
         <form
            onSubmit={e => handlePlaceOrder({ e })}
            className='block w-full border border-neutral-200 px-6 py-8 rounded-lg mb-6 text-sm font-medium'
         >
            <h3 className='xl:text-sm 2xl:text-lg font-semibold mb-4'>
               Cart Total
            </h3>

            <div className='flex items-center justify-between mb-2'>
               <span>Sub-total</span>
               <span>{formatPrice(cart?.cartTotal || 0)}</span>
            </div>

            <div className='flex items-center justify-between mb-2'>
               <span>Shipping</span>
               <span className='capitalize'>To be decided</span>
            </div>

            <div className='flex justify-between mb-2'>
               <span>Discount</span>
               <span>{formatPrice(cart?.discount || 0)}</span>
            </div>

            <div className='flex items-center justify-between mb-4'>
               <span>Tax</span>
               <span className='capitalize'>To be decided</span>
            </div>

            <div className='flex justify-between font-semibold mb-10'>
               <span>Total</span>
               <span>{formatPrice(total)}</span>
            </div>

            {!user && (
               <Inputfield
                  name='email'
                  isRequired={true}
                  labelText='Customer Email'
                  placeholder='Your email'
                  modifyClasses='mb-7'
                  labelContainerModifyClasses='mb-2'
               />
            )}

            <Inputfield
               name='deliveryAddress'
               defaultValue={user?.deliveryAddress}
               labelText='Delivery Address'
               placeholder='Your address'
               modifyClasses='mb-7'
               labelContainerModifyClasses='mb-2'
               isRequired={true}
            />

            <TextArea
               modifyClasses='mb-10'
               labelText='Customer Notes (Optional)'
               name='customerNotes'
               placeholder='Special instructions regarding the order or any of your item'
            />

            <ButtonBtn
               isLoading={isPlaceOrderLoading}
               type='submit'
               modifyClasses='!secondaryLightClasses !rounded-full !w-full'
            >
               Place Order
               <Icon icon='bytesize:arrow-right' />
            </ButtonBtn>
         </form>

         <div className='border border-neutral-200 px-6 py-8 rounded-lg'>
            <div className='flex items-center'>
               <h3 className='text-xs xl:text-sm 2xl:text-lg font-semibold mb-4'>
                  Coupon Code
               </h3>

               <ButtonBtnTrans
                  onClick={() => {
                     setCouponError('');
                     setCouponCode('');
                     setCart(prev => ({
                        ...prev,
                        discount: 0,
                        couponCode: '',
                     }));
                  }}
                  modifyClasses='text-sm ml-auto mb-4 underline'
               >
                  Remove coupon
               </ButtonBtnTrans>
            </div>

            <Inputfield
               error={couponError}
               name='couponCode'
               placeholder='Enter your coupon code'
               value={couponCode}
               onChange={e => setCouponCode(e.target.value)}
               modifyClasses='mb-4'
               labelContainerModifyClasses='mb-2'
            />

            <ButtonBtn
               type='button'
               isLoading={isApplyingCoupon}
               onClick={handleApplyCoupon}
               modifyClasses='!primaryClasses !rounded-full !w-full'
            >
               Apply Coupon
            </ButtonBtn>
         </div>
      </div>
   );
};

export default CartTotals;

'use client'

import useCartState from '@/hooks/useCartState';
import Link from 'next/link';
import React from 'react';
import CartIcon from '../shared/icons/CartIcon';

const CartBtn = ({ href = '/cart', className }) => {
   // const { cart } = useCartState();
   const qty = cart?.totalQuantity;

   return (
      <div className={`relative text-3xl 2xl:text-5xl ${className}`}>
         {qty > 0 && (
            <p className='absolute w-8 grid place-content-center aspect-square -top-3 text-sm -right-3 bg-primary rounded-full text-white'>
               {qty}
            </p>
         )}
         <Link
            href={href}
            className='text-white aspect-square [font-size:inherit]'
         >
            <CartIcon className='[font-size:inherit]' />
         </Link>
      </div>
   );
};

export default CartBtn;

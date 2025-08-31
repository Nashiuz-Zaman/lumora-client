'use client';

import CartRow from './CartRow';
import { Icon } from '@iconify/react';
import { LinkBtn } from '@/components/buttons';
import useCartState from '@/hooks/useCartState';
import TabularData from '@/components/shared/TabularData';
import { useCartActions } from '@/hooks/useCartActions';

const headings = ['Image', 'Product', 'Price', 'Quantity', 'Sub-total'];
const rowClasses =
   'grid-cols-[1fr_3.5fr_0.8fr_0.75fr_1.25fr_0.3fr] items-center !px-4';

const ShoppingCart = () => {
   const { cart, isCartLoading, setIsCartLoading } = useCartState();
   const { addRemoveForeignProductToCart, addRemoveLocalProductToCart } =
      useCartActions();

   const increaseQty = async item => {
      setIsCartLoading(true);
      // --- Local item ---
      if (item.kind === 'local') {
         const data = {
            mainId: item?._id,
            variantId: item.variantId,
         };
         await addRemoveLocalProductToCart({ data });
         // --- Foreign item ---
      } else {
         await addRemoveForeignProductToCart({ data: item });
      }
   };

   const decreaseQty = async item => {
      setIsCartLoading(true);
      // --- Local item ---
      if (item.kind === 'local') {
         const data = {
            mainId: item?._id,
            variantId: item.variantId,
         };
         await addRemoveLocalProductToCart({ data, action: 'remove' });

         // --- Foreign item ---
      } else {
         await addRemoveForeignProductToCart({ data: item, action: 'remove' });
      }
   };

   const renderRow = ({ data }) => {
      return <CartRow data={data} functions={{ increaseQty, decreaseQty }} />;
   };

   return (
      <div className='w-full'>
         <div className='border border-neutral-200 border-b-0 p-6 rounded-t-lg'>
            <h5 className='text-sm xl:text-lg 2xl:text-xl font-semibold text-center 2md:text-left'>
               Shopping Cart
            </h5>
         </div>

         <TabularData
            rowClassesForBoth={rowClasses}
            modifyClasses={{
               dataRow: `!text-sm !font-medium`,
               heading: '!text-sm !text-neutral-500',
               mainTable: '!min-w-[47rem] lg:!min-w-full !min-h-[25rem]',
            }}
            noDataText='No Cart Items'
            renderRow={renderRow}
            headings={headings}
            data={cart?.items}
            dataLoading={isCartLoading}
         />

         {/* bottom buttons */}
         <div className='w-full py-10'>
            <div className='flex items-center gap-4 justify-between mx-6'>
               <LinkBtn
                  modifyClasses='!rounded-full !primaryClasses'
                  href={'/'}
               >
                  Return to shop <Icon icon='icon-park-outline:return' />
               </LinkBtn>
            </div>
         </div>
      </div>
   );
};

export default ShoppingCart;

'use client';
import { ButtonBtnTrans } from '@/components/buttons';
import TrashcanIcon from '@/components/shared/icons/TrashcanIcon';
import { formatPrice } from '@/utils/formatPrice';
import Image from 'next/image';

const CartRow = ({ data, functions }) => {
   if (!data) return null;

   return (
      <>
         {/* image */}
         <td className='w-full h-[4rem] xl:h-[5rem] xl:aspect-square 2xl:h-[6rem]  pr-5'>
            <Image
               src={data.image}
               alt={data.title}
               width={500}
               height={500}
               className='w-full h-full object-contain'
            />
         </td>

         {/* title */}
         <td className='w-full pr-6 [font-size:inherit]' title={data.title}>
            {data.title}
         </td>

         <td className='w-full [font-size:inherit]'>
            {!data.price ? 'Qutation' : <>{formatPrice(data.price, false)}</>}
         </td>

         <td className='h-max w-max flex items-center justify-between gap-2 border rounded px-2 [font-size:inherit]'>
            <button
               onClick={() => {
                  functions.decreaseQty(data);
               }}
               className='[font-size:inherit]'
            >
               -
            </button>
            <span className='[font-size:inherit]'>{data.quantity}</span>
            <button
               onClick={() => {
                  functions.increaseQty(data);
               }}
               className='[font-size:inherit]'
            >
               +
            </button>
         </td>
         <td className='w-full [font-size:inherit]'>
            {!data.price ? (
               'See Qutation'
            ) : (
               <>{formatPrice(data.price * data.quantity)}</>
            )}
         </td>

         <td>
            <ButtonBtnTrans
               onClick={() => {
                  const newData = { ...data, actionQuantity: data.quantity };
                  functions?.decreaseQty(newData);
               }}
               modifyClasses='!text-red-600'
               title={'Remove Product'}
            >
               <TrashcanIcon />
            </ButtonBtnTrans>
         </td>
      </>
   );
};

export default CartRow;

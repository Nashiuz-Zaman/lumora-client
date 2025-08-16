// core
import Image from 'next/image';

const RightsideMainHeading = ({ heading }) => {
   return (
      <div className='grid grid-cols-[max-content_1fr] items-center gap-[0.54rem] mb-[0.82rem] lg:mb-[2.160625rem]'>
         <Image
            src='/icons/yellow-heading-shape.webp'
            alt='decoration'
            width={16.205}
            height={4.321}
            className='block object-cover shrink-0 !w-full !h-full'
         />

         <h2 className='text-sm 2xl:text-[1.215375rem] leading-[111.111%] font-semibold'>
            {heading}
         </h2>
      </div>
   );
};

export default RightsideMainHeading;

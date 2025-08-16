'use client';

// core
import Link from 'next/link';

// component
import AddressHeading from './AddressHeading';

// data
import { address, navOptions } from '@/static-data/footerData';

const NavAddress = () => {
   return (
      <div className='pb-6 lg:pb-0 lg:border-none border-b border-white/10'>
         <div className='grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-8 text-white'>
            {/* Navigation Columns */}
            {navOptions?.map((optionSet, i) => (
               <div key={i}>
                  <h3 className='mb-4 text-xl font-semibold underline underline-offset-2'>
                     {optionSet.heading}
                  </h3>
                  <ul className='text-sm xl:text-base space-y-2'>
                     {optionSet?.options?.map((option, idx) => (
                        <li key={idx} className='flex items-start gap-2'>
                           <Link
                              className='capitalize hover:underline underline-offset-4'
                              href={option.href}
                           >
                              {option.text}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>
            ))}

            {/* Address Column */}
            <div className='xs:col-span-2 lg:col-span-1'>
               <h3 className='mb-6 text-xl font-semibold'>Our Locations</h3>
               <div className='grid xs:grid-cols-2 lg:grid-cols-1 gap-6'>
                  {address.addresses?.map((addr, i) => (
                     <div key={i}>
                        <AddressHeading heading={addr.heading} />

                        <address className='not-italic text-sm leading-relaxed capitalize'>
                           {addr.description}
                        </address>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default NavAddress;

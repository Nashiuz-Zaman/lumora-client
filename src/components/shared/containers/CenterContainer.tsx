'use client';

const CenterContainer = ({
   children,
   paddingSide = 'both',
   modifyClasses = '',
}) => {
   return (
      <div
         className={`max-w-[100rem] w-full mx-auto ${
            paddingSide === 'left'
               ? 'pl-[1rem] md:pl-[1.7rem] 2xl:pl-[3rem]'
               : paddingSide === 'right'
               ? 'pr-[1rem] md:pr-[1.7rem] 2xl:pr-[3rem]'
               : 'px-[1rem] md:px-[1.7rem] 2xl:px-[3rem]'
         }  ${modifyClasses}`}
      >
         {children}
      </div>
   );
};

export default CenterContainer;

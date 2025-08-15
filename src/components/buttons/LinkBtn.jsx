import Link from 'next/link';

const LinkBtn = ({
   children,
   href = '/',
   modifyClasses = '',
   target,
   onClick,
   isExternal = false,
}) => {
   const allClasses =
      'flex items-center gap-2 w-max capitalize transition-all duration-default rounded-md text-center px-6 py-2 lg:py-3 lg:px-10 active:scale-[0.98] font-medium border primary-classes focus:outline-none ' +
      modifyClasses;

   const handleClick = e => {
      e.stopPropagation();
      if (onClick) onClick();
   };

   if (isExternal) {
      return (
         <a
            href={href}
            className={allClasses}
            target={target || '_blank'}
            rel='noreferrer'
            onClick={onClick ? handleClick : undefined}
         >
            {children}
         </a>
      );
   }

   return (
      <Link
         href={href}
         className={allClasses}
         target={target}
         onClick={onClick ? handleClick : undefined}
      >
         {children}
      </Link>
   );
};

export default LinkBtn;

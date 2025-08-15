// lib
import { Icon } from '@iconify/react';

const CloseBtn = ({
   theme = 'light',
   onClick,
   modifyClasses = '',
   title = 'Close',
}) => {
   return (
      <button
         type='button'
         title={title}
         aria-label='Close button'
         className={`ml-auto w-max block text-3xl ${
            theme === 'light' ? 'text-textPrimary' : 'text-white'
         } ${modifyClasses}`}
         onClick={onClick}
      >
         <Icon style={{ fontSize: 'inherit' }} icon='iconamoon:close-duotone' />
      </button>
   );
};

export default CloseBtn;

// libs
import { Icon } from '@iconify/react';

const MobileMenuBtn = ({ onClick, modifyClasses = '' }) => {
   return (
      <button
         aria-label='Open Mobile Navigation'
         className={`block ${modifyClasses}`}
         onClick={onClick}
      >
         <Icon className='text-white text-3xl' icon='mingcute:menu-line' />
      </button>
   );
};

export default MobileMenuBtn;

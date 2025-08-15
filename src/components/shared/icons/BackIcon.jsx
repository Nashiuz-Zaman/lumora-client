'use client';

// lib
import { Icon } from '@iconify/react';

const BackIcon = ({ modifyClasses = '' }) => {
   return (
      <Icon
         icon={'lets-icons:refund-back'}
         className={`[color:inherit] ${modifyClasses}`}
      />
   );
};

export default BackIcon;

import { InnerContainer } from '@/components/containers';
import CreateCollectionModal from '@/components/modals/CreateCollectionModal';
import CollectionCard from '@/components/page-specific/admin-dashboard-pages/database/collections/CollectionCard';
import Collections from '@/components/page-specific/admin-dashboard-pages/database/collections/Collections';

import DashboardPageHeading from '@/components/shared/DashboardPageHeading';
import { ProductSortOptions } from '@/constants/product';
import Link from 'next/link';

export const metadata = {
  title: 'Central Products Management | Admin Panel',
};


const AdminDatabaseCollectionsPage = () => {
   return (
      <InnerContainer>
         <DashboardPageHeading
            className='mb-10 text-primary'
            text={'All Products'}
         />

         <Link
            className='inline-block mb-20'
            href={`/admin/database/products/all-products?page=1&sort=${ProductSortOptions[0]?.value}`}
         >
            <CollectionCard noDeleteBtn={true} title='All Products' />
         </Link>

         <DashboardPageHeading
            className='mb-5 text-primary'
            text={'Product Collections'}
         />

         {/* create collection modal */}
         <CreateCollectionModal />

         <Collections />
      </InnerContainer>
   );
};

export default AdminDatabaseCollectionsPage;

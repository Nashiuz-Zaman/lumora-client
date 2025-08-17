import { InnerContainer } from '@/components/containers';
import AllProducts from '@/components/page-specific/admin-dashboard-pages/database/products/all-products/AllProducts';

export const metadata = {
  title: 'All Products | Admin Panel',
};

const AdminDatabaseAllProductsPage = () => {
   return (
      <InnerContainer modifyClasses='grow flex flex-col'>
         <h2 className='font-semibold text-3xl mb-5'>All Products</h2>
         <AllProducts />
      </InnerContainer>
   );
};

export default AdminDatabaseAllProductsPage;

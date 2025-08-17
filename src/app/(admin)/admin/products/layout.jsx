import TopPanelProducts from '@/components/layout-specific/admin/database/products/TopPanelProducts';

// components
const AdminDatabaseProductsLayout = ({ children }) => {
   return (
      <div className='h-[calc(100vh-5rem)] xl:h-[calc(100vh-7rem)] grid :grid-rows-[5rem_calc(100vh-5rem-5rem)] xl:grid-rows-[5rem_calc(100vh-7rem-5rem)]'>
         <TopPanelProducts />

         {/* rest of the page */}
         <div className='overflow-y-auto py-20 flex flex-col'>{children}</div>
      </div>
   );
};

export default AdminDatabaseProductsLayout;

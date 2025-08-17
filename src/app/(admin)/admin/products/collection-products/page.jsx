import { InnerContainer } from '@/components/containers';
import ProductsInCollection from '@/components/page-specific/admin-dashboard-pages/database/products/collection-products/ProductsInCollection';
import { redirect } from 'next/navigation';

/**
 * Converts a slug like "top-deals" or "new_arrivals" to "Top Deals Products"
 * @param {string} slug
 * @returns {string}
 */
function formatCollectionName(slug) {
   return (
      slug.replace(/[-_]/g, ' ').replace(/\b\w/g, char => char.toUpperCase()) +
      ' Products'
   );
}

export async function generateMetadata({ searchParams }) {
   const collectionSlug = await searchParams?.collections || 'products';
   const formatted = collectionSlug
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());

   return {
      title: `${formatted} Products | Admin Panel`,
   };
}

export default async function AdminDatabaseCollectionSpecificProductsPage({
   searchParams,
}) {
   const collectionSlug = (await searchParams)?.collections;

   if (!collectionSlug) {
      redirect('/admin/database/products');
   }

   const title = formatCollectionName(collectionSlug);

   return (
      <InnerContainer modifyClasses='grow flex flex-col'>
         <h2 className='font-semibold text-3xl mb-5'>{title}</h2>
         <ProductsInCollection />
      </InnerContainer>
   );
}

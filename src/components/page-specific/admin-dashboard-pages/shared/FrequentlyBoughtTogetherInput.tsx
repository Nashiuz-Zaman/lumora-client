import { ButtonBtnTrans } from '@/components/buttons';
import FrequentlBoughtTogetherProductsSelectionModal from '@/components/modals/FrequentlBoughtTogetherProductsSelectionModal';
import PlusIcon from '@/components/shared/icons/PlusIcon';
import NoData from '@/components/shared/NoData';
import useModal from '@/hooks/useModal';
import useSelectable from '@/hooks/useSelectable';
import ProductCardForAdmin from '../collection-products/ProductCardForAdmin';

const FrequentlyBoughtTogetherInput = ({
   add,
   // remove,
   boughtTogetherProducts,
   className,
   heading = 'Frequently bought Together',
   headingTag: HeadingTag = 'h3',
}) => {
   const { isModalOpen, closeModal } = useModal();
   const {
      // selected,
      toggleSelectOne,
      checkIfSelected,
      toggleSelectAll,
      isAllSelected,
   } = useSelectable(boughtTogetherProducts, '_id');

   return (
      <div className={className}>
         <div className='flex items-center justify-between'>
            <HeadingTag className='font-semibold mb-1 text-xl capitalize'>
               {heading}
            </HeadingTag>
            <ButtonBtnTrans
               modifyClasses='!text-primary'
               type='button'
               onClick={null}
            >
               <PlusIcon /> Add Products
            </ButtonBtnTrans>
         </div>

         <p className='text-sm text-neutral-400'>
            Add products that are often bought with this product
         </p>

         {boughtTogetherProducts?.length < 1 && (
            <div className='min-h-[10rem] relative'>
               <NoData centered={true} text='No Products' />
            </div>
         )}

         {boughtTogetherProducts?.length > 0 && (
            <div>
               <ButtonBtnTrans
                  modifyClasses='underline ml-auto font-medium'
                  onClick={toggleSelectAll}
               >
                  {isAllSelected ? 'Deselect All' : 'Select All'}
               </ButtonBtnTrans>
            </div>
         )}

         {boughtTogetherProducts?.length > 0 && (
            <div className='grid grid-cols-3 gap-4'>
               {boughtTogetherProducts?.map(product => (
                  <ProductCardForAdmin
                     key={product._id}
                     isSelected={checkIfSelected(product, '_id')}
                     toggleSelectOne={toggleSelectOne}
                     product={product}
                  />
               ))}
            </div>
         )}

         <FrequentlBoughtTogetherProductsSelectionModal
            add={add}
            closeFunction={closeModal}
            isOpen={isModalOpen}
            refetchCurProductData
         />
      </div>
   );
};

export default FrequentlyBoughtTogetherInput;

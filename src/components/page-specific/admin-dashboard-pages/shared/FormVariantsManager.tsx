'use client';

import FormSectionHeading from '@/components/shared/FormSectionHeading';
import VariantCreator from '@/components/page-specific/admin-dashboard-pages/database/products/shared/VariantCreator';
import VariantInformationBlock from './VariantInformationBlock';
import { LinkBtn } from '@/components/buttons';
import EditIcon from '@/components/shared/icons/EditIcon';

export default function FormVariantsManager({
   isMultipleVariantMode,
   variantStructureForUI,
   singleVariantData,
   path,
   handleSingleVariantDataUpdate,
   addNewVariantSet,
   addNewVariantValue,
   deleteVariantSet,
   deleteVariantValue,
   handleKeyChange,
   handleValueChange,
}) {
   return (
      <>
         {/* Variant Creator */}
         <VariantCreator
            variantStructureForUI={variantStructureForUI}
            className='mb-4'
            onAddNewVariantSet={addNewVariantSet}
            onAddNewVariantValue={addNewVariantValue}
            onDeleteVariantSet={deleteVariantSet}
            onDeleteVariantValue={deleteVariantValue}
            onKeyChange={handleKeyChange}
            onValueChange={handleValueChange}
         />

         {/* Single / Multiple Variant Handling */}
         <div className='mb-4'>
            {!isMultipleVariantMode && (
               <>
                  <FormSectionHeading
                     tag='h4'
                     text='Single Variant SKU, Pricing & Stock'
                  />
                  <VariantInformationBlock
                     data={singleVariantData}
                     handleInputChange={(e, key) =>
                        handleSingleVariantDataUpdate(e, key)
                     }
                  />
               </>
            )}

            {isMultipleVariantMode && (
               <LinkBtn
                  href={`${path}/variants`}
                  modifyClasses='!primaryClasses'
               >
                  Edit Variant Details
                  <EditIcon modifyClasses='text-2xl' />
               </LinkBtn>
            )}
         </div>
      </>
   );
}

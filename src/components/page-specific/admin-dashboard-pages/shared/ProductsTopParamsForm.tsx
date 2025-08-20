import ParamsFilterForm from '@/components/shared/ParamsFilterForm';

const TopProductParamsForm = ({
   params,
   setParams,
   onSubmit,
   sortOptions,
   showStatusFilter = false,
}) => {
   const statusOptions = [
      { label: 'All', value: 'all' },
      { label: 'Active', value: 1 },
      { label: 'Draft', value: 0 },
   ];

   return (
      <ParamsFilterForm
         params={params}
         setParams={setParams}
         onSubmit={onSubmit}
         sortOptions={sortOptions}
         placeholder='Search Products'
         showStatusFilter={showStatusFilter}
         statusOptions={showStatusFilter ? statusOptions : undefined}
         roleLabel='Product'
      />
   );
};

export default TopProductParamsForm;

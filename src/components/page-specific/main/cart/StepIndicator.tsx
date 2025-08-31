const StepIndicator = () => {
  return (
    <div className="flex items-center space-x-4 text-sm">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
          1
        </div>
        <span className="ml-2 font-medium text-primary">Cart</span>
      </div>
      <div className="w-8 h-px bg-neutral-300"></div>
      <div className="flex items-center">
        <div className="w-8 h-8 bg-neutral-200 text-neutral-500 rounded-full flex items-center justify-center">
          2
        </div>
        <span className="ml-2 text-neutral-500">Checkout</span>
      </div>
      <div className="w-8 h-px bg-neutral-300"></div>
      <div className="flex items-center">
        <div className="w-8 h-8 bg-neutral-200 text-neutral-500 rounded-full flex items-center justify-center">
          3
        </div>
        <span className="ml-2 text-neutral-500">Complete</span>
      </div>
    </div>
  );
};

export default StepIndicator;

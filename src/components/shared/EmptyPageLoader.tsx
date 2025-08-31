import { InnerContainer } from "./containers/InnerContainer";
import { DataLoadingSpinner } from "./DataLoadingSpinner";

const EmptyPageLoader = ({ className }: { className?: string }) => {
  return (
    <InnerContainer>
      <div className={`h-[75vh] w-full relative ${className}`}>
        <DataLoadingSpinner />
      </div>
    </InnerContainer>
  );
};

export default EmptyPageLoader;

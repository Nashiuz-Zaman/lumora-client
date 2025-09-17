import { InnerContainer } from "./containers/InnerContainer";
import { LoadingSpinner } from "./LoadingSpinner";

const EmptyPageLoader = ({ className }: { className?: string }) => {
  return (
    <InnerContainer>
      <div className={`h-[75vh] w-full relative ${className}`}>
        <LoadingSpinner />
      </div>
    </InnerContainer>
  );
};

export default EmptyPageLoader;

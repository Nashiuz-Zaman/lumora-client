// core

import { LocationIcon } from "@icons/LocationIcon";

const AddressHeading = ({ heading }: { heading: string }) => {
  return (
    <div className="flex items-center gap-2 mb-2">
      <LocationIcon className="text-neutral-50 text-lg" />
      <h2 className="text-xs lg:text-base leading-relaxed font-medium capitalize">
        {heading}
      </h2>
    </div>
  );
};

export default AddressHeading;

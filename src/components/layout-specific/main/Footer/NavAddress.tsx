"use client";

// component
import AddressHeading from "./AddressHeading";

// data
import { address } from "@/static-data/footerData";

const NavAddress = () => {
  return (
    <div className="flex items-start gap-12">
      {address.addresses?.map((addr, i) => (
        <div key={i}>
          <AddressHeading heading={addr.heading} />

          <address className="not-italic text-sm leading-relaxed capitalize">
            {addr.description}
          </address>
        </div>
      ))}
    </div>
  );
};

export default NavAddress;

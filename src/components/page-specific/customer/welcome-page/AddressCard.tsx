import { LinkBtn } from "@/components/shared";
import { ICustomerAddress } from "@/types";
import { isEmpty } from "lodash";

interface IAddressCardProps {
  label: string;
  address?: ICustomerAddress;
  btnText?: string;
  href?: string;
}

export const AddressCard = ({
  label,
  address,
  btnText = "Edit Address",
  href = "/customer/settings",
}: IAddressCardProps) => {
  const hasAddress = isEmpty(address) === false;

  return (
    <article className="relative h-full rounded-2xl border border-neutral-100 bg-white p-6 shadow-md">
      <div className="flex h-full flex-col justify-between">
        <div>
          <h4 className="mb-2 text-lg font-medium text-primary-dark-2">
            {label}
          </h4>

          {hasAddress ? (
            <address className="space-y-1 not-italic text-sm text-neutral-600 sm:text-base">
              <div className="font-medium">{address!.address}</div>
              <div className="text-sm text-neutral-500">
                {[address!.city, address!.state, address!.zipCode]
                  .filter(Boolean)
                  .join(", ")}
              </div>
              {address!.country && (
                <div className="text-sm text-neutral-500">
                  {address!.country}
                </div>
              )}
            </address>
          ) : (
            <p className="text-neutral-500">No address provided.</p>
          )}
        </div>

        <LinkBtn href={href} className="mt-5 !rounded-lg !primaryClasses !py-2">
          {btnText}
        </LinkBtn>
      </div>
    </article>
  );
};

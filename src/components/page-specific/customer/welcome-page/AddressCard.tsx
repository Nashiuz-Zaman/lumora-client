import { LinkBtn } from "@/components/shared";

interface IAddress {
  address?: string;
  country?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

interface IAddressCardProps {
  label: string;
  address?: IAddress;
  btnText?: string;
}

export const AddressCard = ({
  label,
  address,
  btnText = "Edit Address",
}: IAddressCardProps) => {
  const hasAddress = Boolean(address?.address);

  return (
    <article className="relative h-full rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
      <div className="flex h-full flex-col justify-between">
        <div>
          <h4 className="mb-2 text-lg font-medium text-primary-dark-2">{label}</h4>

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

        <LinkBtn
          href="/customer/settings"
          className="mt-5 !rounded-lg !primaryClasses !py-2"
        >
          {btnText}
        </LinkBtn>
      </div>
    </article>
  );
};

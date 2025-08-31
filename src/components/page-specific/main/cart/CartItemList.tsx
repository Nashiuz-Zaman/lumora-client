import { TPopulatedCartItem } from "@/types/cart";
import { CartItemCard, TUpdateQuantity } from "./CartItemCard";
import { CartIcon, LinkBtn, LinkBtnTrans, NoData } from "@/components/shared/";

export interface ICartItemListProps {
  items: TPopulatedCartItem[];
  updateQuantity: TUpdateQuantity;
  removeItem: (item: TPopulatedCartItem) => void;
}

export const CartItemList = ({
  items,
  updateQuantity,
  removeItem,
}: ICartItemListProps) => {
  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="grow flex flex-col">
        {!items?.length && (
          <div className="grow flex items-center justify-center">
            <div>
              <NoData text="Cart is empty" className="!py-0 !my-0 !mb-4" />
              <LinkBtn className="!primaryClasses">
                <CartIcon className="text-xl" />
                Back to Shopping
              </LinkBtn>
            </div>
          </div>
        )}

        {items?.length > 0 && (
          <div className="space-y-3">
            {items?.map((item, i) => (
              <CartItemCard
                key={`${item.product._id}-${item.variant._id}-${i}`}
                item={item}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
          </div>
        )}

        {items?.length > 0 && (
          <div className="mt-auto pt-6">
            <LinkBtnTrans className="text-primary">
              <CartIcon className="text-2xl" />
              Back to Shopping
            </LinkBtnTrans>
          </div>
        )}
      </div>
    </div>
  );
};

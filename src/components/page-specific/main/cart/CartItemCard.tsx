import { TPopulatedCartItem } from "@/types/cart";
import { formatPrice } from "@/utils";

interface ICartItemCardProps {
  item: TPopulatedCartItem;
  updateQuantity: (
    productId: string,
    variantId: string,
    change: number
  ) => void;
  removeItem: (item: TPopulatedCartItem) => void;
}

export const CartItemCard = ({
  item,
  updateQuantity,
  removeItem,
}: ICartItemCardProps) => {
  const productId = item.product._id!;
  const variantId = item.variant._id!;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
        {/* Thumbnail / Emoji placeholder */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl">
              {item.product.defaultImage || "🛍️"}
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-neutral-900 mb-2">
            {item.product.title || "Unnamed Product"}
          </h3>

          {/* Variant Details */}
          <div className="grid grid-cols-2 gap-2 text-sm text-neutral-600 mb-3">
            {item.variant &&
              Object.entries(item.variant).map(([key, value]) => (
                <div key={key}>
                  <span className="font-medium">{key}:</span> {String(value)}
                </div>
              ))}
          </div>

          {/* Quantity + Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                onClick={() => updateQuantity(productId, variantId, -1)}
              >
                −
              </button>
              <span className="w-12 text-center font-semibold text-lg">
                {item.quantity}
              </span>
              <button
                className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                onClick={() => updateQuantity(productId, variantId, 1)}
              >
                +
              </button>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-neutral-900">
                {formatPrice(item.variant.price ?? 0 * item.quantity)}
              </div>
              <div className="text-sm text-neutral-500">
                {formatPrice(item.variant.price ?? 0)} each
              </div>
            </div>
          </div>
        </div>

        {/* Remove */}
        <div className="flex-shrink-0">
          <button
            className="w-10 h-10 rounded-full bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors"
            onClick={() => removeItem(item)}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

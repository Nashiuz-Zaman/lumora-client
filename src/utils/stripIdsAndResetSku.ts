import { IProduct } from "@/types";
import cloneDeep from "lodash/cloneDeep";

export const stripIdsAndResetSku = (product: IProduct): IProduct => {
  // Deep copy
  const clone: IProduct = cloneDeep(product);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stripIds = (obj: any) => {
    if (!obj || typeof obj !== "object") return;

    if (Array.isArray(obj)) {
      obj.forEach(stripIds);
    } else {
      delete obj._id;
      delete obj.id;

      // Reset SKU if this is a variant object
      if ("sku" in obj) {
        obj.sku = "";
      }

      // if ("stock" in obj) {
      //   obj.stock = 0;
      // }

      // if ("price" in obj) {
      //   obj.price = 0;
      // }
      if ("slug" in obj) {
        obj.slug = "";
      }

      // if ("oldPrice" in obj) {
      //   obj.oldPrice = 0;
      // }

      if ("seoTitle" in obj) {
        obj.seoTitle = "";
      }
      if ("canonicalUrl" in obj) {
        obj.canonicalUrl = "";
      }

      // if ("brand" in obj) {
      //   obj.brand = "";
      // }
      if ("createdAt" in obj) {
        obj.createdAt = undefined;
      }
      if ("updatedAt" in obj) {
        obj.updatedAt = undefined;
      }

      Object.values(obj).forEach((v) => {
        if (typeof v === "object") stripIds(v);
      });
    }
  };

  stripIds(clone);

  return clone;
};

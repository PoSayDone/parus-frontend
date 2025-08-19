import { getPercentageDiff } from "./get-percentage-diff";
import { convertToLocale } from "./money";
import { StoreProduct } from "@/types/store";

export function getProductPrice({
  product,
}: {
  product: StoreProduct;
}) {
  if (!product || !product.id) {
    throw new Error("No product provided");
  }

  // Use the product's direct price
  const price = {
    calculated_price_number: product.price,
    calculated_price: convertToLocale({
      amount: product.price,
      currency_code: "USD", // Default currency
    }),
    original_price_number: product.price,
    original_price: convertToLocale({
      amount: product.price,
      currency_code: "USD", // Default currency
    }),
    currency_code: "USD",
    price_type: "default",
    percentage_diff: "0",
  };

  return {
    product,
    cheapestPrice: price,
    variantPrice: price,
  };
}
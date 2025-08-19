import { cn } from "@/lib/utils";
import { getProductPrice } from "@/lib/util/get-product-price";
import { StoreProduct } from "@/types/store";

export default function ProductPrice({
  product,
}: {
  product: StoreProduct;
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  });

  // If we don't have a price from getProductPrice, use the product's direct price
  const selectedPrice = cheapestPrice || {
    calculated_price_number: product.price,
    calculated_price: `$${product.price.toFixed(2)}`,
    original_price_number: product.price,
    original_price: `$${product.price.toFixed(2)}`,
    currency_code: "USD",
    price_type: "default",
    percentage_diff: "0",
  };

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse" />;
  }

  return (
    <div className="flex flex-col text-ui-fg-base">
      <span
        className={cn("text-xl-semi", {
          "text-ui-fg-interactive":
            selectedPrice.price_type === "sale",
        })}
      >
        <span
          data-testid="product-price"
          data-value={selectedPrice.calculated_price_number}
        >
          {selectedPrice.calculated_price}
        </span>
      </span>
      {selectedPrice.price_type === "sale" && (
        <>
          <p>
            <span className="text-ui-fg-subtle">Original: </span>
            <span
              className="line-through"
              data-testid="original-product-price"
              data-value={selectedPrice.original_price_number}
            >
              {selectedPrice.original_price}
            </span>
          </p>
          <span className="text-ui-fg-interactive">
            -{selectedPrice.percentage_diff}%
          </span>
        </>
      )}
    </div>
  );
}
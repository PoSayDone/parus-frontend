import Link from "next/link";
import Thumbnail from "./thumbnail";
import { getProductPrice } from "@/lib/util/get-product-price";
import { PreviewPrice } from "./price";
import { StoreProduct } from "@/types/store";

export function ProductCard({
  product,
  isFeatured,
}: {
  product: StoreProduct;
  isFeatured?: boolean;
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  });

  return (
    <Link href={`/products/${product.handle}`} className="group">
      <div data-testid="product-wrapper">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
        />
        <div className="flex flex-col text-base mt-2 justify-between">
          <div className="flex items-center gap-x-2">
            {cheapestPrice && (
              <PreviewPrice price={cheapestPrice} />
            )}
          </div>
          <div data-testid="product-title">{product.title}</div>
        </div>
      </div>
    </Link>
  );
}
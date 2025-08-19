import { listProducts } from "@/lib/data/products";
import { StoreProduct } from "@/types/store";
import { ProductCard } from "../card";

type RelatedProductsProps = {
  product: StoreProduct;
};

export default async function RelatedProducts({
  product,
}: RelatedProductsProps) {
  // For now, we'll show some random products as related products
  // In a real implementation, you might want to filter by category or tags
  const { response } = await listProducts({
    queryParams: {
      limit: 5,
    },
  });
  
  const products = response.products.filter(
    (responseProduct) => responseProduct.id !== product.id,
  );

  if (!products.length) {
    return null;
  }

  return (
    <div className="product-page-constraint">
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-base text-muted-foreground mb-6">
          Похожие товары
        </span>
        <p className="text-2xl text-ui-fg-base max-w-lg font-medium">
          Возможно, вам также понравятся эти&nbsp;товары
        </p>
      </div>

      <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-6 gap-y-8">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
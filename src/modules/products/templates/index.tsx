import type React from "react";
import { Suspense } from "react";

import ImageGallery from "@modules/products/components/image-gallery";
import ProductActions from "@modules/products/components/product-actions";
import ProductTabs from "@modules/products/components/product-tabs";
import RelatedProducts from "@modules/products/components/related-products";
import ProductInfo from "@modules/products/templates/product-info";
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products";
import { notFound } from "next/navigation";
import type { StoreProduct } from "@/types/store";
import MobileActions from "../components/product-actions/mobile-actions";
import Breadcrumbs, {
	type BreadcrumbItem,
} from "@/components/ui/breadcrumbs";

type ProductTemplateProps = {
	product: StoreProduct;
};

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product }) => {
	if (!product || !product.id) {
		return notFound();
	}
	const category = product.categories?.find(
	(item) => item.handle && item.name
);

const breadcrumbItems: BreadcrumbItem[] = [
	{ label: "Каталог", href: "/store" },
	...(category
		? [{
				label: category.name,
				href: `/categories/${category.handle}`,
			}]
		: []),
	{
		label: product.title,
		href: `/products/${product.handle}`,
	},
];
	return (
		<>
			<Breadcrumbs items={breadcrumbItems} />
			<div
				className="flex flex-col sm:flex-row sm:items-start relative w-full sm:gap-x-12"
				data-testid="product-container"
			>
				<div className="block w-full max-w-[600px] relative">
					<ImageGallery images={product?.images || []} />
				</div>
				<div className="flex flex-col sm:sticky sm:top-22 sm:py-0 sm:max-w-[500px] w-full py-8 gap-y-8">
					<ProductInfo product={product} />
					<ProductTabs product={product} />
				</div>
				<div className="hidden lg:flex flex-col sm:sticky sm:top-22 sm:py-0 sm:max-w-[400px] w-full py-8 gap-y-12">
					<ProductActions product={product} />
				</div>
				<MobileActions product={product} />
			</div>
			<div
				className="mt-16 lg:mt-24 w-full pb-28 lg:pb-0"
				data-testid="related-products-container"
			>
				<Suspense fallback={<SkeletonRelatedProducts />}>
					<RelatedProducts product={product} />
				</Suspense>
			</div>
		</>
	);
};

export default ProductTemplate;

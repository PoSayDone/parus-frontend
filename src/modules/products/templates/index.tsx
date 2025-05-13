import React, { Suspense } from "react";

import ImageGallery from "@modules/products/components/image-gallery";
import ProductActions from "@modules/products/components/product-actions";
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta";
import ProductTabs from "@modules/products/components/product-tabs";
import RelatedProducts from "@modules/products/components/related-products";
import ProductInfo from "@modules/products/templates/product-info";
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products";
import ProductActionsWrapper from "./product-actions-wrapper";
import { notFound } from "next/navigation";
import { HttpTypes } from "@medusajs/types";

type ProductTemplateProps = {
	product: HttpTypes.StoreProduct;
};

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product }) => {
	if (!product || !product.id) {
		return notFound();
	}

	return (
		<>
			<div
				className="content-container flex flex-col sm:flex-row sm:items-start py-6 relative max-w-[1400px] w-full mx-auto sm:gap-x-12"
				data-testid="product-container"
			>
				<div className="block w-full max-w-[600px] relative">
					<ImageGallery images={product?.images || []} />
				</div>
				<div className="flex flex-col sm:sticky sm:top-12 sm:py-0 sm:max-w-[500px] w-full py-8 gap-y-6">
					<ProductInfo product={product} />
					<ProductTabs product={product} />
				</div>
				<div className="flex flex-col sm:sticky sm:top-12 sm:py-0 sm:max-w-[400px] w-full py-8 gap-y-12">
					<ProductOnboardingCta />
					<Suspense
						fallback={
							<ProductActions disabled={true} product={product} />
						}
					>
						<ProductActionsWrapper id={product.id} />
					</Suspense>
				</div>
			</div>
			<div
				className="content-container my-16 sm:my-32 max-w-[1400px] w-full mx-auto"
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

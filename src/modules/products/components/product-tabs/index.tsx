"use client";

import type { StoreProduct } from "@/types/store";

type ProductTabsProps = {
	product: StoreProduct;
};

const ProductTabs = ({ product }: ProductTabsProps) => {
	const tabs = [
		{
			label: "Информация о товаре",
			component: <ProductInfoTab product={product} />,
		},
		{
			label: "Информация о Доставке",
			component: <ShippingInfoTab />,
		},
	];

	return (
		<div className="w-full">
			{tabs.map((tab, i) => (
				<div key={i}>
					<h2 className="text-lg font-medium mb-2 mt-6 first:mt-0">{tab.label}</h2>
					{tab.component}
				</div>
			))}
		</div>
	);
};

const ProductInfoTab = ({ product }: ProductTabsProps) => {
	return (
		<div className="mb-4">
			<div className="flex flex-col">
				{product.characteristics?.map((characteristic) => (
					<div
						className="grid grid-cols-2 gap-4 not-last:border-b py-3"
						key={characteristic.id}
					>
						<div className="text-muted-foreground">
							{characteristic.key}
						</div>
						<div>
							{characteristic.value}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const ShippingInfoTab = () => {
	return (
		<div className="flex flex-col gap-6">
			<div>
				<p className="text-muted-foreground max-w-sm">
					Мы имеем возможность доставки товара, условия доставки
					обсуждаются с менеджером.
				</p>
			</div>
		</div>
	);
};

export default ProductTabs;

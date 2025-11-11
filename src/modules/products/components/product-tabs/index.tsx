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
					<h3 className="mb-4">{tab.label}</h3>
					{tab.component}
				</div>
			))}
		</div>
	);
};

const ProductInfoTab = ({ product }: ProductTabsProps) => {
	return (
		<div className="text-small-regular mb-4">
			<div className="flex flex-col">
				{product.characteristics.map((characteristic, _index) => (
					<div
						className="grid grid-cols-2 not-last:border-b py-4"
						key={characteristic.id}
					>
						<div className="font-medium text-muted-foreground">
							{characteristic.key}
						</div>
						<div className="font-medium">
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
				<div className="font-medium mb-1">Быстрая доставка</div>
				<p className="max-w-sm">
					Мы имеем возможность доставки товара, условия доставки
					обсуждаются с менеджером.
				</p>
			</div>
		</div>
	);
};

export default ProductTabs;

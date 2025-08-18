"use client";

import PricingCard from "@/modules/common/components/pricing-card";
import { pricingPlans } from "@/lib/data/pricing";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function PricesList() {
	const [priceType, setPriceType] = useState<"parts" | "full">("parts");
	return (
		<div className="space-y-8">
			<div className="p-1 bg-muted w-fit mx-auto rounded-full gap-1">
				<Button
					variant={priceType === "parts" ? "default" : "ghost"}
					onClick={() => setPriceType("parts")}
				>
					По частям
				</Button>
				<Button
					variant={priceType === "full" ? "default" : "ghost"}
					onClick={() => setPriceType("full")}
				>
					Одним платежом
				</Button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{pricingPlans.map((plan) => (
					<PricingCard
						key={plan.id}
						plan={plan}
						priceType={priceType}
						className="mx-auto w-full"
					/>
				))}
			</div>
		</div>
	);
}

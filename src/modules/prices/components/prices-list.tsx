import { listPricePlans } from "@/lib/data/pricing";
import PricesListClient from "./prices-list-client";
import ListPlaceholder from "@/modules/landing/components/list-placeholder";

export default async function PricesListServer() {
	const {
		response: { data: pricingPlans },
	} = await listPricePlans({ page: 1, queryParams: { limit: 4 } });


	if (pricingPlans.length === 0) {
		return (
			<ListPlaceholder text="На данный момент ритуальные товары не доступны" />
		);
	}

	return <PricesListClient pricingPlans={pricingPlans} />;
}

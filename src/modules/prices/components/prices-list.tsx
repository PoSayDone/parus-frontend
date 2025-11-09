import { listPricePlans } from "@/lib/data/pricing-db";
import PricesListClient from "./prices-list-client";

export default async function PricesListServer() {
	const {
		response: { data: pricingPlans },
	} = await listPricePlans({ page: 1, queryParams: { limit: 4 } });

	return <PricesListClient pricingPlans={pricingPlans} />;
}

"use client";

import { useParams } from "next/navigation";
import PricePlanForm from "@/modules/admin/templates/price-plan-form";

export default function EditPricePlanPage() {
	const params = useParams();
	const pricePlanId = params.id as string;

	return <PricePlanForm pricePlanId={pricePlanId} />;
}

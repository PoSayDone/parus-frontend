"use client";

import { useParams } from "next/navigation";
import ServiceForm from "@/modules/admin/templates/service-form";

export default function EditServicePage() {
	const params = useParams();
	const serviceId = params.id as string;

	return <ServiceForm serviceId={serviceId} />;
}

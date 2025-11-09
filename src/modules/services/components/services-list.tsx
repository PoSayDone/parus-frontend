import { listServices } from "@/lib/data/services-db";
import { cn } from "@/lib/utils";
import { ServiceCard } from "./service-card";

export default async function ServicesList({
	className,
}: {
	className?: string;
}) {
	const {
		response: { data: services },
	} = await listServices({
		page: 1,
		queryParams: {
			limit: 30,
		},
	});
	return (
		<div className={cn("flex gap-3", className)}>
			{services.map((service) => (
				<ServiceCard key={service.id} service={service} />
			))}
		</div>
	);
}

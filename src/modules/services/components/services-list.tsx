import { cn } from "@/lib/utils";
import { servicesData } from "@/lib/data/services";
import { ServiceCard } from "./service-card";

export default function ServicesList({ className }: { className?: string }) {
	const services = Object.values(servicesData);
	return (
		<div className={cn("flex gap-3", className)}>
			{services.map((service) => (
				<ServiceCard key={service.id} service={service} />
			))}
		</div>
	);
}

import { listServices } from "@/lib/data/services";
import EmblaCarousel from "@/modules/common/components/embla-carousel";
import { ServiceCard } from "@/modules/services/components/service-card";
import ListPlaceholder from "./list-placeholder";

export default async function ServicesCarousel() {
	const {
		response: { data: services, count },
	} = await listServices({
		queryParams: {
			limit: 30,
		},
	});

	if (count === 0) {
		return <ListPlaceholder text="На данный момент статьи не доступны" />;
	}

	return (
		<EmblaCarousel>
			{services.map((service) => (
				<div key={service.handle} className="embla__slide">
					<ServiceCard service={service} className="h-full" />
				</div>
			))}
		</EmblaCarousel>
	);
}

import Section from "@/components/ui/section";
import { servicesData } from "@/lib/data/services";
import EmblaCarousel from "@/modules/common/components/embla-carousel";
import { ServiceCard } from "@/modules/services/components/service-card";

export default function Services() {
	const services = Object.values(servicesData);

	return (
		<Section
			className="!px-0"
			id="services"
			title="Доступные услуги"
			subtitle={
				<>
					<span>Полный комплекс ритуальных услуг.</span>
					<br />
					От организации похорон до благоустройства места захоронения
				</>
			}
		>
			<EmblaCarousel>
				{services.map((service, index) => (
					<div key={index} className="embla__slide">
						<ServiceCard service={service} className="h-full" />
					</div>
				))}
			</EmblaCarousel>
		</Section>
	);
}

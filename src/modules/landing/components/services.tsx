"use client";

import Section from "@/components/ui/section";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { EmblaOptionsType } from "embla-carousel";
import { servicesData } from "@/lib/data/services";
import { ServiceCard } from "@/modules/services/components/service-card";

export default function Services() {
	const services = Object.values(servicesData);

	const options: EmblaOptionsType = {
		align: "center",
		dragFree: true,
		loop: true,
	};

	const [emblaRef] = useEmblaCarousel(options, [
		Autoplay({
			delay: 2000,
		}),
	]);

	return (
		<Section
			className="!px-0"
			id="services"
			title="Доступные услуги"
			subtitle={
				<>
					<span>Полный комплекс ритуальных услуг.</span>
					<br />
					От подготовки места захоронения до установки памятников.
				</>
			}
		>
			<div className="embla">
				<div className="embla__viewport" ref={emblaRef}>
					<div className="embla__container">
						{services.map((service, index) => (
							<div key={index} className="embla__slide">
								<ServiceCard
									service={service}
									className="h-full"
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</Section>
	);
}

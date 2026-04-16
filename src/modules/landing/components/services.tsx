import { Suspense } from "react";
import { TypographyPreline } from "@/components/typography";
import Section from "@/components/ui/section";
import SkeletonServicesCarousel from "@/modules/skeletons/templates/skeleton-services-carousel";
import ServicesCarousel from "./services-carousel";

export type ServicesProps = {
	title?: string;
	subtitle?: string;
};

const DEFAULT_SERVICES = {
	title: "Доступные услуги",
	subtitle:
		"Полный комплекс ритуальных услуг.\nОт организации похорон до благоустройства места захоронения",
};

export default function Services({
	title = DEFAULT_SERVICES.title,
	subtitle = DEFAULT_SERVICES.subtitle,
}: ServicesProps) {
	return (
		<Section
			// 1. Убираем px-0! и ставим container mx-auto сюда. 
			// Это сделает секцию такой же по ширине, как блок со стоимостью.
			className="container mx-auto px-4" 
			
			// 2. Здесь оставляем только отступы и выравнивание. 
			// Убираем container и mx-auto отсюда, чтобы они не конфликтовали.
			textContainerClassName="mb-12 flex flex-col items-start text-left"
			
			id="services"
			title={title}
			subtitle={
				<TypographyPreline>{subtitle}</TypographyPreline>
			}
		>
			<Suspense fallback={<SkeletonServicesCarousel />}>
				<ServicesCarousel />
			</Suspense>
		</Section>
	);
}

import { Suspense } from "react";
import Section from "@/components/ui/section";
import SkeletonServicesCarousel from "@/modules/skeletons/templates/skeleton-services-carousel";
import ServicesCarousel from "./services-carousel";

type ServicesProps = {
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
			className="px-0!"
			id="services"
			title={title}
			subtitle={
				<span className="whitespace-pre-line">{subtitle}</span>
			}
		>
			<Suspense fallback={<SkeletonServicesCarousel />}>
				<ServicesCarousel />
			</Suspense>
		</Section>
	);
}

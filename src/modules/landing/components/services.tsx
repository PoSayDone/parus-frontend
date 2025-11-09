import { Suspense } from "react";
import Section from "@/components/ui/section";
import SkeletonServicesCarousel from "@/modules/skeletons/templates/skeleton-services-carousel";
import ServicesCarousel from "./services-carousel";

export default function Services() {
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
			<Suspense fallback={<SkeletonServicesCarousel />}>
				<ServicesCarousel />
			</Suspense>
		</Section>
	);
}

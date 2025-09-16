import Section from "@/components/ui/section";
import CategoriesCarousel from "./categories-carousel";
import { Suspense } from "react";
import SkeletonCategoriesCarousel from "@/modules/skeletons/templates/skeleton-categories-carousel";

export default function RitualProducts() {
	return (
		<Section
			id="ritual-products"
			className="!px-0"
			title="Ритуальные товары"
			subtitle={
				<>
					Все необходимые ритуальные товары
					<br />
					для организации прощания в одном месте.
				</>
			}
		>
			<Suspense fallback={<SkeletonCategoriesCarousel />}>
				<CategoriesCarousel />
			</Suspense>
		</Section>
	);
}

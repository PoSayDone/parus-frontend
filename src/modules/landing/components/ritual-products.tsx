import Section from "@/components/ui/section";
import CategoriesCarousel from "./categories-carousel";
import { Suspense } from "react";
import { TypographyPreline } from "@/components/typography";
import SkeletonCategoriesCarousel from "@/modules/skeletons/templates/skeleton-categories-carousel";

export type RitualProductsProps = {
	title?: string;
	subtitle?: string;
};

const DEFAULT_RITUAL_PRODUCTS = {
	title: "Ритуальные товары",
	subtitle:
		"Все необходимые ритуальные товары\nдля организации прощания в одном месте.",
};

export default function RitualProducts({
	title = DEFAULT_RITUAL_PRODUCTS.title,
	subtitle = DEFAULT_RITUAL_PRODUCTS.subtitle,
}: RitualProductsProps) {
	return (
		<Section
			id="ritual-products"
			className="px-0!"
			title={title}
			subtitle={
				<TypographyPreline>{subtitle}</TypographyPreline>
			}
		>
			<Suspense fallback={<SkeletonCategoriesCarousel />}>
				<CategoriesCarousel />
			</Suspense>
		</Section>
	);
}

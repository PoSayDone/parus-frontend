import Image from "next/image";
import { listCategories } from "@/lib/data/categories";
import EmblaCarousel from "@/modules/common/components/embla-carousel";
import LandingCard from "./landing-card";
import ListPlaceholder from "./list-placeholder";

export default async function CategoriesCarousel() {
	const {
		response: { data: categories },
	} = await listCategories({
		queryParams: {
			limit: 10,
			draft: false,
		},
	});

	if (categories.length === 0) {
		return (
			<ListPlaceholder text="На данный момент ритуальные товары не доступны" />
		);
	}

	return (
		<EmblaCarousel>
			{categories.map((slide) => (
				<div key={slide.id} className="embla__slide !h-[420px]">
					<LandingCard
						title={slide.name}
						className="h-full relative overflow-clip"
						href={`/categories/${slide.handle}`}
					>
						{slide.thumbnail && (
							<Image
								className="mx-auto object-cover w-full h-auto"
								src={slide.thumbnail}
								alt={slide.name}
								layout="fill"
							/>
						)}
					</LandingCard>
				</div>
			))}
		</EmblaCarousel>
	);
}

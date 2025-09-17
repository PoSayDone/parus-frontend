import { listCategories } from "@/lib/data/categories";
import EmblaCarousel from "@/modules/common/components/embla-carousel";
import LandingCard from "./landing-card";
import Image from "next/image";

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
			<div>
				<div className="px-8 py-16 flex items-center justify-center bg-card text-card-foreground h-[420px]">
					<p className="text-center text-muted-foreground">
						На данный момент ритуальные товары не доступны
					</p>
				</div>
			</div>
		);
	}

	return (
		<EmblaCarousel>
			{categories.map((slide) => (
				<div key={slide.id} className="embla__slide !h-[420px]">
					<LandingCard
						title={slide.name}
						className="h-full"
						href={`/categories/${slide.handle}`}
					>
						{slide.thumbnail && (
							<Image
								className="mx-auto mt-4"
								src={slide.thumbnail}
								alt={slide.name}
								width={205}
								height={370}
							/>
						)}
					</LandingCard>
				</div>
			))}
		</EmblaCarousel>
	);
}
